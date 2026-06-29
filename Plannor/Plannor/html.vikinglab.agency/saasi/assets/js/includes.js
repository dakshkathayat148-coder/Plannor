(function () {
    function resolveBase() {
        var scripts = document.querySelectorAll('script[src]');
        for (var i = 0; i < scripts.length; i++) {
            var src = scripts[i].getAttribute('src');
            if (src && src.indexOf('includes.js') !== -1) {
                return src.replace('assets/js/includes.js', '');
            }
        }
        return '';
    }

    var base = resolveBase();

    function loadInclude(id, file) {
        return fetch(base + file)
            .then(function (r) { return r.text(); })
            .then(function (html) {
                var el = document.getElementById(id);
                if (!el) return;
                var tmp = document.createElement('div');
                tmp.innerHTML = html;

                // Fix relative links/srcs in injected HTML for subdirectory pages
                if (base) {
                    tmp.querySelectorAll('a[href]').forEach(function(a) {
                        var href = a.getAttribute('href');
                        if (href && href.charAt(0) !== '/' && href.indexOf('://') === -1 && href.charAt(0) !== '#' && href.indexOf('mailto:') !== 0 && href.indexOf('tel:') !== 0) {
                            a.setAttribute('href', base + href);
                        }
                    });
                    tmp.querySelectorAll('[src]').forEach(function(el) {
                        var src = el.getAttribute('src');
                        if (src && src.charAt(0) !== '/' && src.indexOf('://') === -1) {
                            el.setAttribute('src', base + src);
                        }
                    });
                    // Fix inline style background-image url() references
                    tmp.querySelectorAll('[style]').forEach(function(el) {
                        var style = el.getAttribute('style');
                        if (style && style.indexOf('url(') !== -1) {
                            var fixed = style.replace(/url\(['"]?([^'")]+)['"]?\)/g, function(match, url) {
                                if (url.charAt(0) !== '/' && url.indexOf('://') === -1 && url.indexOf('data:') !== 0) {
                                    return 'url(' + base + url + ')';
                                }
                                return match;
                            });
                            el.setAttribute('style', fixed);
                        }
                    });
                }

                // Collect inline scripts before moving nodes
                var scripts = [];
                tmp.querySelectorAll('script').forEach(function (s) {
                    scripts.push(s.textContent);
                    s.parentNode.removeChild(s);
                });

                var frag = document.createDocumentFragment();
                while (tmp.firstChild) frag.appendChild(tmp.firstChild);
                el.parentNode.replaceChild(frag, el);

                // Execute collected scripts now that DOM is updated
                scripts.forEach(function (code) {
                    var s = document.createElement('script');
                    s.textContent = code;
                    document.head.appendChild(s);
                });
            });
    }

    loadInclude('global-header', 'header.html');
    loadInclude('global-footer', 'footer.html');
})();

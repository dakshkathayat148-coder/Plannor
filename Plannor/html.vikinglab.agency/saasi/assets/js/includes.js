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

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
                var frag = document.createDocumentFragment();
                while (tmp.firstChild) frag.appendChild(tmp.firstChild);
                el.parentNode.replaceChild(frag, el);
            });
    }

    loadInclude('global-header', 'header.html');
    loadInclude('global-footer', 'footer.html');
})();

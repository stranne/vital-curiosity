(function () {
    var tocNav = document.querySelector('.toc-nav');
    if (!tocNav) return;

    var tocLinks = tocNav.querySelectorAll('.toc-list a');
    var headings = [];
    var linkByHeadingId = {};
    tocLinks.forEach(function (link) {
        var id = link.getAttribute('href').slice(1);
        var el = document.getElementById(id);
        if (el) {
            headings.push(el);
            linkByHeadingId[id] = link;
        }
    });
    if (headings.length === 0) return;

    var scrollOffset = 100;
    var ticking = false;
    var currentActive = null;
    var desktopQuery = window.matchMedia('(min-width: 64rem)');

    function update() {
        var active = null;
        for (var i = 0; i < headings.length; i++) {
            if (headings[i].getBoundingClientRect().top <= scrollOffset) {
                active = headings[i];
            } else {
                break;
            }
        }

        if (active === currentActive) { ticking = false; return; }
        currentActive = active;

        tocLinks.forEach(function (link) { link.classList.remove('active'); });
        if (active && linkByHeadingId[active.id]) {
            var link = linkByHeadingId[active.id];
            link.classList.add('active');
            if (desktopQuery.matches) {
                link.scrollIntoView({ block: 'nearest', behavior: 'auto' });
            }
        }
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });

    // Mobile TOC toggle
    var tocTitle = tocNav.querySelector('.toc-title');
    if (tocTitle) {
        function toggle() {
            if (!desktopQuery.matches) {
                tocNav.toggleAttribute('data-open');
                tocTitle.setAttribute('aria-expanded', tocNav.hasAttribute('data-open'));
            }
        }
        tocTitle.addEventListener('click', toggle);
        tocTitle.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    }

    update();
})();

(function () {
    var tocLinks = document.querySelectorAll('.toc-list a');
    var headings = [];
    tocLinks.forEach(function (link) {
        var id = link.getAttribute('href').slice(1);
        var el = document.getElementById(id);
        if (el) headings.push(el);
    });
    if (headings.length === 0) return;

    var scrollOffset = 100; // accounts for sticky header
    var ticking = false;

    function update() {
        // Find the last heading that has scrolled past the offset
        var active = null;
        for (var i = 0; i < headings.length; i++) {
            if (headings[i].getBoundingClientRect().top <= scrollOffset) {
                active = headings[i];
            } else {
                break;
            }
        }

        tocLinks.forEach(function (link) { link.classList.remove('active'); });
        if (active) {
            var link = document.querySelector('.toc-list a[href="#' + active.id + '"]');
            if (link) link.classList.add('active');
        }
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });

    update();
})();

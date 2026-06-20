(function () {
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image preview');
    overlay.innerHTML =
        '<img class="lightbox-img" alt="">' +
        '<button class="lightbox-close" aria-label="Close image preview">&times;</button>';
    document.body.appendChild(overlay);

    var img = overlay.querySelector('.lightbox-img');
    var closeBtn = overlay.querySelector('.lightbox-close');
    var lastFocused = null;

    function open(trigger) {
        lastFocused = document.activeElement;
        img.src = trigger.href;
        img.alt = trigger.querySelector('img').alt || 'Enlarged image';
        overlay.classList.add('active');
        closeBtn.focus();
    }

    function close() {
        overlay.classList.remove('active');
        img.src = '';
        if (lastFocused) {
            lastFocused.focus();
        }
    }

    document.addEventListener('click', function (e) {
        var trigger = e.target.closest('.lightbox-trigger');
        if (trigger) {
            e.preventDefault();
            open(trigger);
        }
    });

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay || e.target === img) {
            close();
        }
    });

    closeBtn.addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            close();
        }
        // Trap focus inside lightbox when open
        if (e.key === 'Tab' && overlay.classList.contains('active')) {
            e.preventDefault();
            closeBtn.focus();
        }
    });
})();

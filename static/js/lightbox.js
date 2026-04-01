(function () {
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = '<img class="lightbox-img" alt="">';
    document.body.appendChild(overlay);

    var img = overlay.querySelector('.lightbox-img');

    document.addEventListener('click', function (e) {
        var trigger = e.target.closest('.lightbox-trigger');
        if (trigger) {
            e.preventDefault();
            img.src = trigger.href;
            img.alt = trigger.querySelector('img').alt;
            overlay.classList.add('active');
        }
    });

    overlay.addEventListener('click', function () {
        overlay.classList.remove('active');
        img.src = '';
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
            img.src = '';
        }
    });
})();

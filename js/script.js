(function () {
    const header = document.querySelector('.site-header');
    if (!header) return;

    // ── Scroll: opaque header after 40px ──────────────────────────
    function onScroll() {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ── Mobile nav toggle ─────────────────────────────────────────
    // The .mobile-menu lives outside <header> in the DOM to avoid
    // the iOS Safari "fixed-inside-fixed" rendering bug.
    const toggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!toggle || !mobileMenu) return;

    var savedScrollY = 0;

    function openMenu() {
        savedScrollY = window.scrollY || window.pageYOffset;
        document.body.style.top = '-' + savedScrollY + 'px';
        document.body.classList.add('menu-open');
        mobileMenu.classList.add('is-open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Menü schließen');
    }

    function closeMenu() {
        document.body.classList.remove('menu-open');
        mobileMenu.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.top = '';
        window.scrollTo(0, savedScrollY);
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Menü öffnen');
    }

    toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        mobileMenu.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    // Close when any nav link inside the overlay is tapped
    mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) closeMenu();
    });
}());

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
    const toggle = header.querySelector('.nav-toggle');
    const nav = header.querySelector('.site-nav');
    if (!toggle || !nav) return;

    var savedScrollY = 0;

    function openMenu() {
        // Save scroll position before locking body (iOS Safari fix)
        savedScrollY = window.scrollY || window.pageYOffset;
        document.body.style.top = '-' + savedScrollY + 'px';
        header.classList.add('nav-open');
        document.body.classList.add('nav-open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Menü schließen');
    }

    function closeMenu() {
        header.classList.remove('nav-open');
        document.body.classList.remove('nav-open');
        // Restore scroll position after releasing body lock
        document.body.style.top = '';
        window.scrollTo(0, savedScrollY);
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Menü öffnen');
    }

    toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        header.classList.contains('nav-open') ? closeMenu() : openMenu();
    });

    // Close when a nav link is tapped
    nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    // Close when tapping the overlay background (not a link)
    nav.addEventListener('click', function (e) {
        if (e.target === nav) closeMenu();
    });

    // Close when Escape is pressed
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });
}());

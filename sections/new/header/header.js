(() => {
    // HEADER DROPDOWNS
    const DESKTOP_MIN_WIDTH = 992;
    const isDesktop = () => window.innerWidth >= DESKTOP_MIN_WIDTH;
    const HOVER_CLASS = 'show-on-hover';

    let activePane = null;
    let activeMenuItem = null;

    function setActiveMenuItem(header, id) {
        if (activeMenuItem) activeMenuItem.classList.remove('active');
        const item = header.querySelector(`.header__menu [data-target="${id}"]`);
        if (item) item.classList.add('active');
        activeMenuItem = item || null;
    }

    function showPane(header, id) {
        const targetId = id && id[0] === '#' ? id.slice(1) : id;
        if (!targetId) return;
        const safeId = (window.CSS && CSS.escape) ? CSS.escape(targetId) : targetId;
        const pane = header.querySelector(`#${safeId}`);
        if (!pane) return;

        if (activePane && activePane !== pane) activePane.classList.remove(HOVER_CLASS);
        if (activePane !== pane) {
            pane.classList.add(HOVER_CLASS);
            activePane = pane;
            if (pane.id) setActiveMenuItem(header, pane.id);
        }
    }

    function hideAll() {
        if (!isDesktop()) return;
        if (activePane) activePane.classList.remove(HOVER_CLASS);
        activePane = null;
        if (activeMenuItem) activeMenuItem.classList.remove('active');
        activeMenuItem = null;
    }

    // Hover to show (desktop only)
    document.addEventListener('pointerover', (e) => {
        if (!isDesktop()) return;
        const el = e.target.closest('#header .header__menu [data-target]');
        if (!el) return;
        const header = el.closest('#header');
        if (!header) return;
        showPane(header, el.getAttribute('data-target') || '');
    });

    // Click to show (desktop), allow navigation on mobile
    document.addEventListener('click', (e) => {
        const el = e.target.closest('#header .header__menu [data-target]');
        if (!el) return;
        const header = el.closest('#header');
        if (!header) return;
        if (!isDesktop()) return; // let links work on mobile
        e.preventDefault();
        showPane(header, el.getAttribute('data-target') || '');
    });

    // Hide when leaving header (desktop only)
    document.addEventListener('pointerout', (e) => {
        if (!isDesktop()) return;
        const header = e.target.closest('#header');
        if (!header) return;
        const to = e.relatedTarget;
        if (!to || !header.contains(to)) hideAll();
    });
    // HEADER DROPDOWNS END

    // MOBILE MENU TOGGLE
    const MOBILE_OPEN_CLASS = 'menu-show';

    // Delegate clicks; no init or observers needed
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('#hamburger');
        if (!btn) return;

        const open = document.body.classList.toggle(MOBILE_OPEN_CLASS);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close on resize
    window.addEventListener('resize', () => {
        if (!document.body.classList.contains(MOBILE_OPEN_CLASS)) return;
        document.body.classList.remove(MOBILE_OPEN_CLASS);
        const btn = document.getElementById('hamburger');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    });
    // MOBILE MENU TOGGLE
})();
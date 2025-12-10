document.querySelectorAll('[data-swiper]').forEach((el) => {
    const config = JSON.parse(el.getAttribute('data-swiper'));

    // Responsive enablement: allow enabling only on mobile/desktop
    // Usage in data-swiper JSON:
    // { "enableOn": "mobile", "breakpoint": 768 }
    // - enableOn: "mobile" | "desktop" | "all" (default: "all")
    // - breakpoint: width in px that separates mobile/desktop (default: 767)
    const enableOn = (config.enableOn || "all").toLowerCase();
    const breakpoint = Number.isFinite(config.breakpoint) ? config.breakpoint : 767;

    const shouldEnableForWidth = (width) => {
        if (enableOn === "mobile") return width < breakpoint;
        if (enableOn === "desktop") return width >= breakpoint;
        return true; // "all"
    };

    // Default custom pagination render
    if (config.pagination && config.pagination.type === "custom") {
        config.pagination.renderCustom = function (_, current, total) {
            return `<strong>${current}</strong> / <span>${total}</span>`;
        };
    }

    // Handle thumbs navigation slider
    const thumbsSelector = el.getAttribute("data-swiper-thumbs");
    let thumbSwiper = null;
    
    if (thumbsSelector) {
        const thumbsEl = document.querySelector("." + thumbsSelector);
        if (thumbsEl) {
            const thumbsConfig = thumbsEl.getAttribute("data-swiper");
            const thumbsOptions = thumbsConfig ? JSON.parse(thumbsConfig) : {};
            
            // Default thumbs configuration
            thumbsOptions.watchSlidesProgress = true;
            thumbsOptions.freeMode = thumbsOptions.freeMode !== false;
            thumbsOptions.slideToClickedSlide = true;
            
            thumbSwiper = new Swiper(thumbsEl, thumbsOptions);
            config.thumbs = { swiper: thumbSwiper };
        }
    }

    // Add c-swiper-nav-disabled class when navigation is disabled
    const updateNavClass = (swiper) => {
        if (swiper.isBeginning && swiper.isEnd) {
            swiper.el.classList.add("c-swiper-nav-disabled");
        } else {
            swiper.el.classList.remove("c-swiper-nav-disabled");
        }
    };

    config.on = {
        init: updateNavClass,
        resize: updateNavClass,
        slidesLengthChange: updateNavClass,
    };

    // Manage init/destroy based on viewport width
    let mainSwiper = null;

    const initSwiper = () => {
        if (!mainSwiper) {
            // When thumbs are configured, ensure config.thumbs is set before init
            mainSwiper = new Swiper(el, config);
        }
    };

    const destroySwiper = () => {
        if (mainSwiper) {
            mainSwiper.destroy(true, true);
            mainSwiper = null;
        }
    };

    const handleResponsive = () => {
        const width = window.innerWidth;
        if (shouldEnableForWidth(width)) {
            initSwiper();
        } else {
            destroySwiper();
        }
    };

    // Initialize appropriately and listen for resizes
    handleResponsive();
    window.addEventListener("resize", handleResponsive);
});

document.querySelectorAll('[data-swiper]').forEach((el) => {
    const config = JSON.parse(el.getAttribute('data-swiper'));

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

    const mainSwiper = new Swiper(el, config);
});

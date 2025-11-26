document.querySelectorAll('[data-swiper]').forEach((el) => {
    const config = JSON.parse(el.getAttribute('data-swiper'));

    // default custom pagination render
    if (config.pagination && config.pagination.type === "custom") {
        config.pagination.renderCustom = function (_, current, total) {
            return `<strong>${current}</strong> / <span>${total}</span>`;
        };
    }

    // default navigation buttons
    if (!config.navigation) config.navigation = {};
    if (!config.navigation.nextEl || !config.navigation.prevEl) {
        config.navigation.nextEl = config.navigation.nextEl || '.c-swiper-button-next';
        config.navigation.prevEl = config.navigation.prevEl || '.c-swiper-button-prev';
    }

    // Add c-swiper-nav-disabled class when navigation is disabled
    const updateNavClass = (swiper) => {
        if (swiper.isBeginning && swiper.isEnd) {
            swiper.el.classList.add('c-swiper-nav-disabled');
        } else {
            swiper.el.classList.remove('c-swiper-nav-disabled');
        }
    };

    config.on = {
        init: updateNavClass,
        resize: updateNavClass,
        slidesLengthChange: updateNavClass,
    };

    new Swiper(el, config);
});

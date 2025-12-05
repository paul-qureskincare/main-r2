(function () {
    var collapses = document.querySelectorAll('.guide-content .accordion-collapse');
    collapses.forEach(function(collapse) {
        collapse.addEventListener('shown.bs.collapse', function () {
            const section = this.closest('.guide-content');
            if (!section) return;

            const offset = 150;
            const top = section.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
        });
    });
})();
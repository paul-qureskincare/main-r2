(function () {
    window._wq = window._wq || [];

    _wq.push({
        id: "_all",
        onReady: function (video) {
            const container = video.container;

            if (!container) return;

            const playBtn = container.closest(".c-wistia-embed-video").querySelector(".wistia-custom-play");

            if (playBtn) {
                playBtn.addEventListener("click", function () {
                    video.play();
                });
            }
        }
    });
})();

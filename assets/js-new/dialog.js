(function() {
    // Close dialog
    document.addEventListener("click", (event) => {
        document.querySelectorAll("dialog[open]").forEach((dialog) => {
            const rect = dialog.getBoundingClientRect();

            const clickedOutside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;

            if (clickedOutside) {
            dialog.close();
            }
        });
    });

})();

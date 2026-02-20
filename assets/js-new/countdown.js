(() => {
    const root = document.querySelector('.e-countdown');
    if (!root) return;

    const els = {
        days:    root.querySelector('[data-key="days"]'),
        hours:   root.querySelector('[data-key="hours"]'),
        minutes: root.querySelector('[data-key="minutes"]'),
        seconds: root.querySelector('[data-key="seconds"]'),
    };

    const pad2 = (n) => String(n).padStart(2, '0');

    // fallback: 4d 9h 59m 36s
    const fallbackMs = (4 * 24 * 3600 + 9 * 3600 + 59 * 60 + 36) * 1000;

    const deadlineAttr = root.getAttribute('data-deadline')?.trim();
    const parsedMs = deadlineAttr ? Date.parse(deadlineAttr) : NaN;

    // If parsing fails, use fallback
    const endTimeMs = Number.isFinite(parsedMs) ? parsedMs : Date.now() + fallbackMs;

    const render = () => {
        let diffSec = Math.max(0, Math.floor((endTimeMs - Date.now()) / 1000));

        const days = Math.floor(diffSec / 86400);
        diffSec %= 86400;
        const hours = Math.floor(diffSec / 3600);
        diffSec %= 3600;
        const minutes = Math.floor(diffSec / 60);
        const seconds = diffSec % 60;

        if (els.days) els.days.textContent = pad2(days);
        if (els.hours) els.hours.textContent = pad2(hours);
        if (els.minutes) els.minutes.textContent = pad2(minutes);
        if (els.seconds) els.seconds.textContent = pad2(seconds);
    };

    render();

    const timerId = setInterval(() => {
        render();
        if (Date.now() >= endTimeMs) clearInterval(timerId);
    }, 1000);
})();

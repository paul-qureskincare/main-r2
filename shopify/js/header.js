let prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', function() {
    const currentScrollPos = window.pageYOffset;
    const header = document.getElementById('page-header');
    const gamificationHeader = document.getElementById('endrock_gamificationHeader');
    const announcementHeader = document.getElementById('announcement-bar');

    if (prevScrollPos > currentScrollPos) {
        // Скроллим вверх — показываем элементы
        if (header) header.style.display = 'block';
        if (gamificationHeader) gamificationHeader.style.display = 'block';
        if (announcementHeader) announcementHeader.style.display = 'block';
    } else {
        // Скроллим вниз — скрываем элементы
        if (header) header.style.display = 'none';
        if (gamificationHeader) gamificationHeader.style.display = 'none';
        if (announcementHeader) announcementHeader.style.display = 'none';
    }

    prevScrollPos = currentScrollPos;
});
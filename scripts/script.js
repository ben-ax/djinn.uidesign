document.addEventListener('DOMContentLoaded', function () {

    // ── Hamburger menu toggle ──────────────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const topnav    = document.getElementById('topnav');

    if (hamburger && topnav) {
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            topnav.classList.toggle('nav-open');
        });

        // Close when clicking anywhere outside the nav
        document.addEventListener('click', function (e) {
            if (!topnav.contains(e.target)) {
                topnav.classList.remove('nav-open');
            }
        });

        // Close after a nav link is clicked (nice on mobile)
        topnav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                topnav.classList.remove('nav-open');
            });
        });
    }

    // ── Optional video header (personnel_registry etc.) ───────────────────
    const video = document.getElementById('header-video');
    if (video) {
        const header = document.getElementById('header-container');

        function startVideo() {
            video.muted = false;
            video.play().catch(function () {
                // Autoplay blocked – user interaction needed
            });
        }

        if (header) header.addEventListener('mousemove', startVideo, { once: true });
        document.addEventListener('click', startVideo, { once: true });
    }

    // ── Hover sound (pages that have it) ──────────────────────────────────
    window.playHover = function () {
        const sound = document.getElementById('hoverSound');
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
            sound.play().catch(function () {});
        }
    };
});

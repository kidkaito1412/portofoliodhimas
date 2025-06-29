document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const menuToggle = document.getElementById('menu-toggle');
    const mainNavMobile = document.getElementById('main-nav-mobile');
    const menuOverlay = document.getElementById('menu-overlay');

    // Dark/Light mode toggle
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('light')) {
            // Kembali ke mode gelap
            body.classList.remove('light');
            body.classList.remove('bg-gray-100', 'text-gray-900');
            body.classList.add('bg-gray-900', 'text-gray-100');
            themeToggle.innerHTML = '🌙';
        } else {
            // Aktifkan mode terang
            body.classList.add('light');
            body.classList.remove('bg-gray-900', 'text-gray-100');
            body.classList.add('bg-gray-100', 'text-gray-900');
            themeToggle.innerHTML = '☀️';
        }
    });

    function validateEmail(email) {
        // Validasi email sederhana
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        if (!validateEmail(email)) {
            formMessage.textContent = 'Email tidak valid!';
            formMessage.className = 'text-red-400 fade-in';
            return;
        }
        formMessage.textContent = 'Terima kasih! Pesan Anda telah dikirim.';
        formMessage.className = 'text-cyan-400 fade-in';
        form.reset();
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = '';
        }, 4000);
    });

    // Fallback animasi fade-in jika AOS tidak aktif
    if (typeof AOS === 'undefined') {
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.classList.add('fade-in');
        });
    }

    // Animasi progress bar skill (jika AOS tidak aktif)
    if (typeof AOS === 'undefined') {
        document.querySelectorAll('.aos-progress').forEach(bar => {
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.transition = 'width 1.2s';
                bar.style.width = bar.getAttribute('data-width') || bar.style.width;
            }, 300);
        });
    }

    // Hamburger menu buka/tutup dengan satu tombol
    function openMenu() {
        mainNavMobile.classList.remove('-translate-x-full', 'invisible');
        mainNavMobile.classList.add('translate-x-0', 'visible');
        menuOverlay.classList.remove('hidden');
    }
    function closeMenu() {
        mainNavMobile.classList.add('-translate-x-full', 'invisible');
        mainNavMobile.classList.remove('translate-x-0', 'visible');
        menuOverlay.classList.add('hidden');
    }
    menuToggle.addEventListener('click', function() {
        if (mainNavMobile.classList.contains('invisible')) {
            openMenu();
            // Fokus ke menu pertama
            setTimeout(() => {
                const firstLink = mainNavMobile.querySelector('a');
                if (firstLink) firstLink.focus();
            }, 100);
        } else {
            closeMenu();
        }
    });
    // Tutup menu saat link diklik
    mainNavMobile.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    // Tutup menu saat klik overlay
    menuOverlay.addEventListener('click', function() {
        closeMenu();
    });
    // Tutup menu dengan ESC
    document.addEventListener('keydown', function(e) {
        if (!mainNavMobile.classList.contains('invisible') && (e.key === 'Escape' || e.key === 'Esc')) {
            closeMenu();
        }
    });
}); 
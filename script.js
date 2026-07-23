/* ==========================================================================
   SCALES PORTAL - SMP NEGERI 1 CIASEM
   Interactive Logic Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. Preloader Handler --- */
    const preloader = document.getElementById('preloader');
    const progress = document.getElementById('loaderProgress');

    if (progress) {
        progress.style.width = '100%';
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('hidden');
            }
        }, 600);
    });

    /* --- 2. Dynamic Mouse Glow Overlay --- */
    const mouseGlow = document.getElementById('mouseGlow');
    
    if (mouseGlow) {
        document.addEventListener('mousemove', (e) => {
            mouseGlow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });
    }

    /* --- 3. Navbar Sticky Effect & Scroll Active Link --- */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Glass Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight Active Nav Link
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    /* --- 4. Mobile Menu Toggle --- */
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navLinks');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('open');
        });

        // Close mobile nav when clicking link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    /* --- 5. Filtering & Live Search Guru (Pengajar) --- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const pengajarCards = document.querySelectorAll('.pengajar-card');
    const searchInput = document.getElementById('searchTeacher');

    function executeFilterAndSearch() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const activeBtn = document.querySelector('.filter-btn.active');
        const activeCategory = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';

        pengajarCards.forEach(card => {
            const cardName = card.getAttribute('data-name') ? card.getAttribute('data-name').toLowerCase() : '';
            const cardCategory = card.getAttribute('data-category') || '';

            const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);
            const matchesSearch = cardName.includes(searchTerm);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Filter Buttons Click Event
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            executeFilterAndSearch();
        });
    });

    // Live Search Input Event
    if (searchInput) {
        searchInput.addEventListener('input', executeFilterAndSearch);
    }
});
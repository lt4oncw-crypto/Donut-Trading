document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('stat-item')) {
                    animateValue(entry.target.querySelector('h2'));
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = btn.getBoundingClientRect();
            const x = e.clientX - left - width / 2;
            const y = e.clientY - top - height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // 3D Tilt Effect for Cards
    const cards = document.querySelectorAll('.community-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            card.style.transform = `
                perspective(1000px) 
                rotateY(${x * 10}deg) 
                rotateX(${-y * 10}deg) 
                translateY(-10px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)`;
        });
    });

    // Stats Counter Animation
    function animateValue(obj) {
        const text = obj.innerText;
        const target = parseInt(text.replace(/[,+]/g, ''));
        const suffix = text.replace(/[0-9,]/g, '');
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(ease * target);
            
            obj.innerText = current.toLocaleString() + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }
});

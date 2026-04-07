document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target elements for animation
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-card, .reveal-image');
    revealElements.forEach(el => {
        el.classList.add('reveal-hidden');
        observer.observe(el);
    });

    // Add dynamic hover effect to glass cards
    const glassCards = document.querySelectorAll('.glass');
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            card.style.setProperty('--mouse-x', `${x * 100}%`);
            card.style.setProperty('--mouse-y', `${y * 100}%`);
        });
    });
});

// CSS for reveal effect (added dynamically or can stay in style.css)
const style = document.createElement('style');
style.textContent = `
    .reveal-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .reveal-hidden.active {
        opacity: 1;
        transform: translateY(0);
    }
    .delay-1 { transition-delay: 0.2s; }
    .delay-2 { transition-delay: 0.4s; }
    .delay-3 { transition-delay: 0.6s; }
`;
document.head.appendChild(style);

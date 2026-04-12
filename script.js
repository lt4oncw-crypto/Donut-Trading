document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Custom Cursor Logic ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    let cursorX = 0;
    let cursorY = 0;
    let outlineX = 0;
    let outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        cursorDot.style.left = `${cursorX}px`;
        cursorDot.style.top = `${cursorY}px`;
    });

    const animateCursor = () => {
        const distX = cursorX - outlineX;
        const distY = cursorY - outlineY;
        
        outlineX += distX * 0.15;
        outlineY += distY * 0.15;
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover effects for cursor
    const interactives = document.querySelectorAll('a, button, .community-card, .stat-item');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderColor = 'var(--primary-glow)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // --- 2. Live Activity Toasts ---
    const toastContainer = document.getElementById('toast-container');
    const activities = [
        { user: "leon_fan_42", action: "joined the Discord!", icon: "message-circle" },
        { user: "pro_trader", action: "traded 500 Gems for a Dragon Donut", icon: "refresh-cw" },
        { user: "donut_king", action: "just hit 10k trades!", icon: "award" },
        { user: "newbie_smp", action: "followed the TikTok!", icon: "heart" },
        { user: "wealthy_guy", action: "listed 5 Mythic Gems for trade", icon: "shopping-bag" }
    ];

    function createToast() {
        const activity = activities[Math.floor(Math.random() * activities.length)];
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-icon"><i data-lucide="${activity.icon}"></i></div>
            <div>
                <strong style="color: var(--primary);">${activity.user}</strong>
                <span style="font-size: 0.9rem; color: var(--text-muted); display: block;">${activity.action}</span>
            </div>
        `;
        toastContainer.appendChild(toast);
        lucide.createIcons();

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }

    // Initial delay then periodic toasts
    setTimeout(() => {
        createToast();
        setInterval(createToast, 8000 + Math.random() * 5000);
    }, 3000);

    // --- 3. Refined Interactions ---
    
    // Navbar Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // 3D Tilt & Magnetic Combo
    const tiltItems = document.querySelectorAll('.community-card, .stat-item');
    tiltItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = item.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            item.style.transform = `
                perspective(1000px) 
                rotateY(${x * 15}deg) 
                rotateX(${-y * 15}deg) 
                translateY(-10px)
                scale(1.02)
            `;
            
            // Magnetic internal icon if exists
            const icon = item.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = `translate(${x * 40}px, ${y * 40}px) rotate(${x * 10}deg)`;
            }
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0) scale(1)';
            const icon = item.querySelector('.card-icon');
            if (icon) icon.style.transform = 'translate(0, 0) rotate(0)';
        });
    });

    // Magnetic Buttons
    const magneticBtns = document.querySelectorAll('.btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = btn.getBoundingClientRect();
            const x = e.clientX - left - width / 2;
            const y = e.clientY - top - height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px) scale(1.05)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // Intersection Observer for Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('stat-item')) {
                    animateValue(entry.target.querySelector('h2'));
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Stats Counter
    function animateValue(obj) {
        if (!obj) return;
        const text = obj.innerText;
        const target = parseInt(text.replace(/[,+]/g, ''));
        const suffix = text.replace(/[0-9,]/g, '');
        let start = 0;
        const duration = 2500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(ease * target);
            obj.innerText = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }
});

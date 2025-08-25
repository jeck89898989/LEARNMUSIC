document.addEventListener('DOMContentLoaded', () => {
    const appCards = document.querySelectorAll('.app-card');
    
    // Add click effect to cards
    appCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('app-link')) {
                return; // Let the link handle the navigation
            }
            
            const link = card.querySelector('.app-link');
            if (link) {
                // Add a ripple effect
                const ripple = document.createElement('div');
                const rect = card.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: radial-gradient(circle, rgba(102,126,234,0.3) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.8s ease-out;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                card.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                    window.open(link.href, '_blank');
                }, 400);
            }
        });
        
        // Add mouse move effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `translateY(-12px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Enhanced parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        const hero = document.querySelector('.hero');
        hero.style.transform = `translateY(${rate}px)`;
        
        // Parallax for cards
        appCards.forEach((card, index) => {
            const cardRate = scrolled * (0.1 + index * 0.02);
            card.style.transform = `translateY(${-cardRate}px)`;
        });
    });
    
    // Add floating animation to icons
    const icons = document.querySelectorAll('.app-icon');
    icons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
        icon.style.animation = `float 6s ease-in-out infinite`;
    });
});

// Enhanced CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2.5);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);
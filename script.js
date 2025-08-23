// Emily's birthday is May 25th
const BIRTHDAY_MONTH = 4; // May is month 4 (0-indexed)
const BIRTHDAY_DAY = 25;

function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Create this year's birthday date
    let birthdayThisYear = new Date(currentYear, BIRTHDAY_MONTH, BIRTHDAY_DAY);
    
    // If birthday has passed this year, calculate for next year
    if (now > birthdayThisYear) {
        birthdayThisYear = new Date(currentYear + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY);
    }
    
    const timeDifference = birthdayThisYear - now;
    
    // Check if it's Emily's birthday today
    const isBirthdayToday = now.getMonth() === BIRTHDAY_MONTH && now.getDate() === BIRTHDAY_DAY;
    
    if (isBirthdayToday) {
        // It's her birthday!
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Show birthday message
        const birthdayMessage = document.getElementById('birthday-message');
        birthdayMessage.style.display = 'block';
        birthdayMessage.innerHTML = `
            <h3>🎂 Happy Birthday, Emily! 🎂</h3>
            <p>Today is your special day! Wishing you a day filled with joy, laughter, and wonderful surprises!</p>
            <p>May all your dreams come true! ✨</p>
        `;
        
        // Add some extra celebration effects
        document.body.style.background = 'linear-gradient(135deg, #ff69b4 0%, #ff1493 50%, #da70d6 100%)';
        document.body.style.animation = 'gradientShift 2s ease-in-out infinite';
        
        return;
    }
    
    // Calculate time units
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    // Update the display
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // Hide birthday message if it's not her birthday
    const birthdayMessage = document.getElementById('birthday-message');
    birthdayMessage.style.display = 'none';
}

// Add some fun effects
function addConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#da70d6', '#dda0dd', '#e6e6fa', '#ffb6c1', '#ffc0cb'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => {
            document.body.removeChild(confetti);
        };
    }
}

// Add sparkle effect to the title
function addSparkles() {
    const title = document.querySelector('.title');
    const sparkle = document.createElement('span');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.fontSize = '1rem';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animation = 'sparkle 1.5s ease-in-out forwards';
    sparkle.style.pointerEvents = 'none';
    
    title.style.position = 'relative';
    title.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1500);
}

// Add sparkle animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% { opacity: 0; transform: scale(0) rotate(0deg); }
        50% { opacity: 1; transform: scale(1) rotate(180deg); }
        100% { opacity: 0; transform: scale(0) rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize countdown
updateCountdown();

// Update countdown every second
setInterval(updateCountdown, 1000);

// Add sparkles every 3 seconds
setInterval(addSparkles, 3000);

// Add confetti on page load
window.addEventListener('load', () => {
    setTimeout(addConfetti, 1000);
});

// Add confetti when clicking on the birthday card
document.querySelector('.birthday-card').addEventListener('click', addConfetti);

// Add some interactive hover effects
document.querySelectorAll('.time-unit').forEach(unit => {
    unit.addEventListener('mouseenter', () => {
        unit.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    unit.addEventListener('mouseleave', () => {
        unit.style.transform = 'translateY(0px) scale(1)';
    });
});

// Particle Animation
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 80;

// Mouse position
let mouse = {
    x: null,
    y: null,
    radius: 150
};

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Particle class
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Check mouse position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 2;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 2;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 2;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 2;
            }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// Initialize particles
function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = 'rgba(99, 102, 241, 0.8)';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Connect particles
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(99, 102, 241,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// Resize event
window.addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = 150;
    init();
});

// Mouse out event
window.addEventListener('mouseout', function () {
    mouse.x = undefined;
    mouse.y = undefined;
});

// Initialize and start animation
init();
animate();

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe tech categories
document.querySelectorAll('.tech-category').forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(category);
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.section, .hero');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });


    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Password Protection for Personal Story
const PASSWORD = 'Access1'; // Change this to your desired password
const SESSION_KEY = 'personalStoryUnlocked';

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('password-modal');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmit = document.getElementById('password-submit');
    const passwordError = document.getElementById('password-error');
    const personalStorySection = document.getElementById('personal-story');
    const personalStoryLinks = document.querySelectorAll('a[href="#personal-story"]');

    // Check if already unlocked in this session
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
        personalStorySection.classList.remove('hidden');
    }

    // Handle navigation link clicks
    personalStoryLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            if (sessionStorage.getItem(SESSION_KEY) === 'true') {
                // Already unlocked, just scroll
                personalStorySection.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Show password modal
                modal.style.display = 'flex';
                passwordInput.focus();
            }
        });
    });

    // Handle password submission
    function checkPassword() {
        const enteredPassword = passwordInput.value;

        if (enteredPassword === PASSWORD) {
            // Correct password
            sessionStorage.setItem(SESSION_KEY, 'true');
            modal.style.display = 'none';
            personalStorySection.classList.remove('hidden');
            personalStorySection.scrollIntoView({ behavior: 'smooth' });
            passwordInput.value = '';
            passwordError.textContent = '';
        } else {
            // Incorrect password
            passwordError.textContent = '❌ Incorrect password. Please try again.';
            passwordInput.value = '';
            passwordInput.focus();
        }
    }

    passwordSubmit.addEventListener('click', checkPassword);

    passwordInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            passwordInput.value = '';
            passwordError.textContent = '';
        }
    });
});

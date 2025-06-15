document.addEventListener('DOMContentLoaded', () => {
  // -------- Theme Toggle Setup --------
  const toggleBtn = document.getElementById('themeToggle');
  const body = document.body;

  if (toggleBtn) {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('luminaria-theme');
    if (savedTheme) {
      body.className = savedTheme;
      toggleBtn.textContent = savedTheme === 'dark-theme' ? 'Light Mode' : 'Dark Mode';
    } else {
      // Default to light-theme if none saved
      body.classList.add('light-theme');
      toggleBtn.textContent = 'Dark Mode';
    }

    // Toggle theme on button click
    toggleBtn.addEventListener('click', () => {
      if (body.classList.contains('light-theme')) {
        body.classList.replace('light-theme', 'dark-theme');
        toggleBtn.textContent = 'Light Mode';
        localStorage.setItem('luminaria-theme', 'dark-theme');
      } else {
        body.classList.replace('dark-theme', 'light-theme');
        toggleBtn.textContent = 'Dark Mode';
        localStorage.setItem('luminaria-theme', 'light-theme');
      }
    });
  }

  // -------- Particle Animation Setup --------
  const canvas = document.getElementById('particles');
  if (!canvas) return; // Exit if canvas not found
  const ctx = canvas.getContext('2d');

  let width, height;
  let particlesArray = [];
  const maxParticles = 350;

  // Particle class
  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 100;
      this.radius = 1 + Math.random() * 2;
      this.speedY = 0.3 + Math.random() * 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = 0.1 + Math.random() * 0.2;
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;

      if (this.y < -this.radius || this.x < -this.radius || this.x > width + this.radius) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      const isDark = body.classList.contains('dark-theme');
      ctx.fillStyle = isDark
        ? `rgba(255, 255, 255, ${this.opacity})`
        : `rgba(0, 0, 0, ${this.opacity})`;
      ctx.fill();
    }
  }

  // Resize canvas to fill window
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  // Initialize particles
  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < maxParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, width, height);
    particlesArray.forEach(particle => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animate);
  }

  // Optional: Observe theme class changes if needed for other effects
  const observer = new MutationObserver(() => {
    // No action needed here since draw() checks theme every frame
  });
  observer.observe(body, { attributes: true, attributeFilter: ['class'] });

  // Initial setup and start animation
  resize();
  initParticles();
  animate();

  // Reinitialize on window resize
  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });
});

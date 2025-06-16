  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');

  let particles = [];

  function Particle(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;

    this.draw = function() {
      ctx.beginPath();
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = "#ff856f";
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
    }

    this.update = function() {
      this.x += this.dx;
      this.y += this.dy;

      if(this.x + this.radius > canvas.width ||
         this.x - this.radius < 0) this.dx *= -1;

      if(this.y + this.radius > canvas.height ||
         this.y - this.radius < 0) this.dy *= -1;

      this.draw();
    }
  }

  function initParticles()
  {
    particles = [];

    for (let i = 0; i < 100; i++) {
      let radius = Math.random() * 3 + 1;
      let x = Math.random() * (canvas.width - radius * 2) + radius;
      let y = Math.random() * (canvas.height - radius * 2) + radius;
      let dx = (Math.random() - 0.5) * 0.7;
      let dy = (Math.random() - 0.5) * 0.7;
      particles.push(new Particle(x, y, radius, dx, dy)); 
    }
  }
  
  function animate()
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
    }
    requestAnimationFrame(animate);
  }
  
  function resize()
  {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initParticles();
  }
  
  window.addEventListener('load', () => {
    resize();
    animate();
  });

  window.addEventListener('resize', () => {
    resize();
  });


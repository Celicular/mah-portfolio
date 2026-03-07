import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particlesArray = [];
    let hue = 260; // Violet base hue

    const mouse = {
      x: null,
      y: null,
    };

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
      for (let i = 0; i < 1; i++) {
        particlesArray.push(createParticle());
      }
    });

    function createParticle() {
      return {
        x: mouse.x,
        y: mouse.y,
        size: Math.random() * 5 + 1,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5,
        color: `hsl(${hue}, 100%, 70%)`,
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          if (this.size > 0.1) this.size -= 0.1;
        },
        draw() {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      };
    }

    function handleParticles() {
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 50) {
            ctx.beginPath();
            ctx.strokeStyle = particlesArray[i].color;
            ctx.lineWidth = 0.2;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
            ctx.closePath();
          }
        }
        if (particlesArray[i].size <= 0.1) {
          particlesArray.splice(i, 1);
          i--;
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      hue += 2; // slight color shifting
      if (hue > 280) hue = 250; // keep it within purple bounds
      requestAnimationFrame(animate);
    }
    
    animate();

  }, []);

  // Hide on touch devices or fine pointers
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] hidden md:block" // Hidden on mobile to save performance
    />
  );
};

export default CustomCursor;

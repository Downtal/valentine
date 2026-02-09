import React, { useRef, useEffect } from 'react';
import { View } from '../types';

interface HeartProps {
    onNavigate: (view: View) => void;
    onLock: () => void;
}

const HeartAnimation: React.FC<HeartProps> = ({ onNavigate, onLock }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /*
     * Settings
     */
    const settings = {
      particles: {
        length: 2000, // maximum amount of particles
        duration: 2, // particle duration in sec
        velocity: 100, // particle velocity in pixels/sec
        effect: -1.3, // play with this for a nice effect
        size: 13, // particle size in pixels
      },
    };

    /*
     * RequestAnimationFrame polyfill by Erik Möller
     */
    (function() {
      const c = ["ms", "moz", "webkit", "o"];
      for (let a = 0; a < c.length && !window.requestAnimationFrame; ++a) {
        window.requestAnimationFrame = window[c[a] + "RequestAnimationFrame"] as any;
        window.cancelAnimationFrame = window[c[a] + "CancelAnimationFrame"] as any || window[c[a] + "CancelRequestAnimationFrame"] as any;
      }
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(h: FrameRequestCallback, e?: Element) {
          const d = new Date().getTime();
          const f = Math.max(0, 16 - (d - (window as any)._lastTime || 0));
          const g = window.setTimeout(function() { h(d + f); }, f);
          (window as any)._lastTime = d + f;
          return g;
        };
        if (!window.cancelAnimationFrame) {
          window.cancelAnimationFrame = function(d: number) {
            clearTimeout(d);
          };
        }
      }
    })();

    /*
     * Point class
     */
    class Point {
      x: number;
      y: number;

      constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
      }

      clone(): Point {
        return new Point(this.x, this.y);
      }

      length(length?: number): number | Point {
        if (typeof length === 'undefined') {
          return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        this.normalize();
        this.x *= length;
        this.y *= length;
        return this;
      }

      normalize(): Point {
        const length = this.length() as number;
        this.x /= length;
        this.y /= length;
        return this;
      }
    }

    /*
     * Particle class
     */
    class Particle {
      position: Point;
      velocity: Point;
      acceleration: Point;
      age: number;

      constructor() {
        this.position = new Point();
        this.velocity = new Point();
        this.acceleration = new Point();
        this.age = 0;
      }

      initialize(x: number, y: number, dx: number, dy: number): void {
        this.position.x = x;
        this.position.y = y;
        this.velocity.x = dx;
        this.velocity.y = dy;
        this.acceleration.x = dx * settings.particles.effect;
        this.acceleration.y = dy * settings.particles.effect;
        this.age = 0;
      }

      update(deltaTime: number): void {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;
        this.age += deltaTime;
      }

      draw(context: CanvasRenderingContext2D, image: HTMLImageElement): void {
        function ease(t: number): number {
          return (--t) * t * t + 1;
        }
        const size = image.width * ease(this.age / settings.particles.duration);
        context.globalAlpha = 1 - this.age / settings.particles.duration;
        context.drawImage(image, this.position.x - size / 2, this.position.y - size / 2, size, size);
      }
    }

    /*
     * ParticlePool class
     */
    class ParticlePool {
      private particles: Particle[];
      private firstActive: number = 0;
      private firstFree: number = 0;
      private duration: number = settings.particles.duration;

      constructor(length: number) {
        // create and populate particle pool
        this.particles = new Array(length);
        for (let i = 0; i < this.particles.length; i++) {
          this.particles[i] = new Particle();
        }
      }

      add(x: number, y: number, dx: number, dy: number): void {
        this.particles[this.firstFree].initialize(x, y, dx, dy);

        // handle circular queue
        this.firstFree++;
        if (this.firstFree === this.particles.length) this.firstFree = 0;
        if (this.firstActive === this.firstFree) this.firstActive++;
        if (this.firstActive === this.particles.length) this.firstActive = 0;
      }

      update(deltaTime: number): void {
        let i: number;

        // update active particles
        if (this.firstActive < this.firstFree) {
          for (i = this.firstActive; i < this.firstFree; i++) {
            this.particles[i].update(deltaTime);
          }
        }
        if (this.firstFree < this.firstActive) {
          for (i = this.firstActive; i < this.particles.length; i++) {
            this.particles[i].update(deltaTime);
          }
          for (i = 0; i < this.firstFree; i++) {
            this.particles[i].update(deltaTime);
          }
        }

        // remove inactive particles
        while (this.particles[this.firstActive].age >= this.duration && this.firstActive !== this.firstFree) {
          this.firstActive++;
          if (this.firstActive === this.particles.length) this.firstActive = 0;
        }
      }

      draw(context: CanvasRenderingContext2D, image: HTMLImageElement): void {
        let i: number;
        // draw active particles
        if (this.firstActive < this.firstFree) {
          for (i = this.firstActive; i < this.firstFree; i++) {
            this.particles[i].draw(context, image);
          }
        }
        if (this.firstFree < this.firstActive) {
          for (i = this.firstActive; i < this.particles.length; i++) {
            this.particles[i].draw(context, image);
          }
          for (i = 0; i < this.firstFree; i++) {
            this.particles[i].draw(context, image);
          }
        }
      }
    }

    /*
     * Putting it all together
     */
    const context = canvas.getContext('2d');
    if (!context) return;

    const particles = new ParticlePool(settings.particles.length);
    const particleRate = settings.particles.length / settings.particles.duration; // particles/sec
    let time: number;

    // get point on heart with -PI <= t <= PI
    function pointOnHeart(t: number): Point {
      return new Point(
        160 * Math.pow(Math.sin(t), 3),
        130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25
      );
    }

    // creating the particle image using a dummy canvas
    const image = (function(): HTMLImageElement {
      const dummyCanvas = document.createElement('canvas');
      const dummyContext = dummyCanvas.getContext('2d');
      if (!dummyContext) throw new Error('Could not get canvas context');

      dummyCanvas.width = settings.particles.size;
      dummyCanvas.height = settings.particles.size;

      // helper function to create the path
      function to(t: number): Point {
        const point = pointOnHeart(t);
        point.x = settings.particles.size / 2 + point.x * settings.particles.size / 350;
        point.y = settings.particles.size / 2 - point.y * settings.particles.size / 350;
        return point;
      }

      // create the path
      dummyContext.beginPath();
      let t = -Math.PI;
      let point = to(t);
      dummyContext.moveTo(point.x, point.y);
      while (t < Math.PI) {
        t += 0.01; // baby steps!
        point = to(t);
        dummyContext.lineTo(point.x, point.y);
      }
      dummyContext.closePath();

      // create the fill
      dummyContext.fillStyle = '#FF5CA4';
      dummyContext.fill();

      // create the image
      const img = new Image();
      img.src = dummyCanvas.toDataURL();
      return img;
    })();

    // render that thing!
    function render(): void {
      // next animation frame
      requestAnimationFrame(render);

      // update time
      const newTime = new Date().getTime() / 1000;
      const deltaTime = newTime - (time || newTime);
      time = newTime;

      // clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // create new particles
      const amount = particleRate * deltaTime;
      for (let i = 0; i < amount; i++) {
        const pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
        const dir = pos.clone().length(settings.particles.velocity) as Point;
        particles.add(canvas.width / 2 + pos.x, canvas.height / 2 - pos.y, dir.x, -dir.y);
      }

      // update and draw particles
      particles.update(deltaTime);
      particles.draw(context, image);
    }

    // handle (re-)sizing of the canvas
    function onResize(): void {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }

    window.addEventListener('resize', onResize);

    // delay rendering bootstrap
    setTimeout(function() {
      onResize();
      render();
    }, 10);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    
    <>
      <style>{`
        .heart-container {
          height: 100vh;
          padding: 0;
          margin: 0;
          background: #000;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .heart-box {
          width: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
        }

        .heart-canvas {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .heart-pinkboard {
          position: relative;
          margin: auto;
          height: 500px;
          width: 500px;
          animation: heart-animate 1.3s infinite;
        }

        .heart-pinkboard:before, .heart-pinkboard:after {
          content: '';
          position: absolute;
          background: #FF5CA4;
          width: 100px;
          height: 160px;
          border-top-left-radius: 50px;
          border-top-right-radius: 50px;
        }

        .heart-pinkboard:before {
          left: 100px;
          transform: rotate(-45deg);
          transform-origin: 0 100%;
          box-shadow: 0 14px 28px rgba(0,0,0,0.25),
          0 10px 10px rgba(0,0,0,0.22);
        }

        .heart-pinkboard:after {
          left: 0;
          transform: rotate(45deg);
          transform-origin: 100% 100%;
        }

        @keyframes heart-animate {
          0% {
            transform: scale(1);
          }
          30% {
            transform: scale(.8);
          }
          60% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>

      {/* Navigation buttons */}
      <div className="absolute top-4 left-4 z-50 flex gap-2">
        <button
          onClick={() => onNavigate(View.DASHBOARD)}
          className="flex items-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-2 rounded-full shadow-lg border border-white/20 transition-all hover:shadow-xl"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="text-sm font-medium">Trang chủ</span>
        </button>
      </div>

      <div className="heart-container">
        <div className="heart-box">
          <canvas ref={canvasRef} id="pinkboard" className="heart-canvas heart-pinkboard" />
        </div>
      </div>
    </>
  );
};

export default HeartAnimation;
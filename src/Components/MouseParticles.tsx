// import React, { useEffect, useRef } from "react";

// interface Particle {
//   x: number;
//   y: number;
//   size: number;
//   speedX: number;
//   speedY: number;
//   color: string;
//   opacity: number;
//   life: number;
// }

// const MouseParticles: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const particlesRef = useRef<Particle[]>([]);
//   const mouseRef = useRef({ x: 0, y: 0, active: false });

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();

//     const colors = [
//       "rgba(34, 197, 94, 0.4)", // Emerald-themed translucent
//       "rgba(16, 185, 129, 0.4)",
//       "rgba(255, 255, 255, 0.3)", // Pure glass
//       "rgba(134, 239, 172, 0.4)",
//     ];

//     let lastSpawnX = 0;
//     let lastSpawnY = 0;

//     const createParticle = (x: number, y: number) => {
//       const size = Math.random() * 10 + 5; // Slightly smaller max size
//       const speedX = (Math.random() - 0.5) * 0.8; // Reduced speed
//       const speedY = -(Math.random() * 0.8 + 0.3); // Slower floating
//       const color = colors[Math.floor(Math.random() * colors.length)];
//       const life = Math.random() * 70 + 50;

//       return { x, y, size, speedX, speedY, color, opacity: 1, life };
//     };

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // No auto-spawn in loop, only triggered by mouse move logic below

//       particlesRef.current = particlesRef.current.filter((p) => {
//         p.x += p.speedX;
//         p.y += p.speedY;
//         p.life--;
//         p.opacity = (p.life / 120) * 0.7; // Fade out slightly slower/more subtle

//         if (p.life <= 0) return false;

//         ctx.save();
//         ctx.globalAlpha = p.opacity;

//         // Bubble Body - Glassy Gradient
//         const gradient = ctx.createRadialGradient(
//           p.x - p.size * 0.3,
//           p.y - p.size * 0.3,
//           p.size * 0.1,
//           p.x,
//           p.y,
//           p.size,
//         );
//         gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
//         gradient.addColorStop(0.2, p.color);
//         gradient.addColorStop(1, "rgba(255, 255, 255, 0.05)");

//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//         ctx.fillStyle = gradient;
//         ctx.fill();

//         // Thin glass edge
//         ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
//         ctx.lineWidth = 0.5;
//         ctx.stroke();

//         // Specular Highlight (Small shining dot)
//         ctx.beginPath();
//         ctx.arc(
//           p.x - p.size * 0.4,
//           p.y - p.size * 0.4,
//           p.size * 0.15,
//           0,
//           Math.PI * 2,
//         );
//         ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
//         ctx.fill();

//         ctx.restore();

//         return true;
//       });

//       requestAnimationFrame(animate);
//     };

//     const handleMouseMove = (e: MouseEvent) => {
//       const { clientX, clientY } = e;
//       const dist = Math.hypot(clientX - lastSpawnX, clientY - lastSpawnY);

//       if (dist > 60) {
//         // Increased distance threshold from 35 to 60 for slower production
//         particlesRef.current.push(createParticle(clientX, clientY));
//         lastSpawnX = clientX;
//         lastSpawnY = clientY;
//       }

//       mouseRef.current.x = clientX;
//       mouseRef.current.y = clientY;
//     };

//     const handleMouseLeave = () => {
//       mouseRef.current.active = false;
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseleave", handleMouseLeave);

//     const animationId = requestAnimationFrame(animate);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseleave", handleMouseLeave);
//       cancelAnimationFrame(animationId);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed inset-0 pointer-events-none z-0"
//       style={{ mixBlendMode: "multiply" }}
//     />
//   );
// };

// export default MouseParticles;

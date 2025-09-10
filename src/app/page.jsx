"use client";
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Profile from "./components/profile";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef(null);
  const starsRef = useRef(null);
  const textRef = useRef(null);

  // Simple parallax with useScroll
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const starsY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 50,
    });

    if (starsRef.current) {
      gsap.to('.home-star', {
        opacity: 0.6,
        stagger: 0.02,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });
    }

    if (textRef.current) {
      gsap.fromTo('.hero-title', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
      gsap.fromTo('.hero-subtitle', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out" }
      );
      gsap.fromTo('.hero-description', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.4, ease: "power2.out" }
      );
      gsap.fromTo('.hero-buttons', 
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.6, ease: "power2.out" }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen overflow-hidden flex items-center justify-center"
        style={{
          background: 'radial-gradient(ellipse at top, #1a123b 0%, #0a0a20 50%, #000000 100%)'
        }}
      >
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a20] via-[#1a123b] to-[#2a1810] opacity-80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/20 to-pink-900/10"></div>
        </motion.div>

        {/* Parallax Stars */}
        <motion.div 
          ref={starsRef}
          className="absolute inset-0 z-10"
          style={{ y: starsY }}
        >
          {Array.from({ length: 50 }, (_, i) => (
            <div 
              key={i}
              className="home-star absolute rounded-full bg-white"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.6 + 0.2,
                boxShadow: `0 0 ${Math.random() * 6 + 3}px white`
              }}
            />
          ))}
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-15">
          <motion.div 
            className="absolute top-20 left-[10%] w-20 h-20 rounded-full border border-purple-400/30 bg-gradient-to-r from-blue-400/15 to-purple-600/15 backdrop-blur-sm opacity-20"
            animate={{ rotate: 360, y: [0, -15, 0] }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          <motion.div 
            className="absolute top-40 right-[15%] w-16 h-16 rounded-full border border-cyan-400/25 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm opacity-25"
            animate={{ rotate: -360, x: [0, 10, 0] }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              x: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
          />

          <motion.div 
            className="absolute bottom-32 left-[20%] w-24 h-24 rounded-full border border-pink-400/20 bg-gradient-to-r from-pink-400/10 to-purple-600/10 backdrop-blur-sm opacity-15"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ 
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </div>

        {/* Parallax Main Content */}
        <motion.div 
          ref={textRef} 
          className="relative z-30 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
          style={{ y: textY }}
        >
          {/* CSI 205 Badge */}
          <motion.div
            className="inline-block mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 backdrop-blur-sm"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)"
            }}
          >
            <span className="text-sm sm:text-base font-semibold text-purple-300">
              CSI 205 - Computer Science inovation
            </span>
          </motion.div>

          {/* Main Title */}
          <h1 
            className="hero-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 leading-none"
            style={{
              background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 25%, #ec4899 50%, #f59e0b 75%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.4))'
            }}
          >
            WELCOME
          </h1>

          {/* Subtitle */}
          <h2 
            className="hero-subtitle text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8"
            style={{
              textShadow: '0 0 20px rgba(96, 165, 250, 0.6)'
            }}
          >
            To The Future of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 mt-1 sm:mt-2">
              Web Development
            </span>
          </h2>

          {/* Description */}
          <p 
            className="hero-description text-sm sm:text-base md:text-lg lg:text-xl text-[#d6d6f7] max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2"
            style={{
              textShadow: '0 0 8px rgba(214, 214, 247, 0.2)'
            }}
          >
            กานบ้านรายวิชา Computer Science Interface ที่แสดงทักษะการพัฒนาเว็บแอปพลิเคชัน
            ด้วย Next.js, React และเทคโนโลยีสมัยใหม่ พร้อมเอฟเฟกต์และแอนิเมชันที่น่าประทับใจ
          </p>

          {/* Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <motion.button
              className="w-full sm:w-auto group relative px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold text-white overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 40px rgba(168, 85, 247, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View Team</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              className="w-full sm:w-auto group relative px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 border-2 border-cyan-400/60 rounded-full backdrop-blur-sm overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                borderColor: 'rgba(168, 85, 247, 0.8)',
                boxShadow: '0 0 24px rgba(168, 85, 247, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Learn More</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-purple-600/15"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="hidden sm:block absolute bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-5 h-8 lg:w-6 lg:h-10 border-2 border-white/25 rounded-full flex justify-center">
              <motion.div 
                className="w-1 h-2 lg:h-3 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full mt-1.5 lg:mt-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 z-25 pointer-events-none">
          {Array.from({ length: 10 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-40"
              style={{
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, -60, 0],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </section>

      {/* Profile Section */}
      <div className="relative">
        <Profile />
      </div>
    </>
  );
}
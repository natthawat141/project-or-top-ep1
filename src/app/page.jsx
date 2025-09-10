"use client";
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Profile from "./components/profile";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef(null);
  const starsRef = useRef(null);
  const floatingRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1500,
      once: false,
      offset: 100,
    });

    // Create animated stars
    if (starsRef.current) {
      gsap.set('.home-star', { opacity: 0 });
      gsap.to('.home-star', {
        opacity: 1,
        stagger: 0.05,
        duration: 2,
        ease: "power2.out",
        delay: 0.5
      });

      gsap.to('.home-star', {
        opacity: 0.3,
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
        repeatDelay: 0.5
      });
    }

    // Floating animations
    if (floatingRef.current) {
      const floatingElements = floatingRef.current.querySelectorAll('.floating-element');
      
      floatingElements.forEach((element, index) => {
        gsap.to(element, {
          y: -30,
          duration: 3 + (index * 0.5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3
        });
      });
    }

    // Text reveal animation
    if (textRef.current) {
      const timeline = gsap.timeline();
      
      timeline
        .from('.hero-title', {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out"
        })
        .from('.hero-subtitle', {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out"
        }, "-=0.5")
        .from('.hero-description', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.3")
        .from('.hero-buttons', {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.2");
    }

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top center",
      end: "bottom center",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        if (starsRef.current) {
          gsap.to('.home-star', {
            y: progress * -100,
            duration: 0.3,
            ease: "none"
          });
        }
      }
    });

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
      >
        {/* Animated Background Stars */}
        <div 
          ref={starsRef}
          className="absolute inset-0 z-0"
        >
          {[...Array(100)].map((_, i) => (
            <div 
              key={i}
              className="home-star absolute rounded-full"
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                backgroundColor: `hsl(${Math.random() * 60 + 200}, 70%, ${Math.random() * 30 + 70}%)`,
                boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`
              }}
            />
          ))}
        </div>

        {/* Gradient Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a20] via-[#1a123b] to-[#2a1810] z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 z-20"></div>

        {/* Floating Decorative Elements */}
        <div ref={floatingRef} className="absolute inset-0 z-20">
          <motion.div 
            className="floating-element absolute top-20 left-[10%] opacity-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-24 h-24 rounded-full border-2 border-blue-400 bg-gradient-to-r from-blue-400/20 to-purple-600/20 backdrop-blur-sm"></div>
          </motion.div>

          <motion.div 
            className="floating-element absolute top-40 right-[15%] opacity-25"
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-16 h-16 rounded-full border border-purple-400 bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm"></div>
          </motion.div>

          <motion.div 
            className="floating-element absolute bottom-32 left-[20%] opacity-15"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-32 h-32 rounded-full border-2 border-cyan-400 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 backdrop-blur-sm"></div>
          </motion.div>

          <motion.div 
            className="floating-element absolute bottom-20 right-[25%] opacity-20"
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-20 h-20 rounded-full border border-pink-400 bg-gradient-to-r from-pink-500/25 to-purple-500/25 backdrop-blur-sm"></div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div ref={textRef} className="relative z-30 text-center px-8 max-w-6xl mx-auto">
          {/* Main Title */}
          <motion.h1 
            className="hero-title text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-none"
            style={{
              background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 25%, #ec4899 50%, #f59e0b 75%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))'
            }}
          >
            WELCOME
          </motion.h1>

          {/* Subtitle */}
          <motion.h2 
            className="hero-subtitle text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-8"
            style={{
              textShadow: '0 0 30px rgba(96, 165, 250, 0.8)'
            }}
          >
            To The Future of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 mt-2">
              Digital Innovation
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p 
            className="hero-description text-lg md:text-xl text-[#d6d6f7] max-w-3xl mx-auto mb-12 leading-relaxed"
            style={{
              textShadow: '0 0 10px rgba(214, 214, 247, 0.3)'
            }}
          >
            Experience the next generation of web applications with cutting-edge design, 
            immersive animations, and revolutionary user experiences that push the boundaries 
            of what's possible in the digital realm.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              className="group relative px-10 py-4 text-lg font-bold text-white overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 10px 40px rgba(168, 85, 247, 0.4), 0 0 20px rgba(96, 165, 250, 0.3)'
              }}
            >
              <span className="relative z-10">Explore Now</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              className="group relative px-10 py-4 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 border-2 border-cyan-400 rounded-full backdrop-blur-sm overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                borderColor: '#a855f7',
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Learn More</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div 
                className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 z-25 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </section>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
      >
        <Profile />
      </motion.div>

    </>
  );
}
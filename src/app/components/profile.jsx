"use client";
import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PROFILES = [
  {
    name: "Natthawat Sawatdee",
    role: "Acting managing director 2Read ",
    bio: "Acting managing director 2Read ,Group Vice president of technology 2morrow group Startup-minded engineer. Focused on AI, EdTech, and shipping fast.",
    image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC0K01ieSFHHBioUbpnvAsBLhAkwJFBge3Dg&s`,
    tags: ["AI", "Next.js", "EdTech"],
  },
  {
    name: "Kittiwat Kudan",
    role: "Dek SPU CSI",
    bio: "นั่งงงกับสคริปต์ เลยกระซิบหา Ai.",
    image: "https://studentscms.spu.ac.th/stdempimg.cfm?empstdtype=STD&vdata=0CD4C4EFD78BFAA50529CFD6D800CCD282E4170DDFFFDDD3",
    tags: ["UX", "UI", "Figma"],
  },
  {
    name: "Siradech Srium",
    role: "Full-stack Developer",
    bio: "Next.js, Node.js, Cloud-native. I turn ideas into products.",
    image: "https://cdn.discordapp.com/attachments/1414953888531873884/1415320065171259483/stdempimg.png?ex=68c2c706&is=68c17586&hm=820e91035e9d7492c43f898d471b1cb27173615954224a36ca59a156dfcd1371&",
    tags: ["Coding ปฐมวัย"],
  },
  {
    name: "Thastanon kaisomsat",
    role: "Full-stack Developer",
    bio: "Full-stack Developer focusing on Frontend fundamentals and modern web technologies.",
    image: "https://media.discordapp.net/attachments/1308781226806607997/1308782698806116352/pakorn.jpg?ex=68c2cb5f&is=68c179df&hm=09f8615be7a48dda417286ac27ad94ebe4f54302159817fb8510bcf89d801fe3&=&format=webp&width=528&height=838",
    tags: ["React.js","TailwindCSS"],
  },
  {
    name: "Chok",
    role: "Fullstack Developer – System You Solution Co., Ltd., Fullstack Developer – theclassxury",
    bio: "Fullstack Developer with experience in building both Frontend and Backend applications, worked with System You Solution Co., Ltd. and theclassxury.",
    image: "https://studentscms.spu.ac.th/stdempimg.cfm?empstdtype=STD&vdata=0AD3CCE3D485FAA50529CFD7DC01C9D182E11706D6F6D6D5",
    tags: ["NextJS","Node","Software House"],
  },
];

// Pre-generate stars data to avoid hydration mismatch
const generateStars = () => {
  return Array.from({ length: 50 }, (_, i) => ({
    id: i,
    width: Math.random() * 3 + 1,
    height: Math.random() * 3 + 1,
    top: Math.random() * 100,
    left: Math.random() * 100,
    opacity: Math.random() * 0.6 + 0.2,
    color: `hsl(${Math.random() * 60 + 200}, 70%, ${Math.random() * 30 + 70}%)`
  }));
};

export default function ProfileGrid({
  title = "Our Team",
  description = "People behind the product.",
  profiles = PROFILES,
}) {
  const starsRef = useRef(null);
  const sectionRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    setMounted(true);
    setStars(generateStars());

    // Initialize AOS
    AOS.init({
      duration: 1200,
      once: false,
      offset: 50,
    });

    // GSAP animations for stars
    if (starsRef.current) {
      gsap.to('.profile-star', {
        opacity: 0.8,
        stagger: 0.15,
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: "sine.inOut",
        repeatDelay: 1
      });
    }

    // Section entrance animation
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
      );
    }

  }, []);

  // Don't render stars until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <section className="min-h-screen w-full bg-gradient-to-br from-[#0a0a20] via-[#1a123b] to-[#0a0a20]">
        <div className="flex items-center justify-center h-screen">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full px-4 py-16 overflow-hidden"
    >
      {/* Animated Stars Background */}
      <div 
        ref={starsRef} 
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {stars.map((star) => (
          <div 
            key={star.id}
            className="profile-star absolute rounded-full"
            style={{
              width: `${star.width}px`,
              height: `${star.height}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              backgroundColor: star.color,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.width * 3}px ${star.color}`
            }}
          />
        ))}
      </div>

      {/* Multiple Gradient Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a20] via-[#1a123b] to-[#2a1810] z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 z-5"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/20 to-pink-900/10 z-5"></div>
      
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-20 right-20 z-10 opacity-20"
        animate={{ 
          rotate: 360,
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-24 h-24 rounded-full border-2 border-purple-400 bg-gradient-to-r from-blue-400 to-purple-600 opacity-40 backdrop-blur-sm shadow-lg"></div>
      </motion.div>

      <motion.div 
        className="absolute top-40 left-20 z-10 opacity-25"
        animate={{ 
          rotate: -360,
          x: [0, 15, 0],
          y: [0, -10, 0]
        }}
        transition={{ 
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-16 h-16 rounded-full border border-cyan-400 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-50 backdrop-blur-sm shadow-xl"></div>
      </motion.div>

      <motion.div 
        className="absolute bottom-32 right-32 z-10 opacity-15"
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 7, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-32 h-32 rounded-full border-2 border-pink-400 bg-gradient-to-r from-pink-400/20 to-purple-600/20 backdrop-blur-sm"></div>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto">
        <header 
          className="mb-16 text-center"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))'
              }}
            >
              {title}
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-[#d6d6f7] max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              textShadow: '0 0 10px rgba(214, 214, 247, 0.3)'
            }}
          >
            {description}
          </motion.p>
        </header>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {profiles.map((p, i) => (
            <motion.article
              key={`${p.name}-${i}`}
              className="group relative"
              data-aos="fade-up"
              data-aos-delay={i * 150}
              whileHover={{ 
                y: -12,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/30 to-purple-600/30 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              
              {/* Main Card */}
              <div className="relative rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 shadow-2xl ring-1 ring-white/20 transition-all duration-500 hover:border-purple-400/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:bg-gradient-to-br hover:from-white/15 hover:to-white/10">
                
                {/* Profile Header */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-3xl ring-2 ring-purple-400/40 group-hover:ring-purple-400/70 transition-all duration-300">
                    {/* Profile Image Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 opacity-30 rounded-3xl group-hover:opacity-50 transition-opacity duration-300"></div>
                    
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover relative z-10 transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600">
                        {p.name?.[0] ?? "?"}
                      </div>
                    )}
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <motion.h2 
                      className="truncate text-xl font-bold text-white mb-1"
                      whileHover={{ 
                        backgroundImage: "linear-gradient(to right, #60a5fa, #a855f7, #ec4899)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        transition: { duration: 0.3 }
                      }}
                    >
                      {p.name}
                    </motion.h2>
                    <p className="text-sm text-blue-300 font-semibold truncate">{p.role}</p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm leading-7 text-[#d6d6f7] mb-6 line-clamp-3">
                  {p.bio}
                </p>

                {/* Tags */}
                {p.tags && p.tags.length > 0 && (
                  <motion.ul 
                    className="flex flex-wrap gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    {p.tags.map((t, idx) => (
                      <motion.li
                        key={idx}
                        className="relative group/tag"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Tag glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-xl opacity-0 group-hover/tag:opacity-30 transition-opacity duration-300 blur-sm"></div>
                        
                        <span className="relative inline-block rounded-xl border border-purple-400/40 bg-gradient-to-r from-blue-500/20 to-purple-600/20 px-4 py-2 text-xs font-semibold text-blue-200 backdrop-blur-sm transition-all duration-300 group-hover/tag:border-purple-400/80 group-hover/tag:text-white group-hover/tag:shadow-lg group-hover/tag:bg-gradient-to-r group-hover/tag:from-blue-500/30 group-hover/tag:to-purple-600/30">
                          {t}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}

                {/* Floating particles around card */}
                <motion.div
                  className="absolute -top-3 -right-3 w-3 h-3 bg-purple-400 rounded-full opacity-70"
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.7, 1, 0.7],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                />
                
                <motion.div
                  className="absolute -bottom-2 -left-3 w-2 h-2 bg-cyan-400 rounded-full opacity-60"
                  animate={{
                    y: [0, 12, 0],
                    opacity: [0.6, 1, 0.6],
                    x: [0, 5, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />

                <motion.div
                  className="absolute top-1/2 -right-2 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-50"
                  animate={{
                    x: [0, -8, 0],
                    opacity: [0.5, 0.9, 0.5]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    delay: i * 0.7
                  }}
                />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom section with additional decorative elements */}
        <motion.div 
          className="mt-20 text-center"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <motion.div 
            className="w-48 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-40 mx-auto mb-8"
            animate={{ 
              scaleX: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
          <motion.p 
            className="text-lg text-[#d6d6f7] opacity-70"
            animate={{
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Together, we build the future
          </motion.p>
        </motion.div>
      </div>

      {/* Additional floating particles */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-40"
            style={{
              top: `${20 + (i * 7)}%`,
              left: `${10 + (i * 6)}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </section>
  );
}

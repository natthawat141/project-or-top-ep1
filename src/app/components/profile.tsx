"use client";
import * as React from "react";
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import AOS from 'aos';
import 'aos/dist/aos.css';

type Profile = {
  name: string;
  role: string;
  bio: string;
  image?: string;
  tags?: string[];
};

const PROFILES: Profile[] = [
  {
    name: "Natthawat Sawatdee",
    role: "MD & Head of Technology @ 2Read",
    bio: "Startup-minded engineer. Focused on AI, EdTech, and shipping fast.",
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
    name: "kron",
    role: "Full-stack Developer",
    bio: "Next.js, Node.js, Cloud-native. I turn ideas into products.",
    image: "https://cdn.discordapp.com/attachments/1414953888531873884/1415320065171259483/stdempimg.png?ex=68c2c706&is=68c17586&hm=820e91035e9d7492c43f898d471b1cb27173615954224a36ca59a156dfcd1371&",
    tags: ["Coding ปฐมวัย"],
  },
  {
    name: "chock",
    role: "Full-stack Developer",
    bio: "Next.js, Node.js, Cloud-native. I turn ideas into products.",
    image: "https://cdn.discordapp.com/attachments/1414953888531873884/1415320065171259483/stdempimg.png?ex=68c2c706&is=68c17586&hm=820e91035e9d7492c43f898d471b1cb27173615954224a36ca59a156dfcd1371&",
    tags: ["Coding ปฐมวัย"],
  },
];

export default function ProfileGrid({
  title = "Our Team",
  description = "People behind the product.",
  profiles = PROFILES,
}: {
  title?: string;
  description?: string;
  profiles?: Profile[];
}) {
  const starsRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
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

  return (
    <section 
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-4 py-16 overflow-hidden"
    >
      {/* Animated Stars Background */}
      <div 
        ref={starsRef} 
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="profile-star absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.6 + 0.2
            }}
          />
        ))}
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a20] via-[#1a123b] to-[#0a0a20] opacity-90 z-0"></div>
      
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-10 right-10 z-10 opacity-20"
        animate={{ 
          rotate: 360,
          y: [0, -10, 0]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-16 h-16 rounded-full border-2 border-purple-400 bg-gradient-to-r from-blue-400 to-purple-600 opacity-30"></div>
      </motion.div>

      <motion.div 
        className="absolute bottom-20 left-10 z-10 opacity-25"
        animate={{ 
          rotate: -360,
          x: [0, 15, 0]
        }}
        transition={{ 
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          x: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-12 h-12 rounded-full border border-blue-400 bg-gradient-to-r from-purple-500 to-blue-500 opacity-40"></div>
      </motion.div>

      <header 
        className="mb-12 text-center relative z-20"
        data-aos="fade-down"
        data-aos-delay="100"
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400">
            {title}
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-lg text-[#d6d6f7] max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {description}
        </motion.p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 relative z-20">
        {profiles.map((p, i) => (
          <motion.article
            key={`${p.name}-${i}`}
            className="group relative"
            data-aos="fade-up"
            data-aos-delay={i * 150}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            {/* Card Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Main Card */}
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md p-6 shadow-2xl ring-1 ring-white/10 transition-all duration-300 hover:border-purple-400/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              
              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-2 ring-purple-400/30">
                  {/* Profile Image Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 opacity-20 rounded-2xl"></div>
                  
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover relative z-10"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600">
                      {p.name?.[0] ?? "?"}
                    </div>
                  )}
                </div>
                
                <div className="min-w-0">
                  <motion.h2 
                    className="truncate text-lg font-bold text-white"
                    whileHover={{ 
                      backgroundImage: "linear-gradient(to right, #60a5fa, #a855f7)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                  >
                    {p.name}
                  </motion.h2>
                  <p className="truncate text-sm text-blue-300 font-medium">{p.role}</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm leading-6 text-[#d6d6f7] mb-4">
                {p.bio}
              </p>

              {/* Tags */}
              {p.tags && p.tags.length > 0 && (
                <motion.ul 
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  {p.tags.map((t, idx) => (
                    <motion.li
                      key={idx}
                      className="relative group/tag"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Tag glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-xl opacity-0 group-hover/tag:opacity-20 transition-opacity duration-300 blur-sm"></div>
                      
                      <span className="relative inline-block rounded-xl border border-purple-400/30 bg-gradient-to-r from-blue-500/10 to-purple-600/10 px-3 py-1.5 text-xs font-medium text-blue-200 backdrop-blur-sm transition-all duration-300 group-hover/tag:border-purple-400/60 group-hover/tag:text-white group-hover/tag:shadow-lg">
                        {t}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}

              {/* Floating particles around card */}
              <motion.div
                className="absolute -top-2 -right-2 w-2 h-2 bg-purple-400 rounded-full opacity-60"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
              
              <motion.div
                className="absolute -bottom-3 -left-2 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-50"
                animate={{
                  y: [0, 8, 0],
                  opacity: [0.5, 0.9, 0.5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            </div>
          </motion.article>
        ))}
      </div>

      {/* Bottom floating decoration */}
      <motion.div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-30"
        animate={{ 
          scaleX: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
    </section>
  );
}
"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const starsY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0.9, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = self.progress;
          if (headerRef.current) {
            gsap.to(headerRef.current, {
              backdropFilter: `blur(${Math.min(progress * 20, 16)}px)`,
              backgroundColor: `rgba(0, 0, 0, ${Math.min(progress * 0.8, 0.8)})`,
              duration: 0.3
            });
          }
        }
      });

      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = self.progress * 100;
          if (progressRef.current) {
            gsap.to(progressRef.current, {
              width: `${progress}%`,
              duration: 0.1
            });
          }
        }
      });

      if (starsRef.current) {
        const stars = starsRef.current.querySelectorAll('.cosmic-star');
        stars.forEach((star, index) => {
          ScrollTrigger.create({
            trigger: "body",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
              const speed = (index % 3 + 1) * 0.5;
              const yPos = self.progress * 100 * speed;
              gsap.set(star, { y: -yPos });
            }
          });
        });
      }

      const sections = gsap.utils.toArray('section') as Element[];
      sections.forEach((section) => {
        gsap.fromTo(section, 
          { 
            opacity: 0, 
            y: 100,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, []);

  const techStack = [
    { name: "Next.js", color: "blue" },
    { name: "React", color: "purple" },
    { name: "Tailwind", color: "pink" }
  ];

  const courseInfo = [
    { title: "รายวิชา", content: "CSI 205 - Computer Science Interface" },
    { title: "ภาคเรียน", content: "1/2568 " },
    { title: "หัวข้อ", content: "Web Development with Modern Frameworks" }
  ];

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#team", label: "Team" },
    { href: "#about", label: "About" }
  ];

  return (
    <html lang="th" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1a123b" />
        <meta name="msapplication-TileColor" content="#1a123b" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden selection:bg-purple-500/30 selection:text-white`}
        style={{
          background: 'radial-gradient(ellipse at top, #1a123b 0%, #0a0a20 50%, #000000 100%)',
          minHeight: '100vh'
        }}
      >
        <div className="fixed top-0 left-0 right-0 z-[100] h-1">
          <div className="h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60">
            <div 
              ref={progressRef}
              className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 shadow-lg transition-all duration-100"
              style={{ width: '0%' }}
            />
          </div>
        </div>

        <motion.div 
          className="fixed inset-0 z-[-1] pointer-events-none"
          style={{ y: backgroundY }}
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/20 to-pink-900/10" />
          </div>
          
          <motion.div 
            ref={starsRef}
            className="absolute inset-0"
            style={{ y: starsY }}
          >
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className="cosmic-star absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 2 + 1 + 'px',
                  height: Math.random() * 2 + 1 + 'px',
                  top: Math.random() * 120 + '%',
                  left: Math.random() * 100 + '%',
                  opacity: Math.random() * 0.4 + 0.1,
                  boxShadow: `0 0 ${Math.random() * 6 + 3}px currentColor`
                }}
              />
            ))}
          </motion.div>

          <div
            className="absolute top-20 left-10 w-20 h-20 border border-purple-400/20 rounded-full opacity-30"
            style={{
              transform: `translateY(${scrollY * 0.2}px) rotate(${scrollY * 0.1}deg)`
            }}
          />

          <div
            className="absolute top-40 right-20 w-16 h-16 border border-blue-400/20 rotate-45 opacity-25"
            style={{
              transform: `translateY(${scrollY * -0.15}px) rotate(${45 + scrollY * 0.1}deg)`
            }}
          />
        </motion.div>

        <div className="relative z-10">
          <motion.header 
            ref={headerRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
              isScrolled 
                ? 'backdrop-blur-xl bg-black/80 border-b border-white/20 shadow-2xl' 
                : 'backdrop-blur-md bg-black/20 border-b border-white/10'
            }`}
            style={{ opacity: headerOpacity }}
          >
            <div className="max-w-7xl mx-auto px-6 py-4">
              <nav className="flex items-center justify-between">
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold">C</span>
                  </div>
                  <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    CSI 205
                  </h1>
                </motion.div>

                <div className="hidden md:flex items-center space-x-8">
                  {navItems.map((item) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium group"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </motion.a>
                  ))}
                </div>

                <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 backdrop-blur-sm">
                  <span className="text-sm font-semibold text-purple-300">
                    Homework Assignment
                  </span>
                </div>
              </nav>
            </div>
          </motion.header>

          <main className="pt-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {children}
            </motion.div>
          </main>

          <motion.footer 
            className="relative mt-20 py-12 border-t border-white/10 bg-gradient-to-t from-black/20 to-transparent overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                  CSI 205 Homework
                </h3>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  งานบ้านรายวิชา Computer Science Interface พัฒนาด้วย Next.js และ React 
                  เพื่อแสดงทักษะการพัฒนาเว็บแอปพลิเคชันสมัยใหม่
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-col md:flex-row items-center justify-between mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-sm text-gray-500 mb-4 md:mb-0">
                  © 2025 CSI 205 Team. Created with passion for learning.
                </div>
                
                <div className="flex items-center space-x-6">
                  <span className="text-sm text-gray-400">Technologies:</span>
                  <div className="flex items-center space-x-3">
                    {techStack.map((tech, index) => (
                      <motion.span
                        key={tech.name}
                        className={`px-3 py-1 text-xs bg-${tech.color}-500/20 text-${tech.color}-300 rounded-full border border-${tech.color}-400/30`}
                        whileHover={{ scale: 1.05, y: -1 }}
                        transition={{ duration: 0.2 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {tech.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="pt-8 border-t border-white/5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
                  {courseInfo.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                      viewport={{ once: true }}
                      whileHover={{ y: -3 }}
                    >
                      <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                      <p>{item.content}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30" />
          </motion.footer>
        </div>

        <motion.button
          className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transition-all duration-300 ${
            scrollY > 300 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)"
          }}
        >
          <svg
            className="w-6 h-6 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      </body>
    </html>
  );
}
// testing
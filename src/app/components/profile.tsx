// components/ProfileGrid.tsx
"use client";

import * as React from "react";

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
    name: "Cyn2",
    role: "Product Designer",
    bio: "Crafting accessible, delightful experiences for web & mobile.",
    image: "https://i.pravatar.cc/160?img=2",
    tags: ["UX", "UI", "Figma"],
  },
  {
    name: "John Smith",
    role: "Full-stack Developer",
    bio: "Next.js, Node.js, Cloud-native. I turn ideas into products.",
    image: "https://i.pravatar.cc/160?img=3",
    tags: ["Next.js", "Node", "Docker"],
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
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm md:text-base text-gray-500 mt-1">{description}</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {profiles.map((p, i) => (
          <article
            key={`${p.name}-${i}`}
            className="group rounded-2xl border border-gray-200/60 bg-white/50 p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-1 ring-black/5">
                {p.image ? (
                  // ใช้ <img> เพื่อหลีกเลี่ยงการตั้งค่า next/image domain
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-lg font-semibold">
                    {p.name?.[0] ?? "?"}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold">{p.name}</h2>
                <p className="truncate text-sm text-gray-500">{p.role}</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-700 dark:text-gray-200">
              {p.bio}
            </p>

            {p.tags && p.tags.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t, idx) => (
                  <li
                    key={idx}
                    className="rounded-xl border border-gray-200/60 px-2.5 py-1 text-xs text-gray-600 dark:border-white/10"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

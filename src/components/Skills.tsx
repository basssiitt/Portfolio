"use client";

import { useState } from "react";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";

interface SkillCategory {
  id: string;
  name: string;
  color: "cyan" | "violet" | "amber";
  description: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    color: "cyan",
    description: "Modern component architectures, fluid motion, and responsive interfaces.",
    skills: [
      "Next.js 15/16 (App Router)",
      "React 19 & Server Components",
      "TypeScript (Strict)",
      "Tailwind CSS v4",
      "Three.js & React Three Fiber",
      "GSAP & ScrollTrigger",
      "Framer Motion",
      "State Management (Zustand)",
      "HTML5 / Semantic Web",
    ],
  },
  {
    id: "backend",
    name: "Backend",
    color: "violet",
    description: "Scalable server systems, resilient databases, and secure APIs.",
    skills: [
      "Node.js & Express",
      "Next.js Server Actions & Route Handlers",
      "PostgreSQL",
      "Supabase & Firebase",
      "Prisma ORM",
      "Redis Caching",
      "RESTful APIs & GraphQL",
      "Auth (NextAuth, OAuth, JWT)",
      "Webhook Integrations",
    ],
  },
  {
    id: "ai",
    name: "AI Solutions",
    color: "amber",
    description: "Integrating intelligent LLM workflows, custom agents, and vector search.",
    skills: [
      "OpenAI & Claude API integrations",
      "AI Chatbots & Conversational UX",
      "RAG (Retrieval-Augmented Gen)",
      "Vector Embeddings (Pinecone/pgvector)",
      "Function Calling & Agents",
      "Prompt Engineering & Eval",
      "Vercel AI SDK",
    ],
  },
  {
    id: "devops",
    name: "DevOps & Cloud",
    color: "cyan",
    description: "Automated pipelines, edge deployment, and cloud infrastructure.",
    skills: [
      "Vercel Edge & Cloudflare",
      "Docker & Containers",
      "CI/CD (GitHub Actions)",
      "Linux / Bash Scripting",
      "Git & Trunk-Based Dev",
      "Performance Monitoring",
      "SSL & DNS Configuration",
    ],
  },
  {
    id: "design",
    name: "Design & UX",
    color: "violet",
    description: "Crafting polished design systems, glassmorphism, and seamless interactions.",
    skills: [
      "Figma UI/UX Prototyping",
      "Glassmorphic Design Systems",
      "Mobile-First Responsive Layouts",
      "Micro-Interactions & Motion",
      "Typography & Hierarchy",
      "Design System Architecture",
    ],
  },
  {
    id: "a11y",
    name: "Accessibility (A11y)",
    color: "amber",
    description: "Ensuring every experience is universally usable, compliant, and accessible.",
    skills: [
      "WCAG 2.1 AA/AAA Standards",
      "Semantic HTML Landmarks",
      "ARIA Attributes & Roles",
      "Full Keyboard Navigation",
      "Screen Reader Optimization",
      "Prefers-Reduced-Motion Guards",
      "Color Contrast & Focus Rings",
    ],
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredCategories =
    activeTab === "all"
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeTab);

  return (
    <section
      id="skills"
      aria-label="Technical Skills and Capabilities"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        eyebrow="02 // TECHNICAL ARSENAL"
        title="Skills & Technologies"
        description="A specialized toolkit focused on rapid execution, modern architectural standards, and high-performance delivery."
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
            activeTab === "all"
              ? "bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              : "bg-[var(--glass)] text-[var(--text-muted)] hover:text-white border border-[var(--glass-border)]"
          }`}
          aria-pressed={activeTab === "all"}
        >
          All Skills ({skillCategories.reduce((acc, c) => acc + c.skills.length, 0)})
        </button>

        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveTab(cat.id)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              activeTab === cat.id
                ? cat.color === "cyan"
                  ? "bg-[var(--cyan)] text-black font-semibold shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                  : cat.color === "violet"
                  ? "bg-[var(--violet)] text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                  : "bg-[var(--amber)] text-black font-semibold shadow-[0_0_15px_rgba(255,184,107,0.4)]"
                : "bg-[var(--glass)] text-[var(--text-muted)] hover:text-white border border-[var(--glass-border)]"
            }`}
            aria-pressed={activeTab === cat.id}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <GlassCard
            key={category.id}
            glowColor={category.color}
            className="p-6 sm:p-7 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      category.color === "cyan"
                        ? "bg-[var(--cyan)]"
                        : category.color === "violet"
                        ? "bg-[var(--violet)]"
                        : "bg-[var(--amber)]"
                    }`}
                  />
                  {category.name}
                </h3>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  {category.skills.length} tools
                </span>
              </div>

              <p className="text-xs text-[var(--text-muted)] mb-5">
                {category.description}
              </p>

              {/* Pills Grid */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center text-xs px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-[var(--text)] hover:border-white/20 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

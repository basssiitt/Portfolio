import GlassCard from "@/components/GlassCard";
import MagneticButton from "@/components/MagneticButton";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--glass)] border border-[var(--glass-border)] backdrop-blur-md text-xs sm:text-sm text-[var(--cyan)] font-mono">
          <span className="w-2 h-2 rounded-full bg-[var(--cyan)] animate-ping" />
          Founder &amp; CEO @ Claslo • Full Stack Developer
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-heading tracking-tight text-white leading-tight">
          Abdul Basit Chandio
        </h1>

        <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
          Engineering fast, accessible, and high-impact web products. Specializing
          in Next.js architectures, modern full-stack systems, and AI integrations.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <MagneticButton href="#work" variant="primary">
            View Work
          </MagneticButton>
          <MagneticButton href="#contact" variant="secondary">
            Let&apos;s Talk
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left">
          <GlassCard glowColor="cyan" className="p-6">
            <span className="text-xs font-mono text-[var(--cyan)]">01 / ROLE</span>
            <h2 className="text-lg font-heading font-semibold text-white mt-2">
              Founder &amp; CEO
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Bootstrapping Claslo, delivering modern education and SaaS tools.
            </p>
          </GlassCard>

          <GlassCard glowColor="violet" className="p-6">
            <span className="text-xs font-mono text-[var(--violet)]">02 / STACK</span>
            <h2 className="text-lg font-heading font-semibold text-white mt-2">
              Full Stack Engineer
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Next.js, TypeScript, React 19, Node.js, Tailwind &amp; Cloud.
            </p>
          </GlassCard>

          <GlassCard glowColor="amber" className="p-6">
            <span className="text-xs font-mono text-[var(--amber)]">03 / FOCUS</span>
            <h2 className="text-lg font-heading font-semibold text-white mt-2">
              AI &amp; Scale
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Building accessible web apps with high performance and AI workflows.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

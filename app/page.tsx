import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Button from "./components/Button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 px-6 md:px-12 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-[var(--foreground)]">
            Browse everything.
          </h1>

          <div className="w-full max-w-5xl h-[400px] md:h-[500px] rounded-3xl overflow-hidden relative mb-12 shadow-xl">
            <Image
              src="/assets/hero.png"
              alt="Productivity Landscape"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-10 left-10 text-white text-left z-10">
              <div className="text-6xl font-serif mb-2">78%</div>
              <div className="text-sm uppercase tracking-wider">Productivity Increase</div>
            </div>
          </div>

          <div className="flex gap-8 justify-center items-center text-[var(--muted)] mb-20">
            <span>All features</span>
            <span>Settings</span>
            <span>Logs/goals</span>
            <span>Shortcuts</span>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">We&apos;ve cracked the code.</h2>
            <p className="text-[var(--muted)] max-w-xl">
              Master your schedule with our intuitive tools designed for modern life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {[
              { title: "Task Manager", desc: "Organize your daily tasks with ease and precision." },
              { title: "Progress Tracking", desc: "Visualize your productivity with beautiful charts." },
              { title: "Smart Reminders", desc: "Never miss a deadline with intelligent notifications." },
              { title: "Cloud Sync", desc: "Access your lists from anywhere, on any device." }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--secondary)] mb-2"></div>
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="text-sm text-[var(--muted)]">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="w-full h-[400px] rounded-3xl overflow-hidden relative mb-24">
            <Image
              src="/assets/landscape.png"
              alt="Serene Landscape"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* See the Big Picture Section */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">See the Big Picture</h2>
            <p className="text-[var(--muted)] mb-8 leading-relaxed">
              Gain a comprehensive view of your life&apos;s projects and goals. Our dashboard brings everything together in one place.
            </p>
            <ul className="space-y-4 mb-8">
              {["Track personal and professional goals", "Visualize your long-term progress", "Collaborate with friends and family"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></span>
                  {item}
                </li>
              ))}
            </ul>
            <Button variant="secondary">Read More</Button>
          </div>
          <div className="h-[500px] rounded-3xl relative overflow-hidden">
            <Image
              src="/assets/abstract.png"
              alt="Abstract Shapes"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Me Do List?</h2>
            <Button variant="secondary" size="sm" className="rounded-full px-6">Features</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[var(--border)] pt-12">
            {[
              { title: "Focus", items: ["Distraction-free mode", "Pomodoro timer", "Focus sounds"] },
              { title: "Organization", items: ["Smart folders", "Tags & labels", "Priority levels"] },
              { title: "Integration", items: ["Calendar sync", "Email tasks", "API access"] }
            ].map((col, i) => (
              <div key={i} className={i !== 2 ? "md:border-r border-[var(--border)] pr-8" : ""}>
                <h3 className="text-xl font-bold mb-6">{col.title}</h3>
                <ul className="space-y-4">
                  {col.items.map((item, j) => (
                    <li key={j} className="text-sm text-[var(--muted)] py-2 border-b border-[var(--border)] last:border-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="h-[500px] rounded-3xl overflow-hidden relative">
            <Image
              src="/assets/art.png"
              alt="Artistic Sculpture"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <blockquote className="text-2xl md:text-3xl font-serif leading-relaxed mb-8">
              &quot;I was skeptical, but Me Do List has completely transformed the way I manage my business. The interface is clean and intuitive, and the platform is a joy to use.&quot;
            </blockquote>
            <cite className="not-italic font-bold block mb-1">Jane Doe</cite>
            <span className="text-sm text-[var(--muted)]">CEO, Creative Studio</span>
          </div>
        </section>

        {/* Map Your Success */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Map Your Success</h2>
            <Button variant="secondary">View Map</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { num: "01", title: "Plan", desc: "Create a detailed roadmap for your projects." },
              { num: "02", title: "Execute", desc: "Stay on track with daily tasks and reminders." },
              { num: "03", title: "Review", desc: "Analyze your performance and adjust as needed." }
            ].map((step, i) => (
              <div key={i}>
                <div className="text-5xl font-serif text-[var(--muted)]/30 mb-4">{step.num}</div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--muted)]">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="w-full h-[400px] rounded-3xl overflow-hidden relative">
            <Image
              src="/assets/map.png"
              alt="Success Map"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Connect with us</h2>
          <p className="text-[var(--muted)] mb-8">Join thousands of organized people today.</p>
          <Link href="/signup">
            <Button size="lg" className="w-full max-w-md">Get Started</Button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import { useEffect, useState } from 'react';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import HomeSection from './components/HomeSection';
import PortfolioSection from './components/PortfolioSection';
import ResumeSection from './components/ResumeSection';
import ServicesSection from './components/ServicesSection';
import SkillsSection from './components/SkillsSection';

const roles = ['Frontend Developer.', 'Web Designer.', 'Coder.', 'Web Developer.'];

const facts = [
  { count: 12, label: 'personal Projects' },
  { count: 34, label: 'github commits' },
  { count: 4, label: 'Certificate' },
  { count: 73, label: 'github Repo' }
];

export default function App() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('blue');
  const [counts, setCounts] = useState(facts.map(() => 0));

  const currentWord = roles[roleIndex];
  const displayedText = currentWord.slice(0, charIndex);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          setCharIndex((prev) => prev + 1);
        } else {
          setTimeout(() => {
            setIsDeleting(true);
          }, 800);
        }
      } else if (charIndex > 0) {
        setCharIndex((prev) => prev - 1);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setCharIndex(0);
      }
    }, isDeleting ? 70 : charIndex < currentWord.length ? 100 : 800);

    return () => clearTimeout(timeout);
  }, [charIndex, currentWord, isDeleting, roleIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = Number(entry.target.dataset.count);
            let start = 0;
            const stepTime = Math.max(Math.floor(2000 / target), 20);
            const timer = setInterval(() => {
              start += 1;
              setCounts((prev) => {
                const next = [...prev];
                next[Number(entry.target.dataset.index)] = start;
                return next;
              });
              if (start >= target) {
                clearInterval(timer);
              }
            }, stepTime);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('.counter').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--brand', theme === 'pink' ? '#ff7eb3' : theme === 'mint' ? '#7aeea8' : '#5b8cff');
    document.documentElement.style.setProperty('--brand-2', theme === 'pink' ? '#ffd1e5' : theme === 'mint' ? '#5b8cff' : '#7aeea8');
  }, [theme]);

  return (
    <div className="min-h-screen bg-transparent text-slate-100">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(14,15,20,0.6)] backdrop-blur">
        <div className="mx-auto flex w-[min(1150px,92%)] items-center justify-between py-4">
          <a href="#home" className="flex items-center gap-2 font-semibold tracking-wide text-white">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] font-[Sonsie_One] text-[20px] text-[#0b0c11]">
              R
            </span>
            <span className="font-headline text-xl">Rita Akter</span>
          </a>
          <nav className="hidden md:block">
            <ul className="flex list-none gap-5 text-sm text-[var(--muted)]">
              {['Home', 'About', 'Services', 'Resume', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="transition hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button className="rounded-xl border border-[var(--border)] bg-[#131521] px-3 py-2 text-sm md:hidden" onClick={() => setIsMenuOpen((open) => !open)}>
            Menu ▾
          </button>
        </div>
        {isMenuOpen && (
          <div className="border-t border-[var(--border)] bg-[#0f1117] px-4 py-4 md:hidden">
            <ul className="grid gap-3 text-sm text-[var(--muted)]">
              {['Home', 'About', 'Services', 'Resume', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="block py-1 transition hover:text-white" onClick={() => setIsMenuOpen(false)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <HomeSection displayedText={displayedText} />
      <AboutSection />
      <SkillsSection />
      <ServicesSection />
      <ResumeSection />
      <PortfolioSection />
      <ContactSection />

      <footer className="border-t border-[var(--border)] px-0 py-10 text-center text-[var(--muted)]">
        <div className="mx-auto w-[min(1150px,92%)]">
          <h2 className="pb-2 text-xl font-semibold text-white">Rita Akter Laboni</h2>
          <div className="mt-2 flex justify-center gap-3">
            <a href="https://www.facebook.com/Rita Akter" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook fa-lg"></i></a>
            <a href="https://www.linkedin.com/in/rita-akter-laboni-56a66237a/" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin fa-lg"></i></a>
            <a href="https://github.com/Ritaakterlaboni/" target="_blank" rel="noreferrer"><i className="fa-brands fa-github fa-lg"></i></a>
          </div>
          <p className="mt-4">&copy; 2025 Rita Akter Laboni. All rights reserved.</p>
        </div>
      </footer>

      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        <button className="h-9 w-9 rounded-xl border border-[var(--border)] bg-[#5b8cff]" onClick={() => setTheme('blue')} title="Blue" />
        <button className="h-9 w-9 rounded-xl border border-[var(--border)] bg-[#ff7eb3]" onClick={() => setTheme('pink')} title="Pink" />
        <button className="h-9 w-9 rounded-xl border border-[var(--border)] bg-[#7aeea8]" onClick={() => setTheme('mint')} title="Mint" />
      </div>
    </div>
  );
}

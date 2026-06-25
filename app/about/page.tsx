import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { defaultContent } from '@/lib/content';

export default function AboutPage() {
  const { aboutSection, advantagesSection } = defaultContent;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24" style={{ background: '#1E0C06' }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: '#E1764D' }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: '#E1764D', fontFamily: "'Inter', sans-serif" }}>Our story</span>
          </div>
          <h1 style={{ fontFamily: "'KyivType Sans', serif", fontWeight: 500, fontSize: 'clamp(36px,6vw,72px)', color: '#F1DED0', lineHeight: 1.1 }}>
            {aboutSection.heading}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed" style={{ color: '#9F8578', fontFamily: "'Inter', sans-serif" }}>
            {aboutSection.body}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
          {advantagesSection.items.map((item, i) => (
            <div key={i} className="p-6 border" style={{ background: '#180b05', borderColor: 'rgba(225,118,77,0.1)' }}>
              <h3 className="text-base mb-2" style={{ fontFamily: "'KyivType Sans', serif", color: '#F1DED0', fontWeight: 500 }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#7A574B', fontFamily: "'Inter', sans-serif" }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

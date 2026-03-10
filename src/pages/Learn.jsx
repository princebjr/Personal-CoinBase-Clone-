import { useState, useEffect, useRef } from 'react';
import useReveal from '../hooks/useReveal';


function Reveal({ children, variant = 'reveal-fade-up', delay = '', className = '', style = {} }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${variant} ${delay} ${className}`} style={style}>
      {children}
    </div>
  );
}

const TOPICS = [
  {
    id: 1,
    title: 'What is Bitcoin?',
    description: 'Learn about the world\'s first cryptocurrency and how it works.',
    reward: '$5 BTC',
    rewardColor: '#F7931A',
    duration: '10 min',
    level: 'Beginner',
    category: 'Basics',
    thumb: { from: '#1652F0', via: '#0E3EC4', to: '#7C3AED' },
    icon: (
      <svg viewBox="0 0 56 56" fill="none" width="56" height="56">
        <circle cx="28" cy="28" r="22" fill="rgba(255,255,255,0.12)" />
        <text x="28" y="35" textAnchor="middle" fontSize="22" fontWeight="900" fill="#F7931A">₿</text>
      </svg>
    ),
  },
  {
    id: 2,
    title: 'What is Ethereum?',
    description: 'Discover the smart contract platform that powers DeFi and NFTs.',
    reward: '$5 ETH',
    rewardColor: '#627EEA',
    duration: '8 min',
    level: 'Beginner',
    category: 'Basics',
    thumb: { from: '#627EEA', via: '#4C63BB', to: '#312E81' },
    icon: (
      <svg viewBox="0 0 56 56" fill="none" width="56" height="56">
        <polygon points="28,10 38,28 28,34 18,28" fill="rgba(255,255,255,0.9)" />
        <polygon points="28,34 38,28 28,46 18,28" fill="rgba(255,255,255,0.5)" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Crypto Security',
    description: 'Learn how to keep your crypto safe and secure.',
    reward: '$3 USDC',
    rewardColor: '#2775CA',
    duration: '12 min',
    level: 'Intermediate',
    category: 'Security',
    thumb: { from: '#059669', via: '#047857', to: '#064E3B' },
    icon: (
      <svg viewBox="0 0 56 56" fill="none" width="56" height="56">
        <path d="M28 12 L42 18 L42 30 C42 38 35 44 28 46 C21 44 14 38 14 30 L14 18 Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
        <path d="M22 28l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'DeFi Explained',
    description: 'Understand decentralized finance and its benefits.',
    reward: '$5 USDC',
    rewardColor: '#2775CA',
    duration: '15 min',
    level: 'Intermediate',
    category: 'DeFi',
    thumb: { from: '#7C3AED', via: '#6D28D9', to: '#4C1D95' },
    icon: (
      <svg viewBox="0 0 56 56" fill="none" width="56" height="56">
        <circle cx="20" cy="28" r="8" fill="rgba(255,255,255,0.25)" />
        <circle cx="36" cy="28" r="8" fill="rgba(255,255,255,0.35)" />
        <circle cx="28" cy="28" r="8" fill="rgba(255,255,255,0.5)" />
        <text x="28" y="33" textAnchor="middle" fontSize="11" fontWeight="800" fill="#7C3AED">DeFi</text>
      </svg>
    ),
  },
  {
    id: 5,
    title: 'NFTs and Digital Art',
    description: 'Explore the world of non-fungible tokens and digital collectibles.',
    reward: '$4 ETH',
    rewardColor: '#627EEA',
    duration: '10 min',
    level: 'Beginner',
    category: 'NFTs',
    thumb: { from: '#EC4899', via: '#DB2777', to: '#831843' },
    icon: (
      <svg viewBox="0 0 56 56" fill="none" width="56" height="56">
        <rect x="13" y="13" width="30" height="30" rx="4" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
        <circle cx="22" cy="22" r="4" fill="rgba(255,255,255,0.7)" />
        <path d="M13 36 l10-10 7 7 5-5 8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Blockchain Basics',
    description: 'Learn the fundamentals of blockchain technology.',
    reward: '$3 BTC',
    rewardColor: '#F7931A',
    duration: '8 min',
    level: 'Beginner',
    category: 'Basics',
    thumb: { from: '#0EA5E9', via: '#0284C7', to: '#075985' },
    icon: (
      <svg viewBox="0 0 56 56" fill="none" width="56" height="56">
        <rect x="10" y="22" width="12" height="12" rx="3" fill="rgba(255,255,255,0.8)" />
        <rect x="26" y="14" width="12" height="12" rx="3" fill="rgba(255,255,255,0.8)" />
        <rect x="34" y="30" width="12" height="12" rx="3" fill="rgba(255,255,255,0.8)" />
        <line x1="22" y1="28" x2="26" y2="20" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        <line x1="38" y1="26" x2="38" y2="30" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 7,
    title: 'Solana & Speed',
    description: 'Explore the fastest blockchain and its ecosystem of apps.',
    reward: '$4 SOL',
    rewardColor: '#9945FF',
    duration: '9 min',
    level: 'Intermediate',
    category: 'Altcoins',
    thumb: { from: '#9945FF', via: '#7B35D4', to: '#14F195' },
    icon: (
      <svg viewBox="0 0 56 56" fill="none" width="56" height="56">
        <path d="M14 34 H36 L42 28 H20 Z" fill="rgba(255,255,255,0.9)" />
        <path d="M14 24 H36 L42 18 H20 Z" fill="rgba(255,255,255,0.6)" />
        <path d="M14 44 H36 L42 38 H20 Z" fill="rgba(255,255,255,0.75)" />
      </svg>
    ),
  },
  {
    id: 8,
    title: 'Stablecoins 101',
    description: 'Understand how stablecoins work and why they matter in crypto.',
    reward: '$3 USDC',
    rewardColor: '#2775CA',
    duration: '7 min',
    level: 'Beginner',
    category: 'Basics',
    thumb: { from: '#10B981', via: '#059669', to: '#1652F0' },
    icon: (
      <svg viewBox="0 0 56 56" fill="none" width="56" height="56">
        <circle cx="28" cy="28" r="16" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
        <text x="28" y="33" textAnchor="middle" fontSize="16" fontWeight="900" fill="#fff">$</text>
      </svg>
    ),
  },
  {
    id: 9,
    title: 'Crypto Wallets',
    description: 'Learn how to store, send, and receive crypto safely with wallets.',
    reward: '$3 BTC',
    rewardColor: '#F7931A',
    duration: '11 min',
    level: 'Beginner',
    category: 'Security',
    thumb: { from: '#F59E0B', via: '#D97706', to: '#92400E' },
    icon: (
      <svg viewBox="0 0 56 56" fill="none" width="56" height="56">
        <rect x="10" y="18" width="36" height="24" rx="5" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
        <rect x="30" y="26" width="14" height="10" rx="3" fill="rgba(255,255,255,0.6)" />
        <circle cx="36" cy="31" r="2" fill="rgba(245,158,11,1)" />
      </svg>
    ),
  },
];

const CATEGORIES = ['All', 'Basics', 'DeFi', 'NFTs', 'Security', 'Altcoins'];

function Learn() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const howItWorksRef = useReveal();
  const filterRef     = useReveal();
  const ctaBannerRef  = useReveal();

  const learningTopics = TOPICS;

  const filtered = activeCategory === 'All'
    ? learningTopics
    : learningTopics.filter(t => t.category === activeCategory);

  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: '#111827' }}>

      
      <div style={{ borderBottom: '1px solid #E5E7EB', paddingTop: '56px', paddingBottom: '52px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }} className="hero-anim-up">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#EEF2FF', border: '1px solid #C7D2FE', borderRadius: '99px', padding: '6px 16px', marginBottom: '24px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#1652F0"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
            <span style={{ color: '#1652F0', fontSize: '0.8125rem', fontWeight: '700', letterSpacing: '0.03em' }}>Earn real crypto rewards</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', letterSpacing: '-0.035em', lineHeight: 1.1, marginBottom: '18px', color: '#111827' }}>
            Learn crypto.{' '}
            <span style={{ color: '#1652F0' }}>Earn real rewards.</span>
          </h1>
          <p style={{ color: '#6B7280', fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)', maxWidth: '540px', margin: '0 auto 40px', lineHeight: 1.65 }}>
            Complete short lessons and quizzes to earn crypto. Join over 1 million students building their knowledge and portfolio simultaneously.
          </p>

         
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
            {[
              { value: '100+', label: 'Learning Modules' },
              { value: 'Up to $100', label: 'In Crypto Rewards' },
              { value: '1M+', label: 'Students Enrolled' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ fontSize: 'clamp(1.25rem, 3vw, 1.625rem)', fontWeight: '800', letterSpacing: '-0.025em', color: '#111827' }}>{s.value}</div>
                <div style={{ fontSize: '0.8125rem', color: '#6B7280' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '44px 24px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.25rem', fontWeight: '800', marginBottom: '32px', letterSpacing: '-0.02em', color: '#111827' }}>How it works</h2>
          <div ref={howItWorksRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="learn-steps-grid reveal reveal-fade-up">
            {[
              { step: '01', title: 'Pick a lesson', desc: 'Browse topics ranging from Bitcoin basics to advanced DeFi concepts.' },
              { step: '02', title: 'Watch & learn', desc: 'Short videos and reading materials that take under 15 minutes each.' },
              { step: '03', title: 'Pass the quiz', desc: 'Answer a few questions correctly and earn real crypto to your wallet.' },
            ].map(item => (
              <div key={item.step} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ minWidth: '40px', height: '40px', borderRadius: '10px', background: '#1652F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.8125rem', color: '#fff', flexShrink: 0 }}>{item.step}</div>
                <div>
                  <p style={{ fontWeight: '700', color: '#111827', marginBottom: '4px', fontSize: '0.9375rem' }}>{item.title}</p>
                  <p style={{ color: '#6B7280', fontSize: '0.875rem', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: 'clamp(28px,5vw,48px) 24px clamp(36px,6vw,80px)' }}>

        
        <div ref={filterRef} style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }} className="reveal reveal-fade-up">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '7px 18px',
                borderRadius: '99px',
                border: activeCategory === cat ? '1.5px solid #1652F0' : '1.5px solid #E5E7EB',
                background: activeCategory === cat ? '#1652F0' : '#fff',
                color: activeCategory === cat ? '#fff' : '#374151',
                fontWeight: '600',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {cat}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', color: '#9CA3AF', fontSize: '0.875rem', alignSelf: 'center' }}>{filtered.length} course{filtered.length !== 1 ? 's' : ''}</span>
        </div>

       
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="learn-cards-grid">
          {filtered.map((topic, idx) => (
            <Reveal key={topic.id} variant="reveal-scale" delay={`reveal-delay-${(idx % 6) + 1}`} style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              onMouseEnter={() => setHoveredCard(topic.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: '#fff',
                border: `1.5px solid ${hoveredCard === topic.id ? '#D1D5DB' : '#E5E7EB'}`,
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
                transform: hoveredCard === topic.id ? 'translateY(-3px)' : 'none',
                boxShadow: hoveredCard === topic.id ? '0 8px 24px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
                cursor: 'default',
                flex: 1,
              }}
            >
              
              <div
                style={{
                  height: '120px',
                  background: `linear-gradient(135deg, ${topic.thumb.from} 0%, ${topic.thumb.via} 50%, ${topic.thumb.to} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 75% 30%, rgba(255,255,255,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
                {topic.icon}
                <div style={{
                  position: 'absolute', top: '10px', right: '10px',
                  background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
                  border: `1px solid ${topic.rewardColor}66`,
                  color: '#fff',
                  fontSize: '0.75rem', fontWeight: '700',
                  padding: '3px 10px', borderRadius: '99px',
                }}>
                  {topic.reward}
                </div>
              </div>

              
              <div style={{ padding: '18px' }}>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: '600', padding: '2px 8px', borderRadius: '99px', background: '#F3F4F6', color: '#374151', border: '1px solid #E5E7EB' }}>{topic.category}</span>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: '600', padding: '2px 8px', borderRadius: '99px',
                    background: topic.level === 'Beginner' ? '#F0FDF4' : '#F5F3FF',
                    color: topic.level === 'Beginner' ? '#16A34A' : '#7C3AED',
                    border: `1px solid ${topic.level === 'Beginner' ? '#BBF7D0' : '#DDD6FE'}`,
                  }}>{topic.level}</span>
                </div>
                <h3 style={{ color: '#111827', fontWeight: '700', fontSize: '1rem', margin: '0 0 6px', lineHeight: '1.35' }}>{topic.title}</h3>
                <p style={{ color: '#6B7280', fontSize: '0.8125rem', lineHeight: '1.6', margin: '0 0 16px' }}>{topic.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#9CA3AF', fontSize: '0.8125rem' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l3 3"/>
                    </svg>
                    {topic.duration}
                  </span>
                  <button
                    onMouseEnter={() => setHoveredBtn(topic.id)}
                    onMouseLeave={() => setHoveredBtn(null)}
                    style={{
                      background: hoveredBtn === topic.id ? '#0E40C7' : '#1652F0',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '7px 20px',
                      fontSize: '0.8125rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>

      
      <div style={{ borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 24px clamp(32px,6vw,72px)' }}>
          <div ref={ctaBannerRef} style={{
            background: 'linear-gradient(135deg, #1652F0 0%, #7C3AED 100%)',
            borderRadius: '20px',
            padding: 'clamp(36px, 5vw, 52px) clamp(24px, 5vw, 60px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }} className="reveal reveal-scale">
            <div>
              <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: '900', letterSpacing: '-0.025em', marginBottom: '10px', color: '#fff' }}>
                Ready to start learning?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9375rem', lineHeight: '1.6', maxWidth: '480px' }}>
                Sign up today and start earning crypto while you learn. Join millions of students worldwide building their knowledge and portfolio.
              </p>
            </div>
            <button
              style={{
                background: '#fff',
                color: '#1652F0',
                fontWeight: '800',
                fontSize: '0.9375rem',
                padding: '13px 28px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#EEF2FF'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
            >
              Get started for free
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Learn;

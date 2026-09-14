import React, { useState } from 'react';
import type { UserProfile, StudyDocument } from '../types';
import { DocumentCard } from '../components/DocumentCard';
import {
  UploadCloud,
  Coins,
  Key,
  Award,
  FileText,
  Sparkles,
  Crown,
  Flame,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  BookOpen,
  GraduationCap,
  DownloadCloud,
  FileCheck2,
  HelpCircle,
} from 'lucide-react';

interface UploadsDashboardViewProps {
  user: UserProfile;
  onSelectDocument: (doc: StudyDocument) => void;
  onOpenUpload: () => void;
  onOpenPremium: () => void;
}

export const UploadsDashboardView: React.FC<UploadsDashboardViewProps> = ({
  user,
  onSelectDocument,
  onOpenUpload,
  onOpenPremium,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'pasco' | 'notes' | 'processing'>('all');
  const [isDragOver, setIsDragOver] = useState(false);

  // High-demand courses at KNUST where students are actively requesting pasco
  const highDemandBounties = [
    { code: 'COE 251', title: 'Microprocessors & Embedded Systems', reward: '+50 Credits', college: 'CoE', urgency: 'High Demand' },
    { code: 'MATH 151', title: 'Calculus with Analysis I', reward: '+50 Credits', college: 'CoS', urgency: 'Trending' },
    { code: 'CSM 157', title: 'Intro to Computer Science', reward: '+50 Credits', college: 'CoS', urgency: 'Urgent' },
    { code: 'EE 261', title: 'Electric Circuits Theory', reward: '+50 Credits', college: 'CoE', urgency: 'High Demand' },
  ];

  const recentCommunityUploads = [
    { student: 'Akua Osei', hall: 'Africa Hall', doc: 'COE 251 2024 End of Sem Pasco & Solutions', time: '12m ago', credits: '+50' },
    { student: 'Kwesi Appiah', hall: 'University Hall (Katanga)', doc: 'MATH 151 Past Questions & Worked Proofs', time: '34m ago', credits: '+50' },
    { student: 'Emmanuel Mensah', hall: 'Unity Hall (Conti)', doc: 'CSM 157 Data Structures Lecture Slides', time: '1h ago', credits: '+50' },
    { student: 'Abena Frimpong', hall: 'Queen Elizabeth II Hall', doc: 'PHAR 210 Pharmacology Midsem Review', time: '2h ago', credits: '+50' },
  ];

  const filteredDocs = user.uploadedDocs.filter((doc) => {
    if (activeTab === 'pasco') return doc.docType === 'Past Questions & Answers (Pasco)';
    if (activeTab === 'notes') return doc.docType === 'Lecture Notes' || doc.docType === 'Summary';
    return true;
  });

  return (
    <div className="container" style={{ padding: '36px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* 1. HERO CREATOR CARD - Sleek Modern Dark Tech Gradient */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0B132B 0%, #162447 50%, #1F4068 100%)',
          borderRadius: '24px',
          padding: '36px',
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 12px 36px rgba(11, 19, 43, 0.16)',
          marginBottom: '32px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        {/* Subtle Background Glow Spheres */}
        <div
          style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(26, 115, 232, 0.35) 0%, transparent 70%)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '20%',
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          {/* User Details */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={user.avatar}
                alt={user.name}
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '20px',
                  objectFit: 'cover',
                  border: '3px solid #1A73E8',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  right: '-4px',
                  background: '#10B981',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: '3px solid #0B132B'
                }}
                title="Active KNUST Student Contributor"
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                <h1 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px', color: '#FFF', margin: 0 }}>
                  {user.name}
                </h1>
                
                <span style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(8px)', color: '#93C5FD', fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                  ID: {user.studentId}
                </span>

                {user.isPremium ? (
                  <span style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', color: '#FFF', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 8px rgba(245, 158, 11, 0.4)' }}>
                    <Crown size={13} /> TEK PREMIUM
                  </span>
                ) : (
                  <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34D399', border: '1px solid rgba(16, 185, 129, 0.3)', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={13} /> VERIFIED KNUST CONTRIBUTOR
                  </span>
                )}
              </div>

              <p style={{ fontSize: '14px', color: '#CBD5E1', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GraduationCap size={15} color="#60A5FA" />
                <span>{user.programme} • {user.college} ({user.level})</span>
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12.5px', color: '#94A3B8' }}>
                <span>🏛️ {user.hall}</span>
                <span>•</span>
                <span>✉️ {user.email}</span>
                <span>•</span>
                <span style={{ color: '#FCD34D', fontWeight: 600 }}>⭐ Rank #4 in CoE</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenUpload}
              style={{
                background: 'linear-gradient(135deg, #1A73E8 0%, #0056D2 100%)',
                color: '#FFF',
                border: 'none',
                borderRadius: '12px',
                padding: '14px 24px',
                fontSize: '14px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(26, 115, 232, 0.4)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <UploadCloud size={18} />
              <span>Upload Pasco (+50 Credits)</span>
            </button>

            {!user.isPremium && (
              <button
                onClick={onOpenPremium}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  color: '#FCD34D',
                  border: '1px solid rgba(252, 211, 77, 0.3)',
                  borderRadius: '12px',
                  padding: '14px 20px',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(252, 211, 77, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Sparkles size={16} />
                <span>Tek Premium</span>
              </button>
            )}
          </div>
        </div>

        {/* Level Progression Progress Bar */}
        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E2E8F0' }}>
            <Zap size={15} color="#38BDF8" />
            <span>Contributor Tier: <strong>Level 2 Scholar</strong> (150 / 300 XP to Master Contributor)</span>
          </div>
          <div style={{ width: '220px', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '100px', overflow: 'hidden' }}>
            <div style={{ width: '50%', height: '100%', background: 'linear-gradient(90deg, #38BDF8, #10B981)', borderRadius: '100px' }} />
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC STATS GRID - Polished Cards with Vibrant Badges & Micro-Gradients */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        {/* Card 1: Tek Credits */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A73E8' }}>
              <Coins size={22} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, background: '#EFF6FF', color: '#1A73E8', padding: '3px 8px', borderRadius: '6px' }}>
              WALLET
            </span>
          </div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Tek Credits
          </div>
          <div style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginTop: '4px', letterSpacing: '-1px' }}>
            {user.credits}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#10B981', fontWeight: 600, marginTop: '8px' }}>
            <CheckCircle2 size={14} />
            <span>Unlocks 3 full past exam papers</span>
          </div>
        </div>

        {/* Card 2: Free Unlocks */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
              <Key size={22} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, background: '#ECFDF5', color: '#059669', padding: '3px 8px', borderRadius: '6px' }}>
              BONUS
            </span>
          </div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Free Unlocks
          </div>
          <div style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginTop: '4px', letterSpacing: '-1px' }}>
            {user.freeUnlocksLeft}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B', marginTop: '8px' }}>
            <span>Earned from uploading verified KNUST pasco</span>
          </div>
        </div>

        {/* Card: Study Streak */}
        <div
          style={{
            background: user.studyStreak >= 7
              ? 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)'
              : '#FFFFFF',
            borderRadius: '18px',
            padding: '24px',
            border: user.studyStreak >= 7 ? '1px solid #FCD34D' : '1px solid #E2E8F0',
            boxShadow: user.studyStreak >= 7
              ? '0 4px 20px rgba(251, 191, 36, 0.25)'
              : '0 4px 16px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: user.studyStreak >= 7 ? '#FEF9C3' : '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
              <Flame size={22} />
            </div>
            {user.studyStreak >= 7 && (
              <span style={{ fontSize: '11px', fontWeight: 700, background: '#FCD34D', color: '#78350F', padding: '3px 8px', borderRadius: '6px' }}>
                🏅 STREAK SCHOLAR
              </span>
            )}
          </div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Study Streak
          </div>
          <div style={{ fontSize: '36px', fontWeight: 800, color: user.studyStreak >= 7 ? '#D97706' : '#0F172A', marginTop: '4px', letterSpacing: '-1px' }}>
            {user.studyStreak} day{user.studyStreak !== 1 ? 's' : ''}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#D97706', fontWeight: 600, marginTop: '8px' }}>
            <Flame size={14} />
            <span>{user.studyStreak >= 7 ? '🔥 On fire! Keep it up!' : `${7 - user.studyStreak} more days to Streak Scholar badge`}</span>
          </div>
        </div>

        {/* Card 3: Uploads & Shared Files */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C3AED' }}>
              <FileText size={22} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, background: '#F5F3FF', color: '#7C3AED', padding: '3px 8px', borderRadius: '6px' }}>
              COMMUNITY
            </span>
          </div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Your Uploads
          </div>
          <div style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginTop: '4px', letterSpacing: '-1px' }}>
            {user.uploadedDocs.length}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B', marginTop: '8px' }}>
            <span>+50 credits awarded per accepted upload</span>
          </div>
        </div>

        {/* Card 4: Reputation & Reach */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
              <Award size={22} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, background: '#FFFBEB', color: '#D97706', padding: '3px 8px', borderRadius: '6px' }}>
              TRUST SCORE
            </span>
          </div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Reputation
          </div>
          <div style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginTop: '4px', letterSpacing: '-1px' }}>
            100%
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#D97706', fontWeight: 600, marginTop: '8px' }}>
            <TrendingUp size={14} />
            <span>Top 5% student contributor in Conti</span>
          </div>
        </div>
      </div>

      {/* 3. HIGH-DEMAND BOUNTIES SECTION - "Earn +50 Credits Fast" */}
      <div
        style={{
          background: 'linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%)',
          border: '1px solid #BFDBFE',
          borderRadius: '20px',
          padding: '24px 28px',
          marginBottom: '36px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
              <Flame size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1E3A8A', margin: 0 }}>
                High-Demand Course Pasco Needed
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', margin: '2px 0 0 0' }}>
                Students are actively looking for past examination questions for these courses. Upload to claim bounty credits!
              </p>
            </div>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#1E40AF', background: '#DBEAFE', padding: '4px 10px', borderRadius: '100px' }}>
            🔥 Instant Review
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {highDemandBounties.map((bounty) => (
            <div
              key={bounty.code}
              onClick={onOpenUpload}
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '14px 16px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3B82F6';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#1A73E8' }}>
                    {bounty.code}
                  </span>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#B91C1C', background: '#FEE2E2', padding: '2px 6px', borderRadius: '4px' }}>
                    {bounty.urgency}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px', maxWidth: '170px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {bounty.title}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700, color: '#059669', background: '#D1FAE5', padding: '4px 8px', borderRadius: '6px' }}>
                <span>{bounty.reward}</span>
                <ArrowUpRight size={13} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. DRAG AND DROP UPLOAD ZONE WITH INTERACTIVE FEEDBACK */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          onOpenUpload();
        }}
        onClick={onOpenUpload}
        style={{
          background: isDragOver ? '#EFF6FF' : '#FFFFFF',
          border: isDragOver ? '2px dashed #1A73E8' : '2px dashed #CBD5E1',
          borderRadius: '24px',
          padding: '48px 24px',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          marginBottom: '40px',
          boxShadow: isDragOver ? '0 8px 30px rgba(26, 115, 232, 0.15)' : 'none',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1A73E8')}
        onMouseLeave={(e) => {
          if (!isDragOver) e.currentTarget.style.borderColor = '#CBD5E1';
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
            color: '#1A73E8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            boxShadow: '0 4px 16px rgba(26, 115, 232, 0.15)',
          }}
        >
          <UploadCloud size={36} />
        </div>

        <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
          Drag & Drop Past Questions or Lecture Notes
        </h3>
        <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '520px', margin: '0 auto 20px auto', lineHeight: '1.6' }}>
          Support your fellow KNUST students. Upload PDFs, Word documents, or presentation slides. Instant AI text extraction and past question indexing.
        </p>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1A73E8', color: '#FFF', padding: '12px 28px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, boxShadow: '0 4px 16px rgba(26, 115, 232, 0.3)' }}>
          <FileCheck2 size={18} />
          <span>Browse Files on Device</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', fontSize: '12px', color: '#94A3B8' }}>
          <span>✓ Accepted: PDF, DOCX, PPTX (up to 50MB)</span>
          <span>•</span>
          <span>✓ Earn +50 Tek Credits per paper</span>
          <span>•</span>
          <span>✓ 100% Academic Integrity Protected</span>
        </div>
      </div>

      {/* 5. USER UPLOADED DOCUMENTS & TABS */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              My Uploaded Documents ({user.uploadedDocs.length})
            </h2>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
              Manage questions, pasco, and lecture notes you have shared with KNUST students
            </p>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '6px', background: '#F1F5F9', padding: '4px', borderRadius: '10px' }}>
            <button
              onClick={() => setActiveTab('all')}
              style={{
                background: activeTab === 'all' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'all' ? '#1A73E8' : '#64748B',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 14px',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: activeTab === 'all' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              All ({user.uploadedDocs.length})
            </button>
            <button
              onClick={() => setActiveTab('pasco')}
              style={{
                background: activeTab === 'pasco' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'pasco' ? '#1A73E8' : '#64748B',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 14px',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: activeTab === 'pasco' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              Past Questions
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              style={{
                background: activeTab === 'notes' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'notes' ? '#1A73E8' : '#64748B',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 14px',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: activeTab === 'notes' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              Lecture Notes
            </button>
          </div>
        </div>

        {/* Documents Grid or Rich Empty State */}
        {filteredDocs.length > 0 ? (
          <div className="documents-grid">
            {filteredDocs.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onSelect={onSelectDocument}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              padding: '40px 24px',
              textAlign: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#EFF6FF', color: '#1A73E8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <BookOpen size={28} />
            </div>

            <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
              No uploaded files in this tab yet
            </h4>
            <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '440px', margin: '0 auto 20px auto', lineHeight: '1.6' }}>
              Got past midsem papers or lecture notes from this semester? Be the first student in your class to upload and earn instant credits.
            </p>

            {/* Quick-Start Templates */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={onOpenUpload}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#334155',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>📝 Upload Solved Pasco</span>
              </button>
              <button
                onClick={onOpenUpload}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#334155',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>📚 Upload Lecture Slides</span>
              </button>
              <button
                onClick={onOpenUpload}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#334155',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>💡 Upload Midsem Review</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 6. HOW TEK CREDITS WORK & COMMUNITY LIVE FEED */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Left: How Credits Work */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <HelpCircle size={18} color="#1A73E8" />
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              How Tek Credits & Rewards Work
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '14px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EFF6FF', color: '#1A73E8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>
                1
              </div>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 2px 0' }}>
                  Upload Past Papers or Notes (+50 Credits)
                </h5>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>
                  Share your end-of-sem pasco, midsem papers, or lecture summaries for any KNUST course.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>
                2
              </div>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 2px 0' }}>
                  Students Study Your Files (+5 Credits)
                </h5>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>
                  Every 10 reads or upvotes your study material receives earns you passive Tek Credits.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F5F3FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>
                3
              </div>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 2px 0' }}>
                  Unlock Any Past Question or AI Study Pack
                </h5>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>
                  Redeem 50 credits to unlock full exam model answers, AI quiz packs, and step-by-step proofs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Community Contributor Activity */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <DownloadCloud size={18} color="#059669" />
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Live KNUST Contributor Activity
              </h3>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#10B981', background: '#D1FAE5', padding: '2px 8px', borderRadius: '100px' }}>
              ● LIVE
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentCommunityUploads.map((activity, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  background: '#F8FAFC',
                  border: '1px solid #F1F5F9',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                      {activity.student}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>
                      ({activity.hall})
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
                    {activity.doc}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#059669', background: '#ECFDF5', padding: '2px 6px', borderRadius: '4px' }}>
                    {activity.credits}
                  </span>
                  <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

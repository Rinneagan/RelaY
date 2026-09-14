import React, { useState, useRef } from 'react';
import type { StudyDocument, UserProfile } from '../types';
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  Lock,
  Sparkles,
  Coins,
  UploadCloud,
  FileText,
  Check,
  Flag,
  Printer,
  X as CloseX
} from 'lucide-react';
import { AiSummaryTab } from '../components/StudyTools/AiSummaryTab';
import { AiQuizTab } from '../components/StudyTools/AiQuizTab';
import { AskAiChatTab } from '../components/StudyTools/AskAiChatTab';
import { CommentsTab } from '../components/StudyTools/CommentsTab';

interface DocumentViewProps {
  document: StudyDocument;
  user: UserProfile;
  onBack: () => void;
  onOpenUpload: () => void;
  onOpenPremium: () => void;
  onUnlockWithCredits: (docId: string) => void;
  onToggleSaveStudylist: (doc: StudyDocument) => void;
  isSaved: boolean;
}

export const DocumentView: React.FC<DocumentViewProps> = ({
  document,
  user,
  onBack,
  onOpenUpload,
  onOpenPremium,
  onUnlockWithCredits,
  onToggleSaveStudylist,
  isSaved,
}) => {
  const [activePageNumber, setActivePageNumber] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeStudyTab, setActiveStudyTab] = useState<'summary' | 'quiz' | 'chat' | 'comments'>('summary');
  const [likesCount, setLikesCount] = useState(document.author.reputation);
  const [userVoted, setUserVoted] = useState<'up' | 'down' | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [unlockedLocally, setUnlockedLocally] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState('Incorrect answers');
  const [reportNote, setReportNote] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const pageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const scrollToPage = (pageNum: number) => {
    setActivePageNumber(pageNum);
    const el = pageRefs.current[pageNum];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleVote = (type: 'up' | 'down') => {
    if (userVoted === type) {
      setUserVoted(null);
      setLikesCount((prev) => (type === 'up' ? prev - 1 : prev + 1));
    } else {
      if (userVoted === 'up') setLikesCount((prev) => prev - 1);
      if (userVoted === 'down') setLikesCount((prev) => prev + 1);
      setUserVoted(type);
      setLikesCount((prev) => (type === 'up' ? prev + 1 : prev - 1));
    }
  };

  const handleShare = () => {
    // Use actual deployed URL, not localhost
    const url = window.location.href.replace('localhost:5173', window.location.host);
    navigator.clipboard.writeText(url).catch(() => {
      // Fallback for browsers that block clipboard in non-https
      const el = window.document.createElement('textarea');
      el.value = url;
      window.document.body.appendChild(el);
      el.select();
      window.document.execCommand('copy');
      window.document.body.removeChild(el);
    });
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReportSubmit = () => {
    setReportSubmitted(true);
    setTimeout(() => {
      setIsReportOpen(false);
      setReportSubmitted(false);
      setReportNote('');
    }, 2000);
  };

  const isUnlocked = user.isPremium || unlockedLocally || document.unlockedByDefault;

  const handleDownload = () => {
    if (!isUnlocked && !user.isPremium) {
      onOpenPremium();
      return;
    }
    handlePrint();
  };

  return (
    <div className="doc-view-container">
      {/* Top Header */}
      <div className="doc-view-header">
        <div className="doc-header-left">
          <button className="btn-back-link" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>

          <div className="doc-view-title-wrap">
            <h1>{document.title}</h1>
            <div className="doc-view-breadcrumbs">
              <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{document.courseCode}</span>
              <span>•</span>
              <span>{document.courseName}</span>
              <span>•</span>
              <span>{document.programmeName}</span>
              <span>•</span>
              <span>{document.level} ({document.semester})</span>
              <span>•</span>
              <span style={{ color: '#D97706' }}>By {document.author.name} ({document.author.hall})</span>
            </div>
          </div>
        </div>

        <div className="doc-header-actions">
          {/* Thumbs up / down */}
          <button
            className={`btn-doc-action ${userVoted === 'up' ? 'active-vote' : ''}`}
            onClick={() => handleVote('up')}
          >
            <ThumbsUp size={15} color={userVoted === 'up' ? '#0056D2' : 'currentColor'} />
            <span>{likesCount}</span>
          </button>

          <button
            className={`btn-doc-action ${userVoted === 'down' ? 'active-vote' : ''}`}
            onClick={() => handleVote('down')}
          >
            <ThumbsDown size={15} color={userVoted === 'down' ? '#E53935' : 'currentColor'} />
          </button>

          {/* Studylist save */}
          <button
            className={`btn-doc-action ${isSaved ? 'active-vote' : ''}`}
            onClick={() => onToggleSaveStudylist(document)}
          >
            <Bookmark size={15} fill={isSaved ? '#0056D2' : 'none'} color={isSaved ? '#0056D2' : 'currentColor'} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          {/* Share */}
          <button className="btn-doc-action" onClick={handleShare}>
            {shareCopied ? <Check size={15} color="#10B981" /> : <Share2 size={15} />}
            <span>{shareCopied ? 'Copied!' : 'Share'}</span>
          </button>

          {/* Print / PDF */}
          <button className="btn-doc-action" onClick={handlePrint} title="Print or Save as PDF">
            <Printer size={15} />
            <span>Print</span>
          </button>

          {/* Report */}
          <button
            className="btn-doc-action"
            onClick={() => setIsReportOpen(true)}
            title="Report incorrect or misleading content"
            style={{ color: 'var(--accent-rose)' }}
          >
            <Flag size={15} />
            <span>Report</span>
          </button>

          {/* Download */}
          <button className="btn-doc-download" onClick={handleDownload}>
            <Download size={15} />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Report Modal */}
      {isReportOpen && (
        <div className="modal-overlay" onClick={() => setIsReportOpen(false)}>
          <div
            className="modal-card"
            style={{ maxWidth: '440px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Flag size={18} color="var(--accent-rose)" />
                  <span>Report Document</span>
                </h3>
                <p className="modal-subtitle">Help us maintain quality on RelaY</p>
              </div>
              <button className="modal-close-btn" onClick={() => setIsReportOpen(false)}>
                <CloseX size={20} />
              </button>
            </div>

            <div className="modal-body">
              {reportSubmitted ? (
                <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--accent-emerald-light)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                    <Check size={28} />
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>Report Submitted</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    Thank you! Our team will review this document within 24 hours.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                      Reason for report
                    </label>
                    <select
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-light)', fontSize: '13px', background: 'var(--bg-input)', color: 'var(--text-primary)' }}
                    >
                      <option>Incorrect answers or solutions</option>
                      <option>Not related to this course</option>
                      <option>Plagiarised or duplicate content</option>
                      <option>Poor quality / unreadable</option>
                      <option>Inappropriate content</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                      Additional details <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span>
                    </label>
                    <textarea
                      value={reportNote}
                      onChange={(e) => setReportNote(e.target.value)}
                      placeholder="Describe the issue in more detail..."
                      rows={3}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-light)', fontSize: '13px', resize: 'vertical', background: 'var(--bg-input)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}
                    />
                  </div>

                  <button
                    onClick={handleReportSubmit}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--accent-rose)', color: '#fff', border: 'none', borderRadius: 'var(--radius-full)', padding: '12px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    <Flag size={15} />
                    Submit Report
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


      {/* Main Workspace (3 columns) */}
      <div className="doc-viewer-workspace">
        {/* Column 1: Left Thumbnail Rail */}
        <aside className="doc-thumbnail-rail">
          <div className="thumbnail-rail-header">
            <span>Pages ({document.pageCount})</span>
            <FileText size={15} color="#0056D2" />
          </div>

          <div style={{ padding: '8px 0' }}>
            {document.pages.map((page) => {
              const isLockedPage = page.isLocked && !isUnlocked;
              return (
                <div
                  key={page.pageNumber}
                  className={`thumb-item ${activePageNumber === page.pageNumber ? 'active' : ''}`}
                  onClick={() => scrollToPage(page.pageNumber)}
                >
                  <div className="thumb-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="thumb-page-num">Page {page.pageNumber}</span>
                      {isLockedPage && (
                        <div className="thumb-lock-indicator">
                          <Lock size={11} />
                          <span>Locked</span>
                        </div>
                      )}
                    </div>
                    <div className="thumb-page-title">{page.title}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Column 2: Center Document Reader Canvas */}
        <main className="doc-reader-canvas">
          {/* Floating Canvas Controls */}
          <div className="doc-canvas-floating-controls">
            <button
              className="canvas-control-btn"
              onClick={() => setZoomLevel((prev) => Math.max(70, prev - 10))}
              title="Zoom out"
            >
              <ZoomOut size={16} />
            </button>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>{zoomLevel}%</span>
            <button
              className="canvas-control-btn"
              onClick={() => setZoomLevel((prev) => Math.min(130, prev + 10))}
              title="Zoom in"
            >
              <ZoomIn size={16} />
            </button>
            <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.2)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600 }}>
              Page {activePageNumber} / {document.pageCount}
            </span>
          </div>

          {/* Pages Rendering */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
              transition: 'transform 0.15s ease'
            }}
          >
            {document.pages.map((page) => {
              const isLockedPage = page.isLocked && !isUnlocked;
              return (
                <div
                  key={page.pageNumber}
                  ref={(el) => {
                    pageRefs.current[page.pageNumber] = el;
                  }}
                  className={`doc-page-paper ${isLockedPage ? 'is-locked-page' : ''}`}
                >
                  <div dangerouslySetInnerHTML={{ __html: page.contentHtml }} />

                  <div className="doc-page-footer-mark">
                    <span>
                      KNUST • {document.courseCode} • {document.programmeName}
                    </span>
                    <span>
                      Page {page.pageNumber} of {document.pageCount}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* StuDocu KNUST Paywall & Preview Gate */}
            {!isUnlocked && (
              <div className="paywall-gate-card">
                <div className="paywall-badge">
                  <Lock size={13} />
                  <span>PREVIEW ENDED • PAGES 4-5 LOCKED</span>
                </div>

                <h3 className="paywall-title">Unlock all pages of this KNUST study guide</h3>
                <p className="paywall-sub">
                  Join thousands of KNUST students sharing past questions and exam notes. Unlock this document for free by uploading your own questions or using Tek Credits.
                </p>

                <div className="paywall-options-grid">
                  {/* Option 1: Free Upload */}
                  <div className="paywall-option-box">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ background: '#E6F7F0', padding: '6px', borderRadius: '6px', color: '#00A86B' }}>
                        <UploadCloud size={18} />
                      </div>
                      <div className="paywall-option-title">Upload 1 Pasco or Note</div>
                    </div>
                    <div className="paywall-option-desc">
                      Share any past question, assignment, or lecture slide to get 30 days of unlimited free unlocks.
                    </div>
                    <button
                      onClick={onOpenUpload}
                      style={{
                        background: 'var(--accent-emerald)',
                        color: '#FFF',
                        border: 'none',
                        padding: '10px 16px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Upload & Unlock Free
                    </button>
                  </div>

                  {/* Option 2: Use Tek Credits */}
                  <div className="paywall-option-box">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ background: '#EFF6FF', padding: '6px', borderRadius: '6px', color: '#0056D2' }}>
                        <Coins size={18} />
                      </div>
                      <div className="paywall-option-title">Use 50 Tek Credits</div>
                    </div>
                    <div className="paywall-option-desc">
                      You have <strong>{user.credits} Tek Credits</strong> available in your student balance.
                    </div>
                    <button
                      onClick={() => {
                        onUnlockWithCredits(document.id);
                        setUnlockedLocally(true);
                      }}
                      style={{
                        background: 'var(--primary)',
                        color: '#FFF',
                        border: 'none',
                        padding: '10px 16px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Instant Unlock (50 Credits)
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: '20px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  Or{' '}
                  <button
                    onClick={onOpenPremium}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    upgrade to Tek Premium
                  </button>{' '}
                  for unlimited semester downloads and AI tutor access.
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Column 3: Right Study Suite Sidebar */}
        <aside className="doc-study-suite-sidebar">
          {/* Navigation Tabs */}
          <div className="study-suite-nav-tabs">
            <button
              className={`suite-tab-btn ${activeStudyTab === 'summary' ? 'active' : ''}`}
              onClick={() => setActiveStudyTab('summary')}
            >
              <Sparkles size={14} color="#0056D2" />
              <span>AI Summary</span>
            </button>

            <button
              className={`suite-tab-btn ${activeStudyTab === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveStudyTab('quiz')}
            >
              <span>Practice Quiz</span>
            </button>

            <button
              className={`suite-tab-btn ${activeStudyTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveStudyTab('chat')}
            >
              <span>Ask AI</span>
            </button>

            <button
              className={`suite-tab-btn ${activeStudyTab === 'comments' ? 'active' : ''}`}
              onClick={() => setActiveStudyTab('comments')}
            >
              <span>Reviews</span>
            </button>
          </div>

          {/* Active Tab Panel */}
          <div className="study-suite-content-area">
            {activeStudyTab === 'summary' && <AiSummaryTab document={document} />}
            {activeStudyTab === 'quiz' && <AiQuizTab document={document} />}
            {activeStudyTab === 'chat' && <AskAiChatTab document={document} />}
            {activeStudyTab === 'comments' && <CommentsTab document={document} />}
          </div>
        </aside>
      </div>
    </div>
  );
};

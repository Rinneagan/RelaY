import React from 'react';
import { Search, UploadCloud, BookOpen, Sparkles, Coins, Bookmark, FileText, Home, Trophy, Moon, Sun } from 'lucide-react';
import type { UserProfile } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenSearch: () => void;
  onOpenUpload: () => void;
  onOpenPremium: () => void;
  user: UserProfile;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  followedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenUpload,
  onOpenPremium,
  user,
  isDarkMode,
  onToggleDarkMode,
  followedCount,
}) => {
  return (
    <>
      <header className="navbar">
        <div className="container" style={{ width: '100%' }}>
          <div className="navbar-inner">
            {/* Brand - Clean relay document logo */}
            <div className="nav-brand" onClick={() => onNavigate('home')} title="relay - Home">
              <img
                src="/favicon.svg"
                alt="relay Logo"
                style={{
                  height: '28px',
                  width: 'auto',
                  display: 'block'
                }}
              />
              <div className="brand-name">
                rela<span>y</span>
              </div>
            </div>

            {/* Omni-Search Trigger (Compact, Responsive) */}
            <button
              type="button"
              className="search-trigger-btn"
              onClick={onOpenSearch}
              aria-label="Search courses, programmes and pasco"
              title="Search"
            >
              <Search size={15} color="#718096" />
              <span className="search-placeholder-text">
                Search COE 251, pasco...
              </span>
            </button>

            {/* Compact Navigation Actions */}
            <div className="nav-actions">
              {/* Programmes link */}
              <button
                className={`nav-icon-btn ${currentView === 'home' || currentView === 'programmes' ? 'active' : ''}`}
                onClick={() => onNavigate('home')}
                title="Degree Programmes & Courses"
              >
                <BookOpen size={18} />
                <span className="nav-btn-text">Programmes</span>
              </button>

              {/* Leaderboard link */}
              <button
                className={`nav-icon-btn ${currentView === 'leaderboard' ? 'active' : ''}`}
                onClick={() => onNavigate('leaderboard')}
                title="Leaderboard — Top Contributors"
              >
                <Trophy size={18} />
                <span className="nav-btn-text">Ranks</span>
              </button>

              {/* Studylists link — with notification dot if following courses */}
              <button
                className={`nav-icon-btn ${currentView === 'studylists' ? 'active' : ''}`}
                onClick={() => onNavigate('studylists')}
                title="My Saved Studylists"
                style={{ position: 'relative' }}
              >
                <Bookmark size={18} />
                {followedCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '2px',
                    right: '4px',
                    width: '7px',
                    height: '7px',
                    background: 'var(--accent-emerald)',
                    borderRadius: '50%',
                    border: '1.5px solid var(--bg-surface)',
                  }} />
                )}
                <span className="nav-btn-text">Saved</span>
              </button>

              {/* My Uploads link */}
              <button
                className={`nav-icon-btn ${currentView === 'uploads' ? 'active' : ''}`}
                onClick={() => onNavigate('uploads')}
                title="My Uploads & Contributions"
              >
                <FileText size={18} />
                <span className="nav-btn-text">Uploads</span>
              </button>

              {/* Premium CTA */}
              <button
                className="btn-premium-compact"
                onClick={onOpenPremium}
                title={user.isPremium ? 'Premium Active' : 'Get Tek Premium'}
              >
                <Sparkles size={15} color="#D97706" />
                <span className="nav-btn-text">{user.isPremium ? 'Active' : 'Premium'}</span>
              </button>

              {/* Dark mode toggle */}
              <button
                className="nav-icon-btn"
                onClick={onToggleDarkMode}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>


              {/* Upload CTA */}
              <button
                className="btn-upload-compact"
                onClick={onOpenUpload}
                title="Upload Questions & Notes"
              >
                <UploadCloud size={15} />
                <span className="upload-btn-text">Upload</span>
              </button>

              {/* User Profile & Credits Pill */}
              <div
                className="user-profile-pill compact"
                onClick={() => onNavigate('uploads')}
                title={`${user.name} • ${user.programme} (${user.hall}) • ${user.credits} Credits`}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="user-avatar-mini"
                />
                <div className="user-credits-tag">
                  <Coins size={12} color="#0056D2" />
                  <span>{user.credits}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        <button
          className={`mobile-nav-item ${currentView === 'home' ? 'active' : ''}`}
          onClick={() => onNavigate('home')}
          aria-label="Home"
        >
          <Home size={20} />
          <span>Home</span>
        </button>

        <button
          className={`mobile-nav-item ${currentView === 'studylists' ? 'active' : ''}`}
          onClick={() => onNavigate('studylists')}
          aria-label="Studylists"
        >
          <Bookmark size={20} />
          <span>Saved</span>
        </button>

        {/* Center Upload FAB */}
        <button
          className="mobile-nav-upload-btn"
          onClick={onOpenUpload}
          aria-label="Upload document"
        >
          <div className="mobile-nav-upload-icon">
            <UploadCloud size={20} />
          </div>
          <span className="mobile-nav-upload-label">Upload</span>
        </button>

        <button
          className={`mobile-nav-item ${currentView === 'uploads' ? 'active' : ''}`}
          onClick={() => onNavigate('uploads')}
          aria-label="My Uploads"
        >
          <FileText size={20} />
          <span>My Docs</span>
        </button>

        <button
          className="mobile-nav-item"
          onClick={onOpenPremium}
          aria-label="Premium"
        >
          <Sparkles size={20} color={user.isPremium ? '#D97706' : undefined} />
          <span style={{ color: user.isPremium ? '#D97706' : undefined }}>
            {user.isPremium ? 'Premium' : 'Upgrade'}
          </span>
        </button>
      </nav>
    </>
  );
};

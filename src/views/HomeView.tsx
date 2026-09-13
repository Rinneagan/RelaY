import React, { useState } from 'react';
import type { KnustCollege, KnustProgramme, Course, StudyDocument } from '../types';
import { DocumentCard } from '../components/DocumentCard';
import {
  Search,
  Sparkles,
  BookOpen,
  ArrowRight,
  Shield,
  UploadCloud,
  PlusCircle,
  GraduationCap
} from 'lucide-react';

interface HomeViewProps {
  colleges: KnustCollege[];
  programmes: KnustProgramme[];
  courses: Course[];
  documents: StudyDocument[];
  onSelectDocument: (doc: StudyDocument) => void;
  onSelectProgramme: (programme: KnustProgramme) => void;
  onSelectCourse: (course: Course) => void;
  onOpenUpload: () => void;
  onOpenAddCourse: (programmeId?: string) => void;
  onOpenSearch: () => void;
  onSaveToStudylist: (doc: StudyDocument, e: React.MouseEvent) => void;
  savedDocIds: string[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  colleges,
  programmes,
  courses,
  documents,
  onSelectDocument,
  onSelectProgramme,
  onSelectCourse,
  onOpenUpload,
  onOpenAddCourse,
  onOpenSearch,
  onSaveToStudylist,
  savedDocIds,
}) => {
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [heroSearchText, setHeroSearchText] = useState('');

  const categories = [
    'All',
    'Past Questions & Answers (Pasco)',
    'Lecture Notes',
    'Exam Preparation',
    'Summary'
  ];

  // Filter programmes by selected college
  const filteredProgrammes = programmes.filter((prog) =>
    selectedCollegeId === 'all' || prog.collegeId === selectedCollegeId
  );

  // Filter documents
  const filteredDocs = documents.filter((doc) => {
    const matchCat = selectedCategory === 'All' || doc.docType === selectedCategory;
    const matchCollege =
      selectedCollegeId === 'all' ||
      courses.find((c) => c.code === doc.courseCode)?.collegeId === selectedCollegeId;

    const matchSearch =
      !heroSearchText ||
      doc.title.toLowerCase().includes(heroSearchText.toLowerCase()) ||
      doc.courseCode.toLowerCase().includes(heroSearchText.toLowerCase()) ||
      doc.programmeName.toLowerCase().includes(heroSearchText.toLowerCase());

    return matchCat && matchCollege && matchSearch;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">

          <h1 className="hero-title">
            Pass your courses with <span>RelaY KNUST</span>
          </h1>

          <p className="hero-subtitle">
            Find verified past questions &amp; answers (pasco), lecture slides, and exam notes across all 6 KNUST Colleges. Add courses to your degree programme and study with AI.
          </p>

          {/* Live Stats Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            marginBottom: '28px',
            flexWrap: 'wrap',
          }}>
            {[
              { value: '62,400+', label: 'Study Files', color: '#0056D2' },
              { value: '18,200+', label: 'Active Students', color: '#059669' },
              { value: '1.2M+', label: 'Tek Credits Earned', color: '#D97706' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: stat.color,
                  letterSpacing: '-0.5px',
                  lineHeight: 1.1,
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  marginTop: '2px',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="hero-search-container">
            <form
              className="hero-search-box"
              onSubmit={(e) => {
                e.preventDefault();
                onOpenSearch();
              }}
            >
              <Search size={17} color="#0056D2" style={{ marginLeft: '4px' }} />
              <input
                type="text"
                className="hero-search-input"
                placeholder="Search course code (e.g. COE 251, MATH 151), programme, or pasco..."
                value={heroSearchText}
                onChange={(e) => setHeroSearchText(e.target.value)}
              />
              <button type="submit" className="hero-search-btn">
                <span>Find Pasco</span>
                <ArrowRight size={15} />
              </button>
            </form>

            {/* College Selector Pills */}
            <div className="university-pills-row">
              <span className="uni-pill-label">KNUST Colleges:</span>
              <button
                type="button"
                className={`uni-pill-btn ${selectedCollegeId === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCollegeId('all')}
              >
                All 6 Colleges
              </button>
              {colleges.map((col) => (
                <button
                  type="button"
                  key={col.id}
                  className={`uni-pill-btn ${selectedCollegeId === col.id ? 'active' : ''}`}
                  onClick={() => setSelectedCollegeId(selectedCollegeId === col.id ? 'all' : col.id)}
                >
                  <span>{col.badge}</span>
                  <span>{col.shortName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🔴 Live Activity Ticker */}
      <div
        style={{
          background: 'linear-gradient(90deg, #0B132B 0%, #1A2744 50%, #0B132B 100%)',
          overflow: 'hidden',
          padding: '10px 0',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0',
            animation: 'ticker-scroll 40s linear infinite',
            whiteSpace: 'nowrap',
            width: 'max-content',
          }}
        >
          {/* Duplicate content for seamless loop */}
          {[...Array(2)].map((_, setIdx) => (
            <span key={setIdx} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              {[
                { student: 'Akua O.', doc: 'COE 251 Microprocessors 2024 End of Sem Pasco', credits: '+50', time: '3m ago' },
                { student: 'Kwesi A.', doc: 'MATH 151 Calculus Full Worked Solutions', credits: '+50', time: '9m ago' },
                { student: 'Emmanuel M.', doc: 'CSM 157 Data Structures Complete Notes', credits: '+50', time: '14m ago' },
                { student: 'Abena F.', doc: 'PHAR 210 Pharmacology Midsem Review 2024', credits: '+50', time: '28m ago' },
                { student: 'Kofi D.', doc: 'EE 261 Electric Circuits Past Questions', credits: '+50', time: '1h ago' },
                { student: 'Ama S.', doc: 'CE 265 Fluid Mechanics Lecture Slides', credits: '+50', time: '1h ago' },
              ].map((item, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#CBD5E1',
                    fontSize: '12px',
                    padding: '0 20px',
                    borderRight: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      background: '#10B981',
                      borderRadius: '50%',
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ color: '#60A5FA', fontWeight: 600 }}>{item.student}</span>
                  <span>uploaded</span>
                  <span style={{ color: '#E2E8F0', fontWeight: 600, maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.doc}
                  </span>
                  <span style={{ color: '#34D399', fontWeight: 700, background: 'rgba(16, 185, 129, 0.15)', padding: '1px 7px', borderRadius: '100px', fontSize: '11px' }}>
                    {item.credits} Credits
                  </span>
                  <span style={{ color: '#64748B', fontSize: '11px' }}>{item.time}</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Main Browse Container */}
      <div className="container" style={{ marginTop: '40px' }}>
        {/* Degree Programmes Section */}
        <div style={{ marginBottom: '48px' }}>
          <div className="section-header-row" style={{ flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 className="section-title">KNUST Degree Programmes</h2>
              <p className="section-subtitle">
                Select your programme to view existing courses or add new courses to upload files
              </p>
            </div>

            <button
              onClick={() => onOpenAddCourse()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--primary)',
                color: '#FFF',
                border: 'none',
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <PlusCircle size={16} />
              <span>Add Course to Any Programme</span>
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '18px'
            }}
          >
            {filteredProgrammes.map((prog) => {
              const progCourses = courses.filter((c) => c.programmeId === prog.id);
              return (
                <div
                  key={prog.id}
                  onClick={() => onSelectProgramme(prog)}
                  style={{
                    background: '#FFF',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: 'var(--shadow-card)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = '#0056D2';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span
                      style={{
                        background: 'var(--primary-light)',
                        color: 'var(--primary)',
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      {prog.degree}
                    </span>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                      {prog.durationYears} Years
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '15.5px',
                      fontWeight: 800,
                      color: 'var(--primary-dark)',
                      marginBottom: '8px',
                      lineHeight: '1.3'
                    }}
                  >
                    {prog.name}
                  </h3>

                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px', flex: 1 }}>
                    {progCourses.length} registered courses • {prog.documentsCount} pasco & files
                  </div>

                  <div
                    style={{
                      paddingTop: '12px',
                      borderTop: '1px solid var(--border-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '12px'
                    }}
                  >
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
                      View Courses →
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenAddCourse(prog.id);
                      }}
                      style={{
                        background: '#F1F5F9',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '4px 8px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      + Add Course
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popular KNUST Courses Row */}
        <div style={{ marginBottom: '40px' }}>
          <div className="section-header-row">
            <div>
              <h2 className="section-title">High-Traffic KNUST Courses</h2>
              <p className="section-subtitle">
                Popular courses students are searching for past questions and revision notes right now
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '16px'
            }}
          >
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course)}
                style={{
                  background: '#FFF',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0056D2';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span
                    style={{
                      background: 'var(--primary-light)',
                      color: 'var(--primary)',
                      fontWeight: 800,
                      fontSize: '12px',
                      padding: '3px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    {course.code}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {course.level} • {course.semester}
                  </span>
                </div>
                <h4
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '4px',
                    lineHeight: '1.3'
                  }}
                >
                  {course.name}
                </h4>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {course.programmeName}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* StuDocu KNUST Upload Banner */}
        <div className="studocu-promo-banner" style={{ background: 'linear-gradient(135deg, #002D62 0%, #0056D2 60%, #D97706 100%)' }}>
          <div>
            <div className="promo-badge">
              <Sparkles size={14} />
              <span>UPLOAD QUESTIONS & ANSWERS (PASCO)</span>
            </div>
            <h2 className="promo-title">Help fellow KNUST students ace their exams</h2>
            <p className="promo-desc">
              Have past examination papers, midsem questions with solutions, or lecture slides? Upload them under your course to earn Tek Credits and free document unlocks!
            </p>
          </div>

          <div className="promo-cta-box">
            <button className="btn-promo-action" onClick={onOpenUpload}>
              Upload Pasco / Notes (+50 Credits)
            </button>
            <span style={{ fontSize: '12px', opacity: 0.85 }}>Over 40,000+ files shared at KNUST</span>
          </div>
        </div>

        {/* Trending Past Questions & Notes */}
        <div>
          <div className="section-header-row" style={{ flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 className="section-title">Trending Past Questions & Lecture Notes</h2>
              <p className="section-subtitle">Verified questions with step-by-step model solutions</p>
            </div>

            {/* Category Filter Pills */}
            <div className="category-tags-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filteredDocs.length > 0 ? (
            <div className="documents-grid">
              {filteredDocs.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  onSelect={onSelectDocument}
                  onSaveToStudylist={onSaveToStudylist}
                  isSaved={savedDocIds.includes(doc.id)}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', background: '#FFF', borderRadius: 'var(--radius-lg)' }}>
              <BookOpen size={40} color="#94A3B8" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                No materials found under this filter
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: '16px' }}>
                Be the first Tek student to upload questions or notes for this section!
              </p>
              <button className="btn-upload" onClick={onOpenUpload} style={{ margin: '0 auto' }}>
                <UploadCloud size={16} />
                <span>Upload Document</span>
              </button>
            </div>
          )}
        </div>

        {/* KNUST Student Community Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            margin: '60px 0 80px 0'
          }}
        >
          <div
            style={{
              background: '#FFF',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px 24px'
            }}
          >
            <div style={{ width: '44px', height: '44px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <GraduationCap size={24} />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '8px' }}>
              Tailored for all KNUST Programmes
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              From Computer Engineering to Pharmacy, Medicine, and Law—organized specifically according to KNUST Levels (100–600) and Semesters.
            </p>
          </div>

          <div
            style={{
              background: '#FFF',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px 24px'
            }}
          >
            <div style={{ width: '44px', height: '44px', background: '#FEF3C7', color: '#D97706', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Sparkles size={24} />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '8px' }}>
              AI Pasco Solutions & Quizzes
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Instantly generate quizzes, step-by-step math breakdowns, and summaries from uploaded KNUST past examination papers.
            </p>
          </div>

          <div
            style={{
              background: '#FFF',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px 24px'
            }}
          >
            <div style={{ width: '44px', height: '44px', background: '#ECFDF5', color: '#059669', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Shield size={24} />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '8px' }}>
              Add Courses & Upload Freely
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Missing a course? Any student can add their new semester course code and immediately drop lecture slides or questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

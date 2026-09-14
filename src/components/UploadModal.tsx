import React, { useState, useMemo } from 'react';
import {
  X,
  UploadCloud,
  CheckCircle,
  Sparkles,
  FileText,
  PlusCircle,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
} from 'lucide-react';
import type { KnustProgramme, Course, StudyDocument, KnustDocType } from '../types';
import { validateAcademicMaterial } from '../utils/academicValidator';
import confetti from 'canvas-confetti';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  programmes: KnustProgramme[];
  courses: Course[];
  initialCourseId?: string;
  onOpenAddCourse?: (programmeId?: string) => void;
  onUploadSuccess: (newDoc: StudyDocument) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  programmes,
  courses,
  initialCourseId,
  onOpenAddCourse,
  onUploadSuccess,
}) => {
  const defaultCourse = courses.find((c) => c.id === initialCourseId) || courses[0];
  const [selectedProgrammeId, setSelectedProgrammeId] = useState(
    defaultCourse?.programmeId || programmes[0]?.id || ''
  );
  const [selectedCourseId, setSelectedCourseId] = useState(defaultCourse?.id || '');

  const [title, setTitle] = useState('');
  const [docType, setDocType] = useState<KnustDocType>('Past Questions & Answers (Pasco)');
  const [level, setLevel] = useState<StudyDocument['level']>(defaultCourse?.level || 'Level 200');
  const [semester, setSemester] = useState<StudyDocument['semester']>(defaultCourse?.semester || 'Semester 1');
  const [academicYear, setAcademicYear] = useState('2025/2026');
  const [fileSelected, setFileSelected] = useState<string | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [verificationStep, setVerificationStep] = useState<string>('Initiating upload...');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Active course and programme objects
  const availableCourses = courses.filter((c) => c.programmeId === selectedProgrammeId);
  const currentCourse = courses.find((c) => c.id === selectedCourseId) || availableCourses[0] || courses[0];
  const currentProgramme = programmes.find((p) => p.id === selectedProgrammeId) || programmes[0];

  // LIVE AI ACADEMIC VERIFICATION
  const validationResult = useMemo(() => {
    return validateAcademicMaterial(title, fileSelected, currentCourse, currentProgramme, docType);
  }, [title, fileSelected, currentCourse, currentProgramme, docType]);

  if (!isOpen) return null;

  // Preset academic test templates
  const handleSelectPreset = (type: 'valid' | 'notes' | 'spam') => {
    if (type === 'valid') {
      const newTitle = `${currentCourse.code} 2024 End of Semester Past Questions & Full Solutions`;
      setTitle(newTitle);
      setFileSelected(`${currentCourse.code}_2024_Solved_Pasco.pdf`);
      setDocType('Past Questions & Answers (Pasco)');
    } else if (type === 'notes') {
      const newTitle = `${currentCourse.code} Lecture 1-6 Midterm Comprehensive Notes & Review`;
      setTitle(newTitle);
      setFileSelected(`${currentCourse.code}_Lecture_Notes_Revision.pdf`);
      setDocType('Lecture Notes');
    } else {
      // Test spam / bypass attempt
      setTitle('My Summer Vacation Photos & Top Afrobeat Songs Playlist');
      setFileSelected('random_unrelated_file.pdf');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Strict Anti-Bypass Guard: Block submission if rejected
    if (validationResult.status === 'rejected') {
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);
    setVerificationStep('Step 1: Extracting document text & mathematical formulas...');

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const next = prev + 20;

        if (next >= 40 && next < 70) {
          setVerificationStep(`Step 2: Cross-referencing KNUST ${currentCourse.code} syllabus & course codes...`);
        } else if (next >= 70 && next < 95) {
          setVerificationStep(`Step 3: Academic relevance confirmed (${validationResult.score}% match). Indexing questions...`);
        } else if (next >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadSuccess(true);

          // Build and register the new document FIRST — before any effects that could throw
          const newDoc: StudyDocument = {
            id: `doc-${Date.now()}`,
            title: title.trim(),
            courseCode: currentCourse.code,
            courseName: currentCourse.name,
            programmeId: currentProgramme.id,
            programmeName: currentProgramme.name,
            collegeName: currentCourse.collegeName,
            level,
            semester,
            academicYear,
            docType,
            author: {
              name: 'Kwame Mensah',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
              hall: 'Unity Hall (Conti)',
              reputation: 100,
              uploadsCount: 1,
            },
            rating: 5.0,
            reviewsCount: 1,
            views: 12,
            downloads: 4,
            pageCount: 4,
            thumbnailUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
            pages: [
              {
                pageNumber: 1,
                title: `${currentCourse.code} - ${docType}`,
                contentHtml: `
                  <div class="doc-sheet">
                    <header class="doc-header-banner">
                      <span class="doc-badge">KNUST • ${currentCourse.code} • ${docType.toUpperCase()}</span>
                      <h1>${title}</h1>
                      <p class="doc-subtitle">${currentProgramme.name} | ${level} ${semester} | Verified Contributor Upload</p>
                    </header>
                    <section class="doc-section">
                      <h2>KNUST Question & Model Solution Overview</h2>
                      <p>This study document contains verified questions, step-by-step calculations, and lecture takeaways for ${currentCourse.name}.</p>
                      <div class="callout callout-success">
                        <strong>Academic Integrity Passed:</strong> Verified relevant to ${currentCourse.code} with ${validationResult.score}% syllabus match.
                      </div>
                    </section>
                  </div>
                `,
              },
              {
                pageNumber: 2,
                title: 'Section A - Compulsory Exam Questions & Full Working',
                contentHtml: `
                  <div class="doc-sheet">
                    <h2>Worked Examination Problems</h2>
                    <p>In-depth coverage of high-yield questions with full working proofs.</p>
                  </div>
                `,
              },
              {
                pageNumber: 3,
                title: 'Section B - Problem Solving & Proofs',
                contentHtml: `
                  <div class="doc-sheet">
                    <h2>Advanced Calculations & Key Takeaways</h2>
                    <p>Step-by-step mathematical reasoning and verified solutions.</p>
                  </div>
                `,
              },
              {
                pageNumber: 4,
                title: 'Exam Tips & Lecturer Guidance',
                contentHtml: `
                  <div class="doc-sheet">
                    <h2>High Probability Topics for Final Exam</h2>
                    <p>Important hints based on past syllabus trends.</p>
                  </div>
                `,
              },
            ],
            aiSummary: {
              executiveSummary: `Verified academic study material for ${currentCourse.code} (${currentCourse.name}) at KNUST.`,
              keyTakeaways: [
                'Directly aligned with KNUST course learning outcomes and semester syllabus.',
                'Includes verified past examination problems and lecture insights.',
              ],
              coreFormulasOrDefinitions: [
                { term: 'Core Principle', definition: `Fundamental concept tested in ${currentCourse.code} exams.` },
              ],
              examTips: [
                'Review the compulsory questions on Page 2 before entering the exam hall.',
              ],
            },
            quiz: [
              {
                id: 'uq1',
                question: `Which core topic is emphasized in this ${currentCourse.code} study material?`,
                options: [currentCourse.name, 'Unrelated Elective', 'General Studies', 'Non-Academic Material'],
                correctIndex: 0,
                explanation: `The material directly covers ${currentCourse.name}.`,
              },
            ],
            flashcards: [
              {
                id: 'uf1',
                front: `Key objective of ${currentCourse.code}?`,
                back: `Mastering the concepts for KNUST midsem and end-of-sem exams.`,
                category: currentCourse.code,
              },
            ],
            comments: [],
          };

          // Always call onUploadSuccess first — this is the critical path
          onUploadSuccess(newDoc);

          // Confetti is purely cosmetic — wrap in try-catch so it NEVER breaks the upload flow
          try {
            confetti({
              particleCount: 120,
              spread: 90,
              origin: { y: 0.6 },
            });
          } catch (_e) {
            // confetti failed silently (e.g. CSP headers on Netlify) — upload already succeeded
          }

        }
        return next;
      });
    }, 220);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        style={{ maxWidth: '680px', maxHeight: '92vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UploadCloud size={22} color="#1A73E8" />
              <span>Upload KNUST Pasco or Notes</span>
            </h3>
            <p className="modal-subtitle">
              Earn <strong style={{ color: '#059669' }}>+50 Tek Credits</strong> for each verified past paper or course note shared.
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {uploadSuccess ? (
            <div style={{ textAlign: 'center', padding: '36px 16px' }}>
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: '#ECFDF5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                  boxShadow: '0 4px 16px rgba(5, 150, 105, 0.2)',
                }}
              >
                <CheckCircle size={36} />
              </div>

              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                Upload Verified & Published!
              </h3>
              <p style={{ fontSize: '14.5px', color: '#475569', maxWidth: '440px', margin: '0 auto 20px auto', lineHeight: '1.5' }}>
                Your study material passed our <strong>Academic Relevance & Integrity Check</strong> with a{' '}
                <strong style={{ color: '#059669' }}>{validationResult.score}% syllabus match</strong>!
              </p>

              <div
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '16px',
                  maxWidth: '380px',
                  margin: '0 auto 24px auto',
                  display: 'flex',
                  justifyContent: 'space-around',
                }}
              >
                <div>
                  <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Tek Credits Earned</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#059669' }}>+50</div>
                </div>
                <div style={{ borderRight: '1px solid #CBD5E1' }} />
                <div>
                  <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Free Unlocks</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#1A73E8' }}>+1</div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="btn-upload"
                style={{ width: '100%', maxWidth: '280px', margin: '0 auto', justifyContent: 'center' }}
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              
              {/* File Selection Dropzone */}
              {!fileSelected ? (
                <div
                  className="upload-dropzone"
                  onClick={() => handleSelectPreset('valid')}
                  style={{ marginBottom: '20px', cursor: 'pointer' }}
                >
                  <UploadCloud size={36} color="#1A73E8" style={{ marginBottom: '8px' }} />
                  <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '15px', margin: '0 0 4px 0' }}>
                    Click to select study document
                  </p>
                  <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0 }}>
                    PDF, DOCX, or PPTX up to 50MB
                  </p>

                  {/* Quick-test helper buttons */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '8px',
                      marginTop: '14px',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectPreset('valid')}
                      style={{
                        fontSize: '11px',
                        background: '#EFF6FF',
                        color: '#1A73E8',
                        border: '1px solid #BFDBFE',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      + Load Sample Pasco
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectPreset('notes')}
                      style={{
                        fontSize: '11px',
                        background: '#F0FDF4',
                        color: '#059669',
                        border: '1px solid #BBF7D0',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      + Load Sample Notes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectPreset('spam')}
                      style={{
                        fontSize: '11px',
                        background: '#FEF2F2',
                        color: '#DC2626',
                        border: '1px solid #FECACA',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                      title="Test how RelaY anti-bypass AI detects and blocks irrelevant files"
                    >
                      ⚠️ Test Spam / Unrelated File
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    borderRadius: '12px',
                    marginBottom: '20px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={20} color="#1A73E8" />
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>
                        {fileSelected}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                        Ready for AI curriculum verification
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFileSelected(null);
                      setTitle('');
                    }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
                    title="Remove file"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Course Selection */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div className="input-field-group">
                  <label>KNUST Programme *</label>
                  <select
                    className="select-input"
                    value={selectedProgrammeId}
                    onChange={(e) => {
                      setSelectedProgrammeId(e.target.value);
                      const filtered = courses.filter((c) => c.programmeId === e.target.value);
                      if (filtered.length > 0) {
                        setSelectedCourseId(filtered[0].id);
                      }
                    }}
                  >
                    {programmes.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-field-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label>Course *</label>
                    {onOpenAddCourse && (
                      <button
                        type="button"
                        onClick={() => onOpenAddCourse(selectedProgrammeId)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#1A73E8',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px',
                        }}
                      >
                        <PlusCircle size={12} />
                        <span>+ Add course</span>
                      </button>
                    )}
                  </div>
                  <select
                    className="select-input"
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    required
                  >
                    {availableCourses.length > 0 ? (
                      availableCourses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.code} - {c.name}
                        </option>
                      ))
                    ) : (
                      <option value="">No courses yet. Click "Add course" above!</option>
                    )}
                  </select>
                </div>
              </div>

              {/* Title Input */}
              <div className="input-field-group" style={{ marginBottom: '12px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Document Title *</span>
                  <span style={{ fontSize: '11.5px', color: '#64748B' }}>Must relate to {currentCourse.code}</span>
                </label>
                <input
                  type="text"
                  className="input-text"
                  placeholder={`e.g. ${currentCourse.code} 2024 End of Semester Pasco with Answers`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{
                    borderColor:
                      validationResult.status === 'rejected' && title.length >= 5
                        ? '#EF4444'
                        : validationResult.status === 'approved'
                        ? '#10B981'
                        : undefined,
                  }}
                />
              </div>

              {/* LIVE AI ACADEMIC RELEVANCE GUARD BANNER */}
              <div
                style={{
                  borderRadius: '12px',
                  padding: '12px 14px',
                  marginBottom: '18px',
                  transition: 'all 0.2s ease',
                  background:
                    validationResult.status === 'approved'
                      ? '#F0FDF4'
                      : validationResult.status === 'warning'
                      ? '#FFFBEB'
                      : '#FEF2F2',
                  border: `1px solid ${
                    validationResult.status === 'approved'
                      ? '#BBF7D0'
                      : validationResult.status === 'warning'
                      ? '#FDE68A'
                      : '#FECACA'
                  }`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  {validationResult.status === 'approved' ? (
                    <ShieldCheck size={18} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                  ) : validationResult.status === 'warning' ? (
                    <AlertTriangle size={18} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                  ) : (
                    <ShieldAlert size={18} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                  )}

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          color:
                            validationResult.status === 'approved'
                              ? '#065F46'
                              : validationResult.status === 'warning'
                              ? '#92400E'
                              : '#991B1B',
                        }}
                      >
                        {validationResult.status === 'approved'
                          ? `Academic Match: ${validationResult.score}% (Approved)`
                          : validationResult.status === 'warning'
                          ? `Moderate Relevance: ${validationResult.score}%`
                          : `Relevance Guard: Upload Blocked (${validationResult.score}%)`}
                      </span>

                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background:
                            validationResult.status === 'approved'
                              ? '#DCFCE7'
                              : validationResult.status === 'warning'
                              ? '#FEF3C7'
                              : '#FEE2E2',
                          color:
                            validationResult.status === 'approved'
                              ? '#166534'
                              : validationResult.status === 'warning'
                              ? '#B45309'
                              : '#991B1B',
                        }}
                      >
                        {validationResult.status === 'approved' ? 'Passed' : validationResult.status === 'warning' ? 'Needs Context' : 'Rejected'}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: '12.5px',
                        lineHeight: '1.45',
                        margin: '0 0 6px 0',
                        color:
                          validationResult.status === 'approved'
                            ? '#065F46'
                            : validationResult.status === 'warning'
                            ? '#78350F'
                            : '#7F1D1D',
                      }}
                    >
                      {validationResult.reason}
                    </p>

                    {/* Show detected topics if any */}
                    {validationResult.matchedTopics.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Detected topics:</span>
                        {validationResult.matchedTopics.map((topic, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: '10.5px',
                              background: '#FFFFFF',
                              border: '1px solid #CBD5E1',
                              padding: '1px 6px',
                              borderRadius: '4px',
                              fontWeight: 600,
                              color: '#334155',
                            }}
                          >
                            ✓ {topic}
                          </span>
                        ))}
                      </div>
                    )}

                    {validationResult.suggestedFix && validationResult.status !== 'approved' && (
                      <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '6px', fontStyle: 'italic' }}>
                        💡 {validationResult.suggestedFix}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Resource Category & Academic Year */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div className="input-field-group">
                  <label>Resource Category *</label>
                  <select
                    className="select-input"
                    value={docType}
                    onChange={(e) => setDocType(e.target.value as any)}
                  >
                    <option value="Past Questions & Answers (Pasco)">Past Questions & Answers (Pasco)</option>
                    <option value="Lecture Notes">Lecture Notes / Slides</option>
                    <option value="Exam Preparation">Midsem / Exam Preparation</option>
                    <option value="Summary">Course Summary / Cheat Sheet</option>
                    <option value="Assignment Solution">Assignment Solution / Lab</option>
                  </select>
                </div>

                <div className="input-field-group">
                  <label>Academic Year</label>
                  <select
                    className="select-input"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                  >
                    <option value="2025/2026">2025/2026 (Current)</option>
                    <option value="2024/2025">2024/2025</option>
                    <option value="2023/2024">2023/2024</option>
                    <option value="2022/2023">2022/2023</option>
                  </select>
                </div>
              </div>

              {/* Level and Semester */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div className="input-field-group">
                  <label>KNUST Level</label>
                  <select
                    className="select-input"
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                  >
                    <option value="Level 100">Level 100</option>
                    <option value="Level 200">Level 200</option>
                    <option value="Level 300">Level 300</option>
                    <option value="Level 400">Level 400</option>
                    <option value="Level 500">Level 500</option>
                    <option value="Level 600">Level 600</option>
                  </select>
                </div>

                <div className="input-field-group">
                  <label>Semester</label>
                  <select
                    className="select-input"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value as any)}
                  >
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                  </select>
                </div>
              </div>

              {/* Live AI Progress Scanner */}
              {isUploading && (
                <div
                  style={{
                    marginBottom: '20px',
                    padding: '16px',
                    background: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    borderRadius: '12px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: 700, color: '#166534', marginBottom: '8px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles size={14} />
                      {verificationStep}
                    </span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div style={{ height: '8px', background: '#DCFCE7', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${uploadProgress}%`,
                        background: 'linear-gradient(90deg, #10B981 0%, #059669 100%)',
                        transition: 'width 0.2s ease',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B' }}>
                  <ShieldCheck size={16} color="#10B981" />
                  <span>Awards +50 Tek Credits upon verification</span>
                </div>

                <button
                  type="submit"
                  disabled={isUploading || !title.trim() || validationResult.status === 'rejected'}
                  style={{
                    background:
                      validationResult.status === 'rejected'
                        ? '#94A3B8'
                        : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    color: '#FFF',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '100px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor:
                      isUploading || validationResult.status === 'rejected'
                        ? 'not-allowed'
                        : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow:
                      validationResult.status === 'rejected'
                        ? 'none'
                        : '0 4px 14px rgba(16, 185, 129, 0.3)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isUploading ? (
                    'Verifying Syllabus...'
                  ) : validationResult.status === 'rejected' ? (
                    'Fix Relevance to Upload'
                  ) : (
                    <>
                      <UploadCloud size={16} />
                      <span>Publish & Claim 50 Credits</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

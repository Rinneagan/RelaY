import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, FileText, ArrowRight, GraduationCap } from 'lucide-react';
import type { StudyDocument, Course, KnustProgramme } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: StudyDocument[];
  courses: Course[];
  programmes: KnustProgramme[];
  onSelectDocument: (doc: StudyDocument) => void;
  onSelectCourse: (course: Course) => void;
  onSelectProgramme: (programme: KnustProgramme) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  documents,
  courses,
  programmes,
  onSelectDocument,
  onSelectCourse,
  onSelectProgramme,
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'programmes' | 'courses' | 'documents'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredDocs = documents.filter(
    (d) =>
      d.title.toLowerCase().includes(q) ||
      d.courseCode.toLowerCase().includes(q) ||
      d.programmeName.toLowerCase().includes(q)
  );

  const filteredCourses = courses.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.programmeName.toLowerCase().includes(q)
  );

  const filteredProgrammes = programmes.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.degree.toLowerCase().includes(q)
  );

  const popularSearches = ['COE 251 Pasco', 'MATH 151 Calculus', 'Computer Engineering', 'Pharmacy', 'CSM 157 C++', 'LAW 101'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        style={{ maxWidth: '640px', maxHeight: '80vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Search size={20} color="#0056D2" />
          <input
            type="text"
            placeholder="Search KNUST programme, course code (e.g. COE 251), or pasco..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              fontWeight: 500
            }}
          />
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', padding: '10px 20px', background: '#F8FAFC', borderBottom: '1px solid var(--border-light)' }}>
          {(['all', 'programmes', 'courses', 'documents'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                background: activeFilter === filter ? 'var(--primary)' : '#FFF',
                color: activeFilter === filter ? '#FFF' : 'var(--text-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-full)',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {filter === 'documents' ? 'Past Questions & Notes' : filter}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div style={{ padding: '16px 20px', overflowY: 'auto', flex: 1, maxHeight: '420px' }}>
          {!query && (
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.5px' }}>
                Popular Searches at KNUST
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                {popularSearches.map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    style={{
                      background: 'var(--bg-subtle)',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Programmes Section */}
          {(activeFilter === 'all' || activeFilter === 'programmes') && filteredProgrammes.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                KNUST Degree Programmes ({filteredProgrammes.length})
              </div>
              {filteredProgrammes.map((prog) => (
                <div
                  key={prog.id}
                  onClick={() => {
                    onSelectProgramme(prog);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#F1F5F9')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--primary-light)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                      <GraduationCap size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>{prog.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {prog.degree} • {prog.coursesCount} Courses • {prog.documentsCount} Pasco & Notes
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={14} color="#A0AEC0" />
                </div>
              ))}
            </div>
          )}

          {/* Courses Section */}
          {(activeFilter === 'all' || activeFilter === 'courses') && filteredCourses.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                KNUST Courses ({filteredCourses.length})
              </div>
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => {
                    onSelectCourse(course);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#F1F5F9')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', background: '#DEF7EC', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#03543F' }}>
                      <BookOpen size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13px' }}>
                        <span style={{ color: 'var(--primary)', marginRight: '6px' }}>{course.code}</span>
                        {course.name}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {course.level} • {course.semester} • {course.programmeName}
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={14} color="#A0AEC0" />
                </div>
              ))}
            </div>
          )}

          {/* Documents Section */}
          {(activeFilter === 'all' || activeFilter === 'documents') && filteredDocs.length > 0 && (
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Past Questions & Notes ({filteredDocs.length})
              </div>
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => {
                    onSelectDocument(doc);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#F1F5F9')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', background: '#FEF3C7', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B45309' }}>
                      <FileText size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>{doc.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {doc.courseCode} • {doc.level} {doc.semester} • {doc.pageCount} pages
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={14} color="#A0AEC0" />
                </div>
              ))}
            </div>
          )}

          {filteredDocs.length === 0 && filteredCourses.length === 0 && filteredProgrammes.length === 0 && (
            <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '14px' }}>No KNUST materials matching "{query}"</p>
              <p style={{ fontSize: '12px', marginTop: '4px' }}>Try searching "COE 251", "Computer Engineering", or "MATH 151"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

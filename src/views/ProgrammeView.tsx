import React, { useState } from 'react';
import type { KnustProgramme, Course } from '../types';
import { ArrowLeft, Plus, BookOpen, Clock, FileText, UploadCloud, ChevronRight } from 'lucide-react';

interface ProgrammeViewProps {
  programme: KnustProgramme;
  courses: Course[];
  onBack: () => void;
  onSelectCourse: (course: Course) => void;
  onOpenAddCourse: (programmeId: string) => void;
  onOpenUploadForCourse: (course: Course) => void;
}

export const ProgrammeView: React.FC<ProgrammeViewProps> = ({
  programme,
  courses,
  onBack,
  onSelectCourse,
  onOpenAddCourse,
  onOpenUploadForCourse,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedSemester, setSelectedSemester] = useState<string>('All');

  const programmeCourses = courses.filter((c) => c.programmeId === programme.id);

  const levels = ['All', 'Level 100', 'Level 200', 'Level 300', 'Level 400'];
  const semesters = ['All', 'Semester 1', 'Semester 2'];

  const filteredCourses = programmeCourses.filter((course) => {
    const matchLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchSem = selectedSemester === 'All' || course.semester === selectedSemester;
    return matchLevel && matchSem;
  });

  return (
    <div className="container" style={{ padding: '36px 24px' }}>
      {/* Back link */}
      <button
        onClick={onBack}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'none',
          border: 'none',
          color: 'var(--text-secondary)',
          fontSize: '13px',
          fontWeight: 700,
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to All Programmes</span>
      </button>

      {/* Programme Hero Banner */}
      <div
        style={{
          background: '#FFF',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-xl)',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '24px',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ maxWidth: '720px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                fontWeight: 800,
                fontSize: '12px',
                padding: '3px 10px',
                borderRadius: '4px'
              }}
            >
              KNUST DEGREE PROGRAMME
            </span>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {programme.degree} • {programme.durationYears} Years
            </span>
          </div>

          <h1 style={{ fontSize: '30px', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '12px' }}>
            {programme.name}
          </h1>

          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
            Access lecture slides, past questions (pasco), and exam preparations uploaded by KNUST students under {programme.name}. Add new courses and upload files to help your classmates.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '13px', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={16} color="#0056D2" />
              <strong>{programmeCourses.length}</strong> registered courses
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={16} color="#059669" />
              <strong>{programme.documentsCount}</strong> study materials
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} color="#D97706" />
              Updated this semester
            </span>
          </div>
        </div>

        {/* Action button */}
        <div>
          <button
            onClick={() => onOpenAddCourse(programme.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--primary)',
              color: '#FFF',
              border: 'none',
              padding: '12px 24px',
              borderRadius: 'var(--radius-full)',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Plus size={18} />
            <span>Add Course to Programme</span>
          </button>
        </div>
      </div>

      {/* Filter and Course Count */}
      <div className="section-header-row" style={{ flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 className="section-title">Courses under {programme.name}</h2>
          <p className="section-subtitle">
            Showing {filteredCourses.length} of {programmeCourses.length} courses
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {/* Level Filter */}
          <div className="category-tags-pills">
            {levels.map((lvl) => (
              <button
                key={lvl}
                className={`filter-tab ${selectedLevel === lvl ? 'active' : ''}`}
                onClick={() => setSelectedLevel(lvl)}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Semester Filter */}
          <div className="category-tags-pills">
            {semesters.map((sem) => (
              <button
                key={sem}
                className={`filter-tab ${selectedSemester === sem ? 'active' : ''}`}
                onClick={() => setSelectedSemester(sem)}
              >
                {sem}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px',
            marginBottom: '48px'
          }}
        >
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => onSelectCourse(course)}
              style={{
                background: '#FFF',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0056D2';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--shadow-card)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span
                  style={{
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    fontWeight: 800,
                    fontSize: '13px',
                    padding: '3px 9px',
                    borderRadius: '4px'
                  }}
                >
                  {course.code}
                </span>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <span
                    style={{
                      background: '#F1F5F9',
                      color: 'var(--text-secondary)',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    {course.level}
                  </span>
                  <span
                    style={{
                      background: '#FEF3C7',
                      color: '#92400E',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    {course.semester}
                  </span>
                </div>
              </div>

              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  lineHeight: '1.4'
                }}
              >
                {course.name}
              </h3>

              <p
                style={{
                  fontSize: '12.5px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5',
                  marginBottom: '16px',
                  flex: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {course.description}
              </p>

              <div
                style={{
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  <FileText size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  <strong>{course.documentsCount}</strong> study files
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenUploadForCourse(course);
                    }}
                    style={{
                      background: 'none',
                      border: '1px solid #10B981',
                      color: '#059669',
                      borderRadius: 'var(--radius-full)',
                      padding: '4px 10px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <UploadCloud size={13} />
                    <span>Upload</span>
                  </button>

                  <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>
                    <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: '#FFF',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-xl)'
          }}
        >
          <BookOpen size={40} color="#94A3B8" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '6px' }}>
            No courses found under this filter
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Are you taking a course under {programme.name} that is not listed here?
          </p>
          <button
            onClick={() => onOpenAddCourse(programme.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--primary)',
              color: '#FFF',
              border: 'none',
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Plus size={16} />
            <span>Add the first course</span>
          </button>
        </div>
      )}
    </div>
  );
};

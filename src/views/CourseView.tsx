import React, { useState } from 'react';
import type { Course, StudyDocument } from '../types';
import { DocumentCard } from '../components/DocumentCard';
import { ArrowLeft, BookOpen, Users, Star, UploadCloud, Bell, BellOff, Filter } from 'lucide-react';

interface CourseViewProps {
  course: Course;
  documents: StudyDocument[];
  onBack: () => void;
  onSelectDocument: (doc: StudyDocument) => void;
  onOpenUpload: () => void;
  onSaveToStudylist: (doc: StudyDocument, e: React.MouseEvent) => void;
  savedDocIds: string[];
}

export const CourseView: React.FC<CourseViewProps> = ({
  course,
  documents,
  onBack,
  onSelectDocument,
  onOpenUpload,
  onSaveToStudylist,
  savedDocIds,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('All');

  const courseDocs = documents.filter(
    (doc) => doc.courseCode.toLowerCase() === course.code.toLowerCase()
  );

  const docTypes = [
    'All',
    'Past Questions & Answers (Pasco)',
    'Lecture Notes',
    'Exam Preparation',
    'Summary'
  ];

  const filteredDocs = courseDocs.filter(
    (doc) => selectedType === 'All' || doc.docType === selectedType
  );

  return (
    <div className="container" style={{ padding: '32px 24px' }}>
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
        <span>Back</span>
      </button>

      {/* Course Hero Banner */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                fontWeight: 800,
                fontSize: '14px',
                padding: '4px 12px',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              {course.code}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {course.programmeName} • {course.level} • {course.semester}
            </span>
          </div>

          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '12px' }}>
            {course.name}
          </h1>

          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
            {course.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '13px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={16} color="#0056D2" />
              <strong>{courseDocs.length}</strong> study files / pasco
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={16} color="#059669" />
              <strong>{course.followersCount + (isFollowing ? 1 : 0)}</strong> KNUST students
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#D97706', fontWeight: 700 }}>
              <Star size={15} fill="#FFB800" color="#FFB800" />
              {course.rating} / 5
            </span>
          </div>
        </div>

        {/* Action CTAs */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: 700,
              border: '1px solid var(--border-light)',
              background: isFollowing ? 'var(--primary-light)' : '#FFF',
              color: isFollowing ? 'var(--primary)' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            {isFollowing ? <BellOff size={15} /> : <Bell size={15} />}
            <span>{isFollowing ? 'Following' : 'Follow Course'}</span>
          </button>

          <button
            onClick={onOpenUpload}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--accent-emerald)',
              color: '#FFF',
              border: 'none',
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(0, 168, 107, 0.25)'
            }}
          >
            <UploadCloud size={16} />
            <span>Upload Questions / Notes</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="section-header-row" style={{ flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} color="#0056D2" />
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary-dark)' }}>
            Course Materials ({filteredDocs.length})
          </h2>
        </div>

        <div className="category-tags-pills">
          {docTypes.map((type) => (
            <button
              key={type}
              className={`filter-tab ${selectedType === type ? 'active' : ''}`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
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
          <BookOpen size={36} color="#94A3B8" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
            No documents found under "{selectedType}"
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: '16px' }}>
            Do you have past questions, solutions, or lecture slides for {course.code}? Upload them to help your classmates!
          </p>
          <button className="btn-upload" onClick={onOpenUpload} style={{ margin: '0 auto' }}>
            <UploadCloud size={16} />
            <span>Upload notes for {course.code}</span>
          </button>
        </div>
      )}
    </div>
  );
};

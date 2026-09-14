import React, { useState } from 'react';
import type { Course, StudyDocument } from '../types';
import { DocumentCard } from '../components/DocumentCard';
import { ArrowLeft, BookOpen, Users, Star, UploadCloud, Bell, BellOff, Filter } from 'lucide-react';

interface CourseViewProps {
  course: Course;
  documents: StudyDocument[];
  isFollowing: boolean;
  onToggleFollow: () => void;
  onBack: () => void;
  onSelectDocument: (doc: StudyDocument) => void;
  onOpenUpload: () => void;
  onSaveToStudylist: (doc: StudyDocument, e: React.MouseEvent) => void;
  savedDocIds: string[];
}

export const CourseView: React.FC<CourseViewProps> = ({
  course,
  documents,
  isFollowing,
  onToggleFollow,
  onBack,
  onSelectDocument,
  onOpenUpload,
  onSaveToStudylist,
  savedDocIds,
}) => {
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
            onClick={onToggleFollow}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: 700,
              border: isFollowing ? '1px solid var(--primary)' : '1px solid var(--border-light)',
              background: isFollowing ? 'var(--primary-light)' : 'var(--bg-surface)',
              color: isFollowing ? 'var(--primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {isFollowing ? <BellOff size={15} /> : <Bell size={15} />}
            <span>{isFollowing ? 'Following ✓' : 'Follow Course'}</span>
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
        <div style={{ textAlign: 'center', padding: '64px 24px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-xl)', border: '2px dashed var(--border-light)' }}>
          {/* Animated empty state icon */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <BookOpen size={36} color="var(--primary)" />
            </div>
            <div style={{ position: 'absolute', top: '-6px', right: '-6px', width: '24px', height: '24px', background: 'var(--accent-emerald)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--bg-surface)' }}>
              <UploadCloud size={13} color="#fff" />
            </div>
          </div>

          <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
            Be the first to upload for {course.code}!
          </h3>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', maxWidth: '380px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
            {selectedType !== 'All'
              ? `No ${selectedType} found yet for ${course.name}.`
              : `${course.name} has no study materials yet.`}
            {' '}Help your classmates and earn <strong style={{ color: 'var(--accent-emerald)' }}>+50 Tek Credits</strong>!
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-upload" onClick={onOpenUpload} style={{ margin: 0 }}>
              <UploadCloud size={16} />
              <span>Upload for {course.code} (+50 Credits)</span>
            </button>
            <button
              onClick={onToggleFollow}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: isFollowing ? 'var(--primary-light)' : 'transparent', color: isFollowing ? 'var(--primary)' : 'var(--text-secondary)', border: '1.5px solid', borderColor: isFollowing ? 'var(--primary)' : 'var(--border-light)', borderRadius: 'var(--radius-full)', padding: '10px 18px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
            >
              {isFollowing ? <BellOff size={15} /> : <Bell size={15} />}
              <span>{isFollowing ? 'Unfollow' : 'Follow — get notified when pasco drops'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


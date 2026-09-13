import React from 'react';
import type { StudyDocument } from '../types';
import { Star, Eye, Download, Bookmark, FileText } from 'lucide-react';

interface DocumentCardProps {
  document: StudyDocument;
  onSelect: (doc: StudyDocument) => void;
  onSaveToStudylist?: (doc: StudyDocument, e: React.MouseEvent) => void;
  isSaved?: boolean;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onSelect,
  onSaveToStudylist,
  isSaved = false,
}) => {
  return (
    <div className="doc-card" onClick={() => onSelect(document)}>
      <div className="doc-card-thumb-container">
        <img
          src={document.thumbnailUrl}
          alt={document.title}
          className="doc-card-thumb-img"
          loading="lazy"
        />
        <div className="doc-badge-pill" style={{ maxWidth: '85%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {document.docType}
        </div>
        <div className="doc-pages-pill">{document.pageCount} pages</div>
      </div>

      <div className="doc-card-body">
        <div className="doc-card-meta-top">
          <span className="doc-course-tag">{document.courseCode}</span>
          <span style={{ fontSize: '11px', background: '#F1F5F9', padding: '1px 6px', borderRadius: '4px' }}>
            {document.level} • {document.semester}
          </span>
        </div>

        <h3 className="doc-card-title" title={document.title}>
          {document.title}
        </h3>

        <div className="doc-card-uni">
          <FileText size={14} color="#0056D2" />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {document.programmeName}
          </span>
        </div>

        <div className="doc-card-footer">
          <div className="doc-rating-stat">
            <Star size={14} fill="#FFB800" color="#FFB800" />
            <span>{document.rating}</span>
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({document.reviewsCount})</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Eye size={13} /> {document.views > 1000 ? `${(document.views / 1000).toFixed(1)}k` : document.views}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Download size={13} /> {document.downloads > 1000 ? `${(document.downloads / 1000).toFixed(1)}k` : document.downloads}
            </span>

            {onSaveToStudylist && (
              <button
                type="button"
                onClick={(e) => onSaveToStudylist(document, e)}
                title={isSaved ? 'Remove from Studylist' : 'Save to Studylist'}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  color: isSaved ? '#0056D2' : '#718096'
                }}
              >
                <Bookmark size={15} fill={isSaved ? '#0056D2' : 'none'} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import type { StudyDocument, DocumentComment } from '../../types';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';

interface CommentsTabProps {
  document: StudyDocument;
}

export const CommentsTab: React.FC<CommentsTabProps> = ({ document }) => {
  const [comments, setComments] = useState<DocumentComment[]>(document.comments);
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState(5);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const added: DocumentComment = {
      id: Date.now().toString(),
      author: 'Kwame Mensah',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      hallOrDept: 'Unity Hall (Conti)',
      date: 'Just now',
      rating: userRating,
      text: newComment.trim(),
      likes: 1,
      isHelpful: true
    };

    setComments([added, ...comments]);
    setNewComment('');
  };

  const handleLike = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MessageSquare size={16} color="#0056D2" />
          Community Reviews ({comments.length})
        </h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 700, color: '#D97706' }}>
          <Star size={14} fill="#FFB800" color="#FFB800" />
          <span>{document.rating} / 5</span>
        </div>
      </div>

      {/* Add Review Form */}
      <form
        onSubmit={handleAddComment}
        style={{
          background: '#F8FAFC',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '12px',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Your Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setUserRating(star)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '1px' }}
            >
              <Star
                size={14}
                fill={star <= userRating ? '#FFB800' : 'none'}
                color={star <= userRating ? '#FFB800' : '#CBD5E0'}
              />
            </button>
          ))}
        </div>

        <textarea
          rows={2}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share how this study guide helped you or ask a question..."
          style={{
            width: '100%',
            padding: '8px 10px',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12.5px',
            outline: 'none',
            resize: 'none',
            background: '#FFF'
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
          <button
            type="submit"
            disabled={!newComment.trim()}
            style={{
              background: 'var(--primary)',
              color: '#FFF',
              border: 'none',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Post Review
          </button>
        </div>
      </form>

      {/* Reviews list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {comments.map((comment) => (
          <div
            key={comment.id}
            style={{
              borderBottom: '1px solid #F1F5F9',
              paddingBottom: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {comment.author}
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                    {comment.hallOrDept} • {comment.date}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '2px' }}>
                {Array.from({ length: comment.rating }).map((_, i) => (
                  <Star key={i} size={11} fill="#FFB800" color="#FFB800" />
                ))}
              </div>
            </div>

            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.45', margin: '6px 0' }}>
              {comment.text}
            </p>

            <button
              onClick={() => handleLike(comment.id)}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <ThumbsUp size={11} />
              <span>Helpful ({comment.likes})</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

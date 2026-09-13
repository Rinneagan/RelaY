import React, { useState } from 'react';
import type { StudyDocument, UserProfile } from '../types';
import { DocumentCard } from '../components/DocumentCard';
import { Bookmark, Plus, Folder, Lock, Globe } from 'lucide-react';

interface StudylistsViewProps {
  user: UserProfile;
  documents: StudyDocument[];
  onSelectDocument: (doc: StudyDocument) => void;
  onCreateStudylist: (name: string, description: string, isPrivate: boolean) => void;
  onRemoveDocFromStudylist: (listId: string, docId: string) => void;
}

export const StudylistsView: React.FC<StudylistsViewProps> = ({
  user,
  documents,
  onSelectDocument,
  onCreateStudylist,
  onRemoveDocFromStudylist,
}) => {
  const [selectedListId, setSelectedListId] = useState<string | null>(
    user.savedStudylists[0]?.id || null
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDesc, setNewListDesc] = useState('');
  const [newListPrivate, setNewListPrivate] = useState(false);

  const selectedList = user.savedStudylists.find((l) => l.id === selectedListId);

  const listDocs = selectedList
    ? documents.filter((d) => selectedList.documentIds.includes(d.id))
    : [];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    onCreateStudylist(newListName.trim(), newListDesc.trim(), newListPrivate);
    setNewListName('');
    setNewListDesc('');
    setNewListPrivate(false);
    setShowCreateModal(false);
  };

  return (
    <div className="container" style={{ padding: '36px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bookmark size={28} color="#0056D2" />
            My Studylists
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Personal collections of notes and exam summaries organized for your courses.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          style={{
            display: 'flex',
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
          <Plus size={16} />
          <span>New Studylist</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '28px' }}>
        {/* Left: Studylists directory */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {user.savedStudylists.map((list) => {
            const isSelected = list.id === selectedListId;
            return (
              <div
                key={list.id}
                onClick={() => setSelectedListId(list.id)}
                style={{
                  background: isSelected ? 'var(--primary-light)' : '#FFF',
                  border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border-light)'}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Folder size={18} color={isSelected ? '#0056D2' : '#64748B'} />
                    <span style={{ fontWeight: 800, fontSize: '14px', color: isSelected ? 'var(--primary)' : 'var(--text-primary)' }}>
                      {list.name}
                    </span>
                  </div>
                  {list.isPrivate ? (
                    <span title="Private studylist"><Lock size={13} color="#94A3B8" /></span>
                  ) : (
                    <span title="Public studylist"><Globe size={13} color="#94A3B8" /></span>
                  )}
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {list.description || 'No description'}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                  <span>{list.documentIds.length} documents</span>
                  <span>Updated {list.updatedAt}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Studylist Documents */}
        <div>
          {selectedList ? (
            <div>
              <div
                style={{
                  background: '#FFF',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px 24px',
                  marginBottom: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '4px' }}>
                    {selectedList.name}
                  </h2>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {selectedList.description}
                  </p>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)' }}>
                  {listDocs.length} Documents Saved
                </div>
              </div>

              {listDocs.length > 0 ? (
                <div className="documents-grid">
                  {listDocs.map((doc) => (
                    <div key={doc.id} style={{ position: 'relative' }}>
                      <DocumentCard
                        document={doc}
                        onSelect={onSelectDocument}
                        isSaved={true}
                        onSaveToStudylist={() => onRemoveDocFromStudylist(selectedList.id, doc.id)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '60px 0', background: '#FFF', borderRadius: 'var(--radius-lg)' }}>
                  <Folder size={40} color="#94A3B8" style={{ marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    This studylist is currently empty
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Bookmark documents while browsing to organize them into this collection!
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', background: '#FFF', borderRadius: 'var(--radius-lg)' }}>
              <p>Select a studylist on the left to view its contents.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-card" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Studylist</h3>
              <button className="modal-close-btn" onClick={() => setShowCreateModal(false)}>
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="modal-body">
              <div className="input-field-group">
                <label>Studylist Name *</label>
                <input
                  type="text"
                  className="input-text"
                  placeholder="e.g. Organic Chemistry Final Review 🧪"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  required
                />
              </div>

              <div className="input-field-group">
                <label>Description</label>
                <textarea
                  rows={3}
                  className="input-text"
                  placeholder="Optional summary of this study collection..."
                  value={newListDesc}
                  onChange={(e) => setNewListDesc(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
                <input
                  type="checkbox"
                  id="privateCheck"
                  checked={newListPrivate}
                  onChange={(e) => setNewListPrivate(e.target.checked)}
                />
                <label htmlFor="privateCheck" style={{ fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  Keep this studylist private (only visible to you)
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  style={{
                    background: 'none',
                    border: '1px solid var(--border-light)',
                    padding: '9px 18px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newListName.trim()}
                  style={{
                    background: 'var(--primary)',
                    color: '#FFF',
                    border: 'none',
                    padding: '9px 20px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Create Studylist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

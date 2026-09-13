import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle, Sparkles } from 'lucide-react';
import type { Course, KnustProgramme } from '../types';
import confetti from 'canvas-confetti';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  programmes: KnustProgramme[];
  initialProgrammeId?: string;
  onCourseAdded: (newCourse: Course) => void;
}

export const AddCourseModal: React.FC<AddCourseModalProps> = ({
  isOpen,
  onClose,
  programmes,
  initialProgrammeId,
  onCourseAdded,
}) => {
  const [programmeId, setProgrammeId] = useState(
    initialProgrammeId || programmes[0]?.id || ''
  );
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState<Course['level']>('Level 200');
  const [semester, setSemester] = useState<Course['semester']>('Semester 1');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !name.trim()) return;

    const prog = programmes.find((p) => p.id === programmeId) || programmes[0];

    const newCourse: Course = {
      id: `course-${code.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      code: code.trim().toUpperCase(),
      name: name.trim(),
      programmeId: prog.id,
      programmeName: prog.name,
      collegeId: prog.collegeId,
      collegeName: prog.name,
      level,
      semester,
      documentsCount: 0,
      rating: 5.0,
      followersCount: 1,
      description: description.trim() || `Course notes, past questions, and lecture slides for ${code.trim().toUpperCase()} (${name.trim()}) under ${prog.name}.`
    };

    onCourseAdded(newCourse);
    setSuccessMessage(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setSuccessMessage(false);
      setCode('');
      setName('');
      setDescription('');
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PlusCircle size={20} color="#0056D2" />
            <h3>Add Course to KNUST Programme</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {successMessage ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  background: '#ECFDF5',
                  color: '#10B981',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}
              >
                <CheckCircle size={32} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '6px' }}>
                Course Added Successfully!
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                <strong>{code.toUpperCase()}</strong> has been added to {programmes.find(p => p.id === programmeId)?.name}.
                Students can now upload and access files for this course!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-field-group">
                <label>KNUST Degree Programme *</label>
                <select
                  className="select-input"
                  value={programmeId}
                  onChange={(e) => setProgrammeId(e.target.value)}
                  required
                >
                  {programmes.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div className="input-field-group">
                  <label>Course Code *</label>
                  <input
                    type="text"
                    className="input-text"
                    placeholder="e.g. COE 251"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </div>

                <div className="input-field-group">
                  <label>Course Name *</label>
                  <input
                    type="text"
                    className="input-text"
                    placeholder="e.g. Data Structures & Algorithms"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="input-field-group">
                  <label>KNUST Level</label>
                  <select
                    className="select-input"
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                  >
                    <option value="Level 100">Level 100 (Year 1)</option>
                    <option value="Level 200">Level 200 (Year 2)</option>
                    <option value="Level 300">Level 300 (Year 3)</option>
                    <option value="Level 400">Level 400 (Year 4)</option>
                    <option value="Level 500">Level 500 (Year 5)</option>
                    <option value="Level 600">Level 600 (Year 6)</option>
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

              <div className="input-field-group">
                <label>Course Syllabus & Description</label>
                <textarea
                  rows={2}
                  className="input-text"
                  placeholder="Topics covered, lecturer notes, lab requirements..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <Sparkles size={14} color="#0056D2" />
                  <span>Available instantly for all KNUST students</span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={onClose}
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
                    disabled={!code.trim() || !name.trim()}
                    style={{
                      background: 'var(--primary)',
                      color: '#FFF',
                      border: 'none',
                      padding: '9px 22px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Create Course
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

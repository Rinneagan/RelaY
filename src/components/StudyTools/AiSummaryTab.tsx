import React, { useState } from 'react';
import type { StudyDocument } from '../../types';
import { Sparkles, CheckCircle, AlertTriangle, BookOpen, Copy, Check } from 'lucide-react';

interface AiSummaryTabProps {
  document: StudyDocument;
}

export const AiSummaryTab: React.FC<AiSummaryTabProps> = ({ document }) => {
  const [copied, setCopied] = useState(false);
  const { aiSummary } = document;

  const handleCopy = () => {
    const text = `
${document.title} - AI Summary
Executive Summary: ${aiSummary.executiveSummary}

Key Takeaways:
${aiSummary.keyTakeaways.map((k) => `• ${k}`).join('\n')}

Exam Tips:
${aiSummary.examTips.map((t) => `• ${t}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="ai-summary-header" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="ai-sparkle-tag">
            <Sparkles size={11} style={{ display: 'inline', marginRight: '4px' }} />
            AI GENERATED
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Updated 2026</span>
        </div>

        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: '1px solid var(--border-light)',
            padding: '4px 8px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer',
            color: 'var(--text-secondary)'
          }}
        >
          {copied ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <div className="summary-block-card" style={{ borderLeft: '4px solid var(--primary)' }}>
        <h4>
          <BookOpen size={15} color="#0056D2" />
          Executive Overview
        </h4>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          {aiSummary.executiveSummary}
        </p>
      </div>

      <div className="summary-block-card">
        <h4>
          <CheckCircle size={15} color="#10B981" />
          Key Exam Takeaways
        </h4>
        <ul>
          {aiSummary.keyTakeaways.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="summary-block-card">
        <h4>Core Terminology & Definitions</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
          {aiSummary.coreFormulasOrDefinitions.map((def, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFF',
                padding: '10px 12px',
                borderRadius: '6px',
                border: '1px solid var(--border-light)'
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '12px', color: 'var(--primary)' }}>
                {def.term}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {def.definition}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="summary-block-card" style={{ background: '#FFFBEB', borderColor: '#FDE68A' }}>
        <h4 style={{ color: '#92400E' }}>
          <AlertTriangle size={15} color="#D97706" />
          Exam Traps & Pro-Tips
        </h4>
        <ul style={{ color: '#78350F' }}>
          {aiSummary.examTips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

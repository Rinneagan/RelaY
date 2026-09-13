import React, { useState } from 'react';
import type { StudyDocument } from '../../types';
import { CheckCircle2, XCircle, RotateCcw, HelpCircle, Layers, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AiQuizTabProps {
  document: StudyDocument;
}

export const AiQuizTab: React.FC<AiQuizTabProps> = ({ document }) => {
  const [activeSubTab, setActiveSubTab] = useState<'quiz' | 'flashcards'>('quiz');

  // Quiz state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Flashcards state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const { quiz, flashcards } = document;
  const currentQuestion = quiz[currentQIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    setIsAnswerSubmitted(true);

    if (idx === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex + 1 < quiz.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleResetQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setShowHint(false);
  };

  return (
    <div>
      {/* Sub-mode toggle pills */}
      <div
        style={{
          display: 'flex',
          background: '#EDF2F7',
          padding: '3px',
          borderRadius: 'var(--radius-full)',
          marginBottom: '16px'
        }}
      >
        <button
          onClick={() => setActiveSubTab('quiz')}
          style={{
            flex: 1,
            padding: '6px 12px',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            background: activeSubTab === 'quiz' ? '#FFF' : 'transparent',
            fontWeight: 700,
            fontSize: '12px',
            color: activeSubTab === 'quiz' ? 'var(--primary)' : 'var(--text-secondary)',
            cursor: 'pointer',
            boxShadow: activeSubTab === 'quiz' ? 'var(--shadow-sm)' : 'none'
          }}
        >
          Practice Quiz ({quiz.length})
        </button>
        <button
          onClick={() => setActiveSubTab('flashcards')}
          style={{
            flex: 1,
            padding: '6px 12px',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            background: activeSubTab === 'flashcards' ? '#FFF' : 'transparent',
            fontWeight: 700,
            fontSize: '12px',
            color: activeSubTab === 'flashcards' ? 'var(--primary)' : 'var(--text-secondary)',
            cursor: 'pointer',
            boxShadow: activeSubTab === 'flashcards' ? 'var(--shadow-sm)' : 'none'
          }}
        >
          Flashcards ({flashcards.length})
        </button>
      </div>

      {activeSubTab === 'quiz' && (
        <div>
          {!quizFinished && currentQuestion ? (
            <div>
              {/* Progress bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                <span>Question {currentQIndex + 1} of {quiz.length}</span>
                <span>Score: {score}</span>
              </div>
              <div className="quiz-progress-bar">
                <div
                  className="quiz-progress-fill"
                  style={{ width: `${((currentQIndex + 1) / quiz.length) * 100}%` }}
                />
              </div>

              <div className="quiz-question-box">
                <h4 className="quiz-question-title">{currentQuestion.question}</h4>

                <div className="quiz-options-list">
                  {currentQuestion.options.map((option, idx) => {
                    let optionClass = 'quiz-option-btn';
                    if (isAnswerSubmitted) {
                      if (idx === currentQuestion.correctIndex) {
                        optionClass += ' selected-correct';
                      } else if (idx === selectedOption) {
                        optionClass += ' selected-wrong';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        className={optionClass}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswerSubmitted}
                      >
                        <span>{option}</span>
                        {isAnswerSubmitted && idx === currentQuestion.correctIndex && (
                          <CheckCircle2 size={16} color="#10B981" />
                        )}
                        {isAnswerSubmitted && idx === selectedOption && idx !== currentQuestion.correctIndex && (
                          <XCircle size={16} color="#EF4444" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Hint toggle */}
                {currentQuestion.hint && !isAnswerSubmitted && (
                  <div style={{ marginTop: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setShowHint(!showHint)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '11px',
                        color: 'var(--primary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontWeight: 600
                      }}
                    >
                      <HelpCircle size={13} />
                      {showHint ? 'Hide Hint' : 'Need a hint?'}
                    </button>
                    {showHint && (
                      <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px', fontStyle: 'italic' }}>
                        💡 {currentQuestion.hint}
                      </p>
                    )}
                  </div>
                )}

                {/* Answer Explanation & Next CTA */}
                {isAnswerSubmitted && (
                  <div className="quiz-explanation-card">
                    <div style={{ fontWeight: 700, marginBottom: '4px' }}>
                      {selectedOption === currentQuestion.correctIndex ? '🎉 Correct!' : '❌ Incorrect'}
                    </div>
                    <div>{currentQuestion.explanation}</div>
                    <button
                      onClick={handleNextQuestion}
                      style={{
                        marginTop: '12px',
                        background: 'var(--primary)',
                        color: '#FFF',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {currentQIndex + 1 < quiz.length ? 'Next Question →' : 'View Results 🏆'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '30px 10px', background: '#F8FAFC', borderRadius: 'var(--radius-lg)' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  background: '#FEF3C7',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                  color: '#D97706'
                }}
              >
                <Award size={32} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '8px' }}>
                Practice Test Complete!
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                You scored <strong>{score}</strong> out of <strong>{quiz.length}</strong> ({Math.round((score / quiz.length) * 100)}%)
              </p>
              <button
                onClick={handleResetQuiz}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--primary)',
                  color: '#FFF',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={15} />
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'flashcards' && flashcards.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            <span>Card {currentCardIndex + 1} of {flashcards.length}</span>
            <span style={{ fontWeight: 600, color: 'var(--primary)' }}>
              {flashcards[currentCardIndex].category}
            </span>
          </div>

          <div className="flashcard-wrapper" onClick={() => setIsFlipped(!isFlipped)}>
            <div className="flashcard-card">
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6, marginBottom: '8px' }}>
                {isFlipped ? 'Answer / Solution' : 'Question (Click to flip)'}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600, lineHeight: '1.5' }}>
                {isFlipped ? flashcards[currentCardIndex].back : flashcards[currentCardIndex].front}
              </div>
              <div className="flashcard-hint">
                <Layers size={12} style={{ display: 'inline', marginRight: '4px' }} />
                Tap to flip card
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : flashcards.length - 1));
              }}
              style={{
                flex: 1,
                padding: '8px',
                background: '#FFF',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              ← Previous
            </button>
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex((prev) => (prev + 1 < flashcards.length ? prev + 1 : 0));
              }}
              style={{
                flex: 1,
                padding: '8px',
                background: 'var(--primary)',
                color: '#FFF',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Next Card →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

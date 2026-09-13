import React, { useState } from 'react';
import type { StudyDocument } from '../../types';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface AskAiChatTabProps {
  document: StudyDocument;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AskAiChatTab: React.FC<AskAiChatTabProps> = ({ document }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Hi! I'm your AI Study Assistant for "${document.title}". Ask me any questions, request an explanation of complex equations, or ask for high-yield exam practice questions!`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'Explain the most tested concept',
    'Summarize Page 1 in simple terms',
    'Give me a mnemonic to remember this',
    'What is the hardest problem likely to be?'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText.trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate intelligent context-grounded AI reply
    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();

      if (lower.includes('page 1') || lower.includes('overview') || lower.includes('simple terms')) {
        reply = `Page 1 focuses on ${document.pages[0]?.title || 'the core foundations'}. Specifically, keep in mind: ${document.aiSummary.keyTakeaways[0] || 'master the primary definitions and complexity notations'}. Reviewing this section typically accounts for 20-30% of mid-term test questions!`;
      } else if (lower.includes('mnemonic') || lower.includes('memory') || lower.includes('remember')) {
        reply = `Here is a high-yield memory trick for this topic: Remember "C-E-U" -> Choose, Explore, Unchoose for backtracking, or "I-O-P" -> In-order visits (Left, Root, Right) which always generates strictly Ordered Output!`;
      } else if (lower.includes('hardest') || lower.includes('exam') || lower.includes('tested')) {
        reply = `Professors love testing edge cases here: "${document.aiSummary.examTips[0]}". Make sure you understand the difference between average-case and worst-case constraints!`;
      } else {
        reply = `Based on the document context for ${document.courseCode} (${document.collegeName} • KNUST): ${document.aiSummary.executiveSummary.slice(0, 160)}... Additionally, make sure to cross-reference the practice problems in the Quiz tab!`;
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: reply,
        timestamp: 'Just now'
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Quick Prompt Chips */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '10px' }}>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            style={{
              background: '#F1F5F9',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-full)',
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Sparkles size={11} color="#0056D2" />
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Thread */}
      <div className="ai-chat-thread" style={{ flex: 1, overflowY: 'auto' }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`ai-message-bubble ${msg.sender}`}
            style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}
          >
            <div style={{ marginTop: '2px', opacity: 0.8 }}>
              {msg.sender === 'assistant' ? <Bot size={15} color="#0056D2" /> : <User size={15} />}
            </div>
            <div>
              <div style={{ fontSize: '13px' }}>{msg.text}</div>
              <div style={{ fontSize: '10px', opacity: 0.6, marginTop: '4px', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="ai-message-bubble assistant" style={{ fontStyle: 'italic', fontSize: '12px', color: 'var(--text-muted)' }}>
            AI Tutor is analyzing document...
          </div>
        )}
      </div>

      {/* Input bar */}
      <form
        className="ai-chat-input-bar"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <input
          type="text"
          className="ai-chat-input"
          placeholder="Ask a question about this document..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className="btn-ai-send" disabled={!inputText.trim()}>
          <Send size={15} />
        </button>
      </form>
    </div>
  );
};

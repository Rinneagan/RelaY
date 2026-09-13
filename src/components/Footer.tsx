import React from 'react';
import { Heart, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1 */}
          <div className="footer-col" style={{ maxWidth: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <img
                src="/favicon.svg"
                alt="relay Logo"
                style={{
                  height: '26px',
                  width: 'auto',
                  display: 'block'
                }}
              />
              <span style={{ fontSize: '22px', fontWeight: 800, color: '#FFF' }}>
                rela<span style={{ color: '#8AB4F8' }}>y</span>
              </span>
            </div>
            <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#94A3B8', marginBottom: '16px' }}>
              RelaY is the dedicated academic companion for students of Kwame Nkrumah University of Science and Technology. Share past questions (pasco), lecture notes, and study with AI.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B' }}>
              <MapPin size={14} />
              <span>Kumasi, Ashanti Region, Ghana • Nyansapo</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="footer-col">
            <h5>KNUST Colleges</h5>
            <ul className="footer-links">
              <li><a href="#coe">College of Engineering (CoE)</a></li>
              <li><a href="#cos">College of Science (CoS)</a></li>
              <li><a href="#cohs">College of Health Sciences (CoHS)</a></li>
              <li><a href="#cohss">Humanities & Social Sciences (CoHSS)</a></li>
              <li><a href="#cabe">Art & Built Environment (CABE)</a></li>
              <li><a href="#canr">Agriculture & Natural Resources (CANR)</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="footer-col">
            <h5>Study Resources</h5>
            <ul className="footer-links">
              <li><a href="#pasco">Past Questions & Answers (Pasco)</a></li>
              <li><a href="#notes">Lecture Slides & Notes</a></li>
              <li><a href="#midsem">Midsem Revisions</a></li>
              <li><a href="#ai">AI Practice Quizzes</a></li>
              <li><a href="#upload">Upload & Earn Tek Credits</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="footer-col">
            <h5>KNUST Student Halls</h5>
            <ul className="footer-links">
              <li><a href="#conti">Unity Hall (Conti)</a></li>
              <li><a href="#katanga">University Hall (Katanga)</a></li>
              <li><a href="#qe">Queen Elizabeth II Hall</a></li>
              <li><a href="#indep">Independence Hall</a></li>
              <li><a href="#repub">Republic Hall</a></li>
              <li><a href="#africa">Africa Hall</a></li>
            </ul>
          </div>

          {/* Col 5 */}
          <div className="footer-col">
            <h5>Tek Community</h5>
            <ul className="footer-links">
              <li><a href="#help">Help & FAQs</a></li>
              <li><a href="#academic-rules">Academic Integrity Policy</a></li>
              <li><a href="#guidelines">Pasco Submission Guidelines</a></li>
              <li><a href="#rep">Become a Course Rep Contributor</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; 2026 RelaY. Designed exclusively for KNUST students in Kumasi, Ghana.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Built with</span> <Heart size={13} color="#EF4444" fill="#EF4444" /> <span>for the Tek family</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

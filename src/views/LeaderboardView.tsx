import React, { useState } from "react";
import { Trophy, Medal, ArrowLeft, Star, UploadCloud, BookOpen } from "lucide-react";

interface LeaderboardViewProps {
  onBack: () => void;
  onOpenUpload: () => void;
}

const TOP_CONTRIBUTORS = [
  { rank: 1, name: "Akua Osei", hall: "Africa Hall", college: "CoE", avatar: "https://i.pravatar.cc/150?img=47", uploads: 38, credits: 1950, badge: "🥇" },
  { rank: 2, name: "Kwesi Appiah", hall: "University Hall (Katanga)", college: "CoS", avatar: "https://i.pravatar.cc/150?img=12", uploads: 31, credits: 1600, badge: "🥈" },
  { rank: 3, name: "Emmanuel Mensah", hall: "Unity Hall (Conti)", college: "CoE", avatar: "https://i.pravatar.cc/150?img=33", uploads: 27, credits: 1400, badge: "🥉" },
  { rank: 4, name: "Abena Frimpong", hall: "Queen Elizabeth II Hall", college: "CoHS", avatar: "https://i.pravatar.cc/150?img=44", uploads: 22, credits: 1150, badge: null },
  { rank: 5, name: "Kofi Darkwah", hall: "Independence Hall (Brunei)", college: "CoS", avatar: "https://i.pravatar.cc/150?img=51", uploads: 19, credits: 980, badge: null },
  { rank: 6, name: "Ama Sarpong", hall: "Africa Hall", college: "CABE", avatar: "https://i.pravatar.cc/150?img=56", uploads: 17, credits: 890, badge: null },
  { rank: 7, name: "Yaw Boateng", hall: "University Hall (Katanga)", college: "CoE", avatar: "https://i.pravatar.cc/150?img=15", uploads: 14, credits: 740, badge: null },
  { rank: 8, name: "Efua Asante", hall: "Unity Hall (Conti)", college: "CoHSS", avatar: "https://i.pravatar.cc/150?img=60", uploads: 12, credits: 620, badge: null },
];

const HALL_STATS = [
  { hall: "University Hall (Katanga)", badge: "🦁", uploads: 1240, students: 342, color: "#B45309" },
  { hall: "Unity Hall (Conti)", badge: "🌟", uploads: 1180, students: 318, color: "#0056D2" },
  { hall: "Africa Hall", badge: "🌍", uploads: 960, students: 280, color: "#059669" },
  { hall: "Queen Elizabeth II Hall", badge: "👑", uploads: 840, students: 245, color: "#7C3AED" },
  { hall: "Independence Hall (Brunei)", badge: "🔥", uploads: 720, students: 198, color: "#DC2626" },
  { hall: "Commonwealth Hall", badge: "⚡", uploads: 680, students: 187, color: "#D97706" },
];

const COLLEGE_STATS = [
  { name: "College of Engineering", short: "CoE", badge: "⚙️", docs: 14200, color: "#0056D2" },
  { name: "College of Science", short: "CoS", badge: "🔬", docs: 12800, color: "#059669" },
  { name: "College of Health Sciences", short: "CoHS", badge: "🩺", docs: 10400, color: "#DC2626" },
  { name: "College of Humanities & Social Sciences", short: "CoHSS", badge: "⚖️", docs: 11900, color: "#7C3AED" },
  { name: "College of Art & Built Environment", short: "CABE", badge: "🏛️", docs: 7800, color: "#D97706" },
  { name: "College of Agriculture & Natural Resources", short: "CANR", badge: "🌱", docs: 5200, color: "#059669" },
];

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ onBack, onOpenUpload }) => {
  const [activeTab, setActiveTab] = useState<"contributors" | "halls" | "colleges">("contributors");
  const maxDocs = Math.max(...COLLEGE_STATS.map(c => c.docs));
  const maxUploads = Math.max(...HALL_STATS.map(h => h.uploads));

  return (
    <div className="container" style={{ padding: "32px 24px", maxWidth: "960px", margin: "0 auto" }}>
      {/* Back + Header */}
      <div style={{ marginBottom: "28px" }}>
        <button className="btn-back-link" onClick={onBack} style={{ marginBottom: "16px" }}>
          <ArrowLeft size={16} /> Back
        </button>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "var(--primary-dark)", letterSpacing: "-0.5px", marginBottom: "4px", display: "flex", alignItems: "center", gap: "10px" }}>
              <Trophy size={26} color="#D97706" /> KNUST Leaderboard
            </h1>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              Top contributors powering the RelaY academic community
            </p>
          </div>
          <button
            onClick={onOpenUpload}
            style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: "var(--radius-full)", padding: "10px 20px", fontSize: "13px", fontWeight: 700, cursor: "pointer", boxShadow: "var(--shadow-sm)" }}
          >
            <UploadCloud size={15} /> Upload & Earn Credits
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", background: "var(--bg-subtle)", borderRadius: "var(--radius-lg)", padding: "4px" }}>
        {([["contributors", "🏆 Top Contributors"], ["halls", "🏛️ Hall Rankings"], ["colleges", "📚 College Rankings"]] as const).map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ flex: 1, padding: "9px 12px", border: "none", borderRadius: "var(--radius-md)", fontWeight: 700, fontSize: "13px", cursor: "pointer", transition: "all 0.2s ease", background: activeTab === tab ? "#fff" : "transparent", color: activeTab === tab ? "var(--primary)" : "var(--text-secondary)", boxShadow: activeTab === tab ? "var(--shadow-sm)" : "none" }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* TOP CONTRIBUTORS TAB */}
      {activeTab === "contributors" && (
        <div>
          {/* Podium for top 3 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>
            {[TOP_CONTRIBUTORS[1], TOP_CONTRIBUTORS[0], TOP_CONTRIBUTORS[2]].map((c, idx) => {
              const heights = ["100px", "130px", "80px"];
              const order = [2, 1, 3];
              return (
                <div key={c.rank} style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "28px" }}>{c.badge}</span>
                    <img src={c.avatar} alt={c.name} style={{ width: "52px", height: "52px", borderRadius: "50%", border: `3px solid ${idx === 1 ? "#D97706" : idx === 0 ? "#94A3B8" : "#CD7F32"}`, objectFit: "cover" }} />
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)" }}>{c.name.split(" ")[0]}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{c.credits} Credits</div>
                    <div style={{ width: "100%", height: heights[idx], background: idx === 1 ? "linear-gradient(135deg, #FEF3C7, #FDE68A)" : "var(--bg-subtle)", border: `2px solid ${idx === 1 ? "#FDE68A" : "var(--border-light)"}`, borderRadius: "var(--radius-md) var(--radius-md) 0 0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: 800, color: idx === 1 ? "#D97706" : "var(--text-muted)" }}>
                      {order[idx]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full table */}
          <div style={{ background: "#fff", border: "1px solid var(--border-light)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
            {TOP_CONTRIBUTORS.map((c, i) => (
              <div key={c.rank} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "14px 20px", borderBottom: i < TOP_CONTRIBUTORS.length - 1 ? "1px solid var(--border-light)" : "none", transition: "background 0.15s ease" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-subtle)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ width: "28px", textAlign: "center", fontSize: "16px", fontWeight: 800, color: c.rank <= 3 ? "#D97706" : "var(--text-muted)", flexShrink: 0 }}>
                  {c.badge || `#${c.rank}`}
                </div>
                <img src={c.avatar} alt={c.name} style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>{c.name}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span>🏛️ {c.hall}</span>
                    <span>•</span>
                    <span>{c.college}</span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--primary)" }}>{c.credits} Credits</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "3px", justifyContent: "flex-end" }}>
                    <UploadCloud size={11} /> {c.uploads} uploads
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div style={{ marginTop: "20px", background: "linear-gradient(135deg, var(--primary-light), #EFF6FF)", border: "1px solid var(--border-focus)", borderRadius: "var(--radius-lg)", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--primary-dark)" }}>Think you can make the top 10?</div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "2px" }}>Upload pasco and verified notes to earn Tek Credits and climb the ranks</div>
            </div>
            <button onClick={onOpenUpload} style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: "var(--radius-full)", padding: "10px 20px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
              <Star size={14} /> Start Earning
            </button>
          </div>
        </div>
      )}

      {/* HALL RANKINGS TAB */}
      {activeTab === "halls" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "4px" }}>Which hall is dominating academic contributions this semester?</p>
          {HALL_STATS.sort((a, b) => b.uploads - a.uploads).map((hall, i) => (
            <div key={hall.hall} style={{ background: "#fff", border: "1px solid var(--border-light)", borderRadius: "var(--radius-lg)", padding: "16px 20px", boxShadow: "var(--shadow-card)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                <span style={{ fontSize: "24px" }}>{hall.badge}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>
                      {i === 0 && <Medal size={14} color="#D97706" style={{ marginRight: "4px", display: "inline-block", verticalAlign: "middle" }} />}
                      {hall.hall}
                    </span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: hall.color }}>{hall.uploads.toLocaleString()} uploads</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{hall.students} active contributors</div>
                </div>
              </div>
              <div style={{ background: "var(--bg-subtle)", borderRadius: "100px", height: "8px", overflow: "hidden" }}>
                <div style={{ width: `${(hall.uploads / maxUploads) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${hall.color}, ${hall.color}99)`, borderRadius: "100px", transition: "width 0.6s ease" }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* COLLEGE RANKINGS TAB */}
      {activeTab === "colleges" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "4px" }}>Breakdown of study materials by KNUST college</p>
          {COLLEGE_STATS.sort((a, b) => b.docs - a.docs).map((col, i) => (
            <div key={col.short} style={{ background: "#fff", border: "1px solid var(--border-light)", borderRadius: "var(--radius-lg)", padding: "16px 20px", boxShadow: "var(--shadow-card)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${col.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
                  {col.badge}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>
                      {col.short}
                      {i === 0 && <span style={{ marginLeft: "6px", fontSize: "11px", background: "#FEF3C7", color: "#D97706", fontWeight: 700, padding: "1px 6px", borderRadius: "4px" }}>TOP</span>}
                    </span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: col.color }}>{col.docs.toLocaleString()} docs</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{col.name}</div>
                </div>
              </div>
              <div style={{ background: "var(--bg-subtle)", borderRadius: "100px", height: "8px", overflow: "hidden" }}>
                <div style={{ width: `${(col.docs / maxDocs) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${col.color}, ${col.color}88)`, borderRadius: "100px", transition: "width 0.6s ease" }} />
              </div>
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                  <BookOpen size={11} style={{ display: "inline-block", verticalAlign: "middle", marginRight: "3px" }} />
                  {Math.round(col.docs / 12)} avg docs/course
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

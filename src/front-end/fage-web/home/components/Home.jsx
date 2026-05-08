import { motion, AnimatePresence } from "framer-motion";
import { Users, Swords, Settings2 } from "lucide-react";
import { useState, useEffect } from "react";

import GameModeModal from "./GameModeModal";
import MatchingScreen from "./MatchingScreen";
import ModalBackdrop from "./ModalBackdrop";
import NavTabBar from "./NavTabBar";
import Account_Create_And_Login_Fage from "../../account/components/account-create-and-login"
import "../style/index.css";

/* ═══════════════════════════════════════════
   메인 Home 컴포넌트
═══════════════════════════════════════════ */
const Home = () => {
  const [logged_in, set_logged_in] = useState(false);
  // 실제로는 account-create-and-login.jsx의 guest_account_found 상태를 이용

  const [open_UnratedPlayChoiceFage, set_open_UnratedPlayChoiceFage] = useState(false);
  const [open_SettingsFage,          set_open_SettingsFage]          = useState(false);

  // 대기 인원 실시간 플리커
  const [waitingCount, setWaitingCount] = useState(1284);
  useEffect(() => {
    const id = setInterval(() => {
      setWaitingCount((prev) => prev + Math.floor(Math.random() * 11) - 5);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  // Nav 탭
  const [activeTab, setActiveTab] = useState("home");

  // 게임 모드 선택 모달
  const [showModeModal, setShowModeModal] = useState(false);

  // 매칭 중 상태 { mode, time }
  const [matchConfig, setMatchConfig] = useState(null);

  const handleStartMatch = (config) => {
    setShowModeModal(false);
    setMatchConfig(config);
  };

  const handleCancelMatch = () => setMatchConfig(null);

  return (
    <div className="main-container">

      {/* ── 배경 레이어 ── */}
      <div className="bg-grid" />
      <div className="bg-scanlines" />
      <div className="bg-glow bg-glow--top" />
      <div className="bg-glow bg-glow--bottom" />
      <div className="bg-vignette" />

      {/* ── UI 코너 장식 ── */}
      <div className="ui-corner ui-corner--tl" />
      <div className="ui-corner ui-corner--tr" />
      <div className="ui-corner ui-corner--bl" />
      <div className="ui-corner ui-corner--br" />

      {/* ── 메인 콘텐츠 ── */}
      <div className="main-wrapper">

        {/* 로고 */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="logo-block"
        >
          <h1 className="main-logo">CLICK SPEED MASTER</h1>
          <h1 className="main-logo-highlight">[MULTI]</h1>
          <div className="season-badge">
            <span className="season-badge__dot" />
            SEASON 1 · NOW LIVE
          </div>
        </motion.div>

        {/* 계정 생성 또는 로그인 완료 시 */}
        {logged_in ? (
          <div className="logged-in-view">

            <div className="section-label">PLAY MODE</div>

            <motion.div
              className="button-group1"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* UNRATED PLAY */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setShowModeModal(true)}
                className="main-button main-button--active"
              >
                <Users size={20} />
                <span className="main-button-text">UNRATED PLAY</span>
                <span className="waiting-badge">
                  <span className="waiting-badge__dot" />
                  {waitingCount.toLocaleString()}명 대기 중
                </span>
              </motion.button>

              {/* COMPETITIVE PLAY */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => alert("랭크나 티어를 중심인 시스템이므로, 게스트 플레이어는 이용 못하게 한다.")}
                className="main-button main-button--disabled"
                style={{ opacity: 0.3 }}
                disabled
              >
                <Swords size={20} />
                <span className="main-button-text">
                  COMPETITIVE PLAY
                  <span className="coming-soon-tag">Coming Soon</span>
                </span>
              </motion.button>

              {/* CUSTOM PLAY */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => alert("방을 생성하고 무작위로 생성된 방 초대 코드를 이용하여 사용자를 초대하는 방식으로 이용하므로, 게스트 플레이어도 이용가능.")}
                className="main-button main-button--disabled"
                style={{ opacity: 0.3 }}
                disabled
              >
                <Settings2 size={20} />
                <span className="main-button-text">
                  CUSTOM PLAY
                  <span className="coming-soon-tag">Coming Soon</span>
                </span>
              </motion.button>
            </motion.div>

            <div className="section-divider" />
            <div className="section-label">INFORMATION</div>

            {/* 플레이어 칩 */}
            <div className="player-chip" onClick={() => alert("계정 정보 및 프로필 기능")}>
              <div className="player-chip__avatar">J</div>
              <div>
                <div className="player-chip__acccount-type-name-group">
                  <div className="player-chip__name">[Guest]</div>
                  <div className="player-chip__name">jisu1025</div>
                </div>
                <div className="player-chip__meta">
                  <span className="player-chip__rank">♦ 다이아</span>
                  <span className="player-chip__dot" />
                  <span className="player-chip__cps">Average CPS : 12.5</span>
                </div>
              </div>
              <svg className="player-chip__arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <motion.div
              className="information-group"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20, mass: 1, duration: 0.6 }}
            >
              {/* 랭킹 포인트 */}
              <div className="panel-card season-pass-card">
                <div className="panel-card__title">RANKING POINTS</div>
                <div className="season-pass-bar-bg">
                  <div className="season-pass-bar-fill" style={{ width: "42%" }} />
                </div>
                <div className="season-pass-meta">
                  <span>RP. 42 / 100</span>
                  <span>다음 승급까지 58 RP.</span>
                </div>
              </div>
            </motion.div>

            <p className="main-footer">Quickly, Click, To the limit, Reached.</p>
          </div>
        ) : (
          <Account_Create_And_Login_Fage is_logeed_in={() => set_logged_in(!logged_in)} />
        )}
      </div>

      {/* ── 오른쪽 사이드바 (1200px+) ── */}
      {logged_in && (
        <aside className="right-panel">
          <div className="section-label">USER INFORMATION</div>
          <div className="player-chip__desktop-version" onClick={() => alert("계정 정보 및 프로필 기능")}>
            <div className="player-chip__avatar">J</div>
            <div>
              <div className="player-chip__acccount-type-name-group">
                <div className="player-chip__name">[Guest]</div>
                <div className="player-chip__name">jisu1025</div>
              </div>
              <div className="player-chip__meta">
                <span className="player-chip__rank">♦ 다이아</span>
                <span className="player-chip__dot" />
                <span className="player-chip__cps">Average CPS : 12.5</span>
              </div>
            </div>
          </div>

          {/* 서버 상태 */}
          <div className="section-label">SERVER STATUS</div>
          <div className="panel-card">
            <div className="panel-card__title">서버 상태</div>
            <div className="server-list">
              {[
                { name: "서울 (KR)",     ping: "12ms",  pct: 95, ok: true  },
                { name: "도쿄 (JP)",     ping: "28ms",  pct: 78, ok: true  },
                { name: "싱가포르 (SG)", ping: "54ms",  pct: 60, ok: true  },
                { name: "NA 웨스트",     ping: "140ms", pct: 30, ok: false },
              ].map((s) => (
                <div key={s.name} className="server-item">
                  <div className={`server-dot ${s.ok ? "server-dot--ok" : "server-dot--warn"}`} />
                  <span className="server-name">{s.name}</span>
                  <span className="server-ping" style={{ color: s.ok ? "var(--green)" : "var(--amber)" }}>{s.ping}</span>
                  <div className="server-bar-bg">
                    <div className="server-bar-fill" style={{ width: `${s.pct}%`, background: s.ok ? "var(--green)" : "var(--amber)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 최근 게임 기록 */}
          <div className="panel-card">
            <div className="panel-card__title">최근 기록</div>
            <div className="record-list">
              {[
                { icon: "⚔", win: true,  mode: "1 vs 1 · 10s", time: "2분 전",   result: "WIN"  },
                { icon: "⬡", win: false, mode: "2 vs 2 · 30s", time: "1시간 전", result: "LOSE" },
                { icon: "⚔", win: true,  mode: "1 vs 1 · 5s",  time: "3시간 전", result: "WIN"  },
              ].map((r, i) => (
                <div key={i} className="record-item">
                  <div className={`record-icon ${r.win ? "record-icon--win" : "record-icon--lose"}`}>{r.icon}</div>
                  <div className="record-info">
                    <div className="record-mode">{r.mode}</div>
                    <div className="record-time">{r.time}</div>
                  </div>
                  <span className={`record-result ${r.win ? "record-result--win" : "record-result--lose"}`}>{r.result}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 접속자 현황 */}
          <div className="panel-card">
            <div className="panel-card__title">라이브 현황</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "현재 접속자", value: waitingCount.toLocaleString(), color: "var(--cyan)"  },
                { label: "진행 중 매치", value: "642",                         color: "var(--green)" },
                { label: "평균 대기",    value: "00:28",                        color: "var(--amber)" },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: "var(--font-b)" }}>
                  <span style={{ color: "var(--muted)" }}>{label}</span>
                  <span style={{ fontFamily: "var(--font-d)", color, fontSize: 12 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      )}

      {/* ── Nav Tab Bar ── */}
      <AnimatePresence>
        {logged_in && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            style={{ width: "100%", position: "fixed", bottom: 0, zIndex: 50 }}
          >
            <NavTabBar activeTab={activeTab} onTabChange={setActiveTab} />
          </motion.div>
        )}
      </AnimatePresence>

      

      {/* ── 게임 모드 선택 모달 ── */}
      <AnimatePresence>
        {showModeModal && (
          <GameModeModal
            onClose={() => setShowModeModal(false)}
            onStartMatch={handleStartMatch}
          />
        )}
      </AnimatePresence>

      {/* ── 매칭 중 오버레이 ── */}
      <AnimatePresence>
        {matchConfig && (
          <MatchingScreen
            config={matchConfig}
            onCancel={handleCancelMatch}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;

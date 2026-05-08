import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { GAME_MODES, TIME_OPTIONS, MATCH_TIPS } from "./constants";

/* ═══════════════════════════════════════════
   매칭 중 UI
═══════════════════════════════════════════ */
const MatchingScreen = ({ config, onCancel }) => {
  const [elapsed, setElapsed] = useState(0);
  const [tipIdx, setTipIdx] = useState(0);
  const [dots, setDots] = useState(0);
  const [foundOpponent, setFoundOpponent] = useState(false);
  const intervalRef = useRef(null);

  // 경과 시간
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setElapsed((p) => p + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // 팁 순환
  useEffect(() => {
    const id = setInterval(() => {
      setTipIdx((p) => (p + 1) % MATCH_TIPS.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // 점 애니메이션
  useEffect(() => {
    const id = setInterval(() => setDots((p) => (p + 1) % 4), 500);
    return () => clearInterval(id);
  }, []);

  // 데모용: 6초 후 상대 발견 연출
  useEffect(() => {
    const id = setTimeout(() => setFoundOpponent(true), 6000);
    return () => clearTimeout(id);
  }, []);

  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const modeLabel = GAME_MODES.find((m) => m.id === config.mode)?.label;
  const timeLabel = TIME_OPTIONS.find((t) => t.id === config.time)?.label;

  return (
    <motion.div
      className="matching-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 배경 파티클 링 */}
      <div className="matching-rings">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`matching-ring matching-ring--${i}`} />
        ))}
      </div>

      <motion.div
        className="matching-card"
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        {/* 상태 아이콘 */}
        <div className={`matching-icon ${foundOpponent ? "matching-icon--found" : ""}`}>
          <AnimatePresence mode="wait">
            {!foundOpponent ? (
              <motion.div
                key="searching"
                className="matching-spinner"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.4 }}
              />
            ) : (
              <motion.span
                key="found"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="matching-check"
              >✓</motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* 상태 텍스트 */}
        <AnimatePresence mode="wait">
          {!foundOpponent ? (
            <motion.div
              key="txt-searching"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="matching-status"
            >
              상대를 찾는 중{".".repeat(dots)}
            </motion.div>
          ) : (
            <motion.div
              key="txt-found"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="matching-status matching-status--found"
            >
              🎯 상대를 찾았습니다!
            </motion.div>
          )}
        </AnimatePresence>

        {/* 설정 뱃지 */}
        <div className="matching-badges">
          <span className="matching-badge matching-badge--mode">GAME MODE : {modeLabel}</span>
          <span className="matching-badge matching-badge--time">TIME LIMIT : {timeLabel}</span>
        </div>

        {/* VS 슬롯 */}
        <div className="matching-vs-row">
          <div className="matching-player matching-player--me">
            <div className="matching-avatar matching-avatar--me">🦅</div>
            <div className="matching-player-name">Developer.jisu</div>
            <div className="matching-player-tag">[GUEST]</div>
          </div>

          <motion.div
            className="matching-vs"
            animate={
              foundOpponent
                ? { scale: [1, 1.25, 1], color: ["#00c8ff", "#f59e0b", "#00c8ff"] }
                : {}
            }
            transition={{ duration: 0.6 }}
          >
            VS
          </motion.div>

          <div className="matching-player matching-player--opponent">
            <AnimatePresence>
              {foundOpponent ? (
                <motion.div
                  key="opp"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="matching-avatar matching-avatar--opponent">🐺</div>
                  <div className="matching-player-name">NightWolf</div>
                  <div className="matching-player-tag">[RANKED]</div>
                </motion.div>
              ) : (
                <motion.div key="empty" className="matching-avatar-empty">
                  <div className="matching-avatar-pulse" />
                  <span>?</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 경과 시간 */}
        <div className="matching-timer">
          <span className="matching-timer__label">대기 시간</span>
          <span className="matching-timer__value">{fmt(elapsed)}</span>
        </div>

        {/* 팁 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tipIdx}
            className="matching-tip"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            💡 {MATCH_TIPS[tipIdx]}
          </motion.div>
        </AnimatePresence>

        {/* 취소 버튼 */}
        <motion.button
          className="matching-cancel"
          onClick={onCancel}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
        >
          <X size={15} />
          매칭 취소
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default MatchingScreen;

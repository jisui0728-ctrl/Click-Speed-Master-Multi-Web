import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, ChevronRight, Users , Play ,} from "lucide-react";
import { useState } from "react";
import ModalBackdrop from "./ModalBackdrop";
import { GAME_MODES, TIME_OPTIONS } from "./constants";

/* ═══════════════════════════════════════════
   게임 모드 선택 모달
═══════════════════════════════════════════ */
const GameModeModal = ({ onClose, onStartMatch }) => {
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const canStart = selectedMode && selectedTime;

  return (
    <>
      <ModalBackdrop onClick={onClose} />
      <motion.div
        className="mode-modal"
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 24 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        {/* 헤더 */}
        <div className="mode-modal__header">
          <div>
            <div className="mode-modal__title-group">
              <Users></Users>
              <span className="mode-modal__title">UNRATED PLAY</span>
            </div>
            <div className="mode-modal__sub">Choice Game Mode and Time Limit.</div>
          </div>
          <X size={10} className="mode-modal__close" onClick={onClose} />
        </div>

        {/* 게임 모드 선택 */}
        <div className="mode-modal__section-label">
          <Zap size={11} />
          GAME MODE
        </div>
        <div className="mode-grid">
          {GAME_MODES.map((m) => (
            <motion.button
              key={m.id}
              className={`mode-card ${selectedMode === m.id ? "mode-card--selected" : ""}`}
              onClick={() => setSelectedMode(m.id)}
              whileTap={{ scale: 0.94 }}
              whileHover={{ scale: 1.03 }}
            >
              <span className="mode-card__icon">{m.icon}</span>
              <span className="mode-card__label">{m.label}</span>
              {selectedMode === m.id && (
                <motion.div
                  className="mode-card__check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >✓</motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* 시간 선택 */}
        <div className="mode-modal__section-label" style={{ marginTop: 20 }}>
          <Zap size={11} />
          TIME LIMIT
        </div>
        <div className="time-grid">
          {TIME_OPTIONS.map((t) => (
            <motion.button
              key={t.id}
              className={`time-card ${selectedTime === t.id ? "time-card--selected" : ""}`}
              onClick={() => setSelectedTime(t.id)}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.06 }}
            >
              <span className="time-card__label">{t.label}</span>
            </motion.button>
          ))}
        </div>

        {/* 선택 요약 */}
        <AnimatePresence>
          {canStart && (
            <motion.div
              className="mode-summary"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
            >
              <span className="mode-summary__text">
                <span>GAME MODE :</span> {GAME_MODES.find((m) => m.id === selectedMode)?.label}
                &nbsp; · <span>TIME LIMIT :</span>&nbsp;{TIME_OPTIONS.find((t) => t.id === selectedTime)?.label}
              </span>
              <ChevronRight size={14} style={{ opacity: 0.5 }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 매치 시작 버튼 */}
        <motion.button
          className={`match-start-btn ${canStart ? "match-start-btn--ready" : "match-start-btn--disabled"}`}
          disabled={!canStart}
          onClick={() => canStart && onStartMatch({ mode: selectedMode, time: selectedTime })}
          whileTap={canStart ? { scale: 0.96 } : {}}
          whileHover={canStart ? { scale: 1.02 } : {}}
          style={{ marginTop: 16 }}
        >
          {canStart ? (
            <>
              <Play size={18} />
              MATCH START
            </>
          ) : "Select Game Mode and Time Limit."}
        </motion.button>
      </motion.div>
    </>
  );
};

export default GameModeModal;

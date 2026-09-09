import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../style/account-create-and-login.css";

import { create_guest_account_api } from "../../../client/services/create_guest_account_api";

/* ═══════════════════════════════════════════
   소셜 로그인 데이터
═══════════════════════════════════════════ */
const SOCIAL_PROVIDERS = [
  {
    id: "google",
    label: "Continue with Google",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
        <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
      </svg>
    ),
    variant: "google",
  },
  {
    id: "apple",
    label: "Continue with Apple",
    icon: (
      <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor">
        <path d="M13.173 9.558c-.02-2.018 1.647-2.993 1.723-3.042-0.94-1.375-2.4-1.563-2.92-1.583-1.24-.126-2.42.733-3.047.733-.627 0-1.593-.714-2.62-.694-1.347.02-2.587.784-3.28 1.99-1.4 2.427-.36 6.01.998 7.977.665.957 1.46 2.03 2.5 1.99 1.007-.04 1.387-.648 2.604-.648 1.217 0 1.563.648 2.624.628 1.083-.02 1.763-.977 2.42-1.94.768-1.11 1.083-2.194 1.1-2.25-.024-.01-2.098-.805-2.12-3.161zM11.19 3.27c.547-.672.918-1.6.815-2.527-.788.032-1.747.53-2.313 1.19-.503.585-.948 1.53-.83 2.432.883.068 1.783-.449 2.328-1.095z"/>
      </svg>
    ),
    variant: "apple",
  },
  {
    id: "steam",
    label: "Continue with Steam",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
        <path d="M9 0C4.03 0 0 4.03 0 9c0 4.37 3.125 8.01 7.27 8.84l2.64-4.57a2.715 2.715 0 0 1-.91-.315 2.73 2.73 0 0 1-1.368-2.362A2.73 2.73 0 0 1 10.36 7.86a2.73 2.73 0 0 1 2.73 2.73 2.73 2.73 0 0 1-.34 1.318l-2.617 4.53C14.505 15.652 18 12.67 18 9c0-4.97-4.03-9-9-9zM7.01 14.14l-.882.382a2.01 2.01 0 0 0 1.082.318 2.01 2.01 0 0 0 2.01-2.01 2.01 2.01 0 0 0-2.01-2.01 2.01 2.01 0 0 0-1.927 1.44l.864-.374a1.48 1.48 0 0 1 1.063-.45 1.48 1.48 0 0 1 1.48 1.48A1.48 1.48 0 0 1 7.21 14.4a1.48 1.48 0 0 1-.2-.26z"/>
      </svg>
    ),
    variant: "steam",
  },
];

/* ═══════════════════════════════════════════
   파티클 배경 — 캔버스 없이 CSS만
═══════════════════════════════════════════ */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 6,
  dur: Math.random() * 6 + 6,
}));

/* ═══════════════════════════════════════════
   메인 컴포넌트
═══════════════════════════════════════════ */
export default function Login({ onLoginSuccess }) {
  const [view, setView] = useState("main");       // "main" | "nickname" | "loading"
  const [guest_player_name,set_guest_player_name] = useState('');
  const [nicknameError, setNicknameError] = useState("");
  const [loadingProvider, setLoadingProvider] = useState(null);
  const [loadingDots, setLoadingDots] = useState(0);

  /* 로딩 점 애니메이션 */
  useEffect(() => {
    if (view !== "loading") return;
    const id = setInterval(() => setLoadingDots(p => (p + 1) % 4), 480);
    return () => clearInterval(id);
  }, [view]);

  /* 게스트 시작 — 닉네임 입력 화면으로 */
  const handleGuestStart = () => {
    setView("nickname");
    set_guest_player_name("");
    setNicknameError("");
  };

  //front측에서 guest account 생성 api 호출 함수.
  //front-end/services/api 파일에 있는 코드를 여기에 구현하여 통합.

  // Guest Account 생성 API 호출 함수
  const create_guest_account_function = async () => {
    //server측에서 guest account 생성 처리 완료시 guest_account_fount 상태 변경 로직 추가 구현.
    try {
        const result = await create_guest_account_api(guest_player_name);
        console.log(result);
        //서비스 출시 시 계정 존재 여부 확인 api와 연동해서 guest_account_found 상태 변경 처리 구현 필요.
    } catch (error) {
        console.error(error);   
    }
  };
  
  /* 닉네임 확인 */
  const handleNicknameSubmit = () => {
    const trimmed = guest_player_name.trim();

    //추후 닉네임 확인 검사 기능은 서버 백엔드 기능쪽에 이전시킬 예정.
    if (trimmed.length == 0 || trimmed.length > 10) { //닉네임 길이 = 0 or 닉네임 길이 > 10 인 경우
        setNicknameError("Nickname must be 1–10 characters long.");
        return;
    } else if (!/^[\p{L}\p{N}._-]{1,10}$/u.test(trimmed)) { //닉네임 유효성 검사 
        setNicknameError("닉네임에는 한글r, 영어, 숫자, . _ - 만 사용할 수 있습니다.");
        return;
    } else {
      create_guest_account_function(); //Guest Account 생성 API 호출 함수 호출.
    }
    setLoadingProvider("guest");
    setView("loading");
    setTimeout(() => onLoginSuccess?.("guest", trimmed), 2200);
  };

  /* 소셜 로그인 */
  const handleSocial = (provider) => {
    setLoadingProvider(provider.id);
    setView("loading");
    setTimeout(() => onLoginSuccess?.(provider.id, null), 2400);
  };

  return (
    <div className="login-root">
      {/* ── 배경 ── */}
      <div className="login-bg-grid" />
      <div className="login-bg-scanlines" />
      <div className="login-glow login-glow--tl" />
      <div className="login-glow login-glow--br" />
      <div className="login-vignette" />

      {/* 파티클 */}
      {PARTICLES.map(p => (
        <div
          key={p.id}
          className="login-particle"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}

      {/* ── UI 코너 ── */}
      <div className="ui-corner ui-corner--tl" />
      <div className="ui-corner ui-corner--tr" />
      <div className="ui-corner ui-corner--bl" />
      <div className="ui-corner ui-corner--br" />

      {/* ── 메인 카드 ── */}
      <div className="login-center">
        <AnimatePresence mode="wait">

          {/* 메인 화면 */}
          {view === "main" && (
            <motion.div
              key="main"
              className="login-card"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
            >
              {/* 로고 */}
              <div className="login-logo-wrap">
                <motion.div
                  className="login-logo-icon"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                >
                  ⚡
                </motion.div>
                <motion.h1
                  className="login-title"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                >
                  CLICK SPEED MASTER
                  <p className="login-title-accent">[MULTI]</p>
                </motion.h1>
              </div>

              {/* 구분선 */}
              <div className="login-divider">
                <span className="login-divider-text">Get Started</span>
              </div>

              {/* ── 게스트 버튼 (메인 CTA) ── */}
              <motion.button
                className="login-btn login-btn--guest"
                onClick={handleGuestStart}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="login-btn__icon">
                  {/* 게스트 아이콘 */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <span className="login-btn__content">
                  <span className="login-btn__label">Continue as Guest</span>
                  <span className="login-btn__sub">Play without logging in</span>
                </span>
                <span className="login-btn__arrow">→</span>
              </motion.button>

              {/* ── 소셜 구분선 ── */}
              <motion.div
                className="login-social-divider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="login-social-divider__line" />
                <span className="login-social-divider__text">or connect with social account</span>
                <div className="login-social-divider__line" />
              </motion.div>

              {/* ── 소셜 버튼들 ── */}
              <div className="login-social-grid">
                {SOCIAL_PROVIDERS.map((p, i) => (
                  <motion.button
                    key={p.id}
                    className={`login-btn login-btn--social login-btn--${p.variant}`}
                    onClick={() => handleSocial(p)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + i * 0.06 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="login-btn__icon">{p.icon}</span>
                    <span className="login-btn__label">{p.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* 안내 텍스트 */}
              <motion.p
                className="login-notice"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.62 }}
              >
                Social integration will permanently save your rankings and records.
                <br />
                Guest accounts are only saved on this device.
              </motion.p>
            </motion.div>
          )}

          {/* 닉네임 입력 화면 */}
          {view === "nickname" && (
            <motion.div
              key="nickname"
              className="login-card"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              {/* 뒤로 */}
              <button className="login-back" onClick={() => setView("main")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                BACK
              </button>

              <div className="login-logo-wrap" style={{ marginBottom: 20 }}>
                <div className="login-logo-icon" style={{ fontSize: 32 }}>🎮</div>
                <h2 className="login-title" style={{ fontSize: "clamp(18px,3vw,26px)" }}>
                  Please set Nickname.
                </h2>
                <p className="login-subtitle">Enter a nickname to use for guest play.</p>
              </div>

              <div className="login-input-wrap">
                <input
                  className={`login-input ${nicknameError ? "login-input--error" : ""}`}
                  type="text"
                  placeholder="Enter nickname (1-10 characters)"
                  value={guest_player_name}
                  maxLength={10}
                  onChange={e => { set_guest_player_name(e.target.value); setNicknameError(""); }}
                  onKeyDown={e => e.key === "Enter" && handleNicknameSubmit()}
                  autoFocus
                />
                <span className="login-input-count">{guest_player_name.length}/10</span>
              </div>

              <AnimatePresence>
                {nicknameError && (
                  <motion.p
                    className="login-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    ⚠ {nicknameError}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                className={`login-btn login-btn--guest ${guest_player_name.trim().length < 1 ? "login-btn--muted" : ""}`}
                style={{ marginTop: 8 }}
                onClick={() => handleNicknameSubmit()}
                whileHover={guest_player_name.trim().length >= 1 ? { scale: 1.02 } : {}}
                whileTap={guest_player_name.trim().length >= 1 ? { scale: 0.97 } : {}}
              >
                <span className="login-btn__label">Play as Guest</span>
                <span className="login-btn__arrow">→</span>
              </motion.button>

              <p className="login-notice" style={{ marginTop: 14 }}>
                You can change your nickname later in Settings.
              </p>
            </motion.div>
          )}

          {/* 로딩 화면 */}
          {view === "loading" && (
            <motion.div
              key="loading"
              className="login-loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
            >
              {/* 링 애니메이션 */}
              <div className="login-loading-rings">
                {[0,1,2].map(i => (
                  <div key={i} className={`login-loading-ring login-loading-ring--${i}`} />
                ))}
              </div>

              {/* 스피너 */}
              <div className="login-spinner-wrap">
                <div className="login-spinner" />
                <div className="login-spinner-icon">⚡</div>
              </div>

              <p className="login-loading-text">
                {loadingProvider === "guest"
                  ? `Creating guest account${".".repeat(loadingDots)}`
                  : loadingProvider === "google"
                  ? `Connecting to Google account${".".repeat(loadingDots)}`
                  : loadingProvider === "apple"
                  ? `Connecting to Apple account${".".repeat(loadingDots)}`
                  : loadingProvider === "steam"
                  ? `Connecting to Steam account${".".repeat(loadingDots)}`
                  : `Connecting...${".".repeat(loadingDots)}`}
              </p>
              <p className="login-loading-sub">Please wait a moment</p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
/* ═══════════════════════════════════════════
   상수 데이터
═══════════════════════════════════════════ */

export const GAME_MODES = [
  { id: "1v1", label: "1 vs 1", icon: "⚔", desc: "1:1 정면승부" },
  { id: "2v2", label: "2 vs 2", icon: "⬡", desc: "팀 협력전" },
  { id: "3v3", label: "3 vs 3", icon: "◈", desc: "팀배틀" },
  { id: "4v4", label: "4 vs 4", icon: "✦", desc: "대규모전" },
];

export const TIME_OPTIONS = [
  { id: "1s",  label: "1s",  desc: "극한" },
  { id: "5s",  label: "5s",  desc: "빠름" },
  { id: "10s", label: "10s", desc: "표준" },
  { id: "30s", label: "30s", desc: "여유" },
  { id: "60s", label: "60s", desc: "지구력" },
];

export const NAV_TABS = [
  { id: "home",     icon: "HomeIcon",  label: "HOME" },
  { id: "ranking",  icon: "Trophy",    label: "RANKING" },
  { id: "records",  icon: "History",   label: "RECORDS" },
  { id: "settings", icon: "Settings",  label: "SETTINGS" },
];

export const MATCH_TIPS = [
  "클릭 속도를 높이려면 손목이 아닌 손가락을 사용하세요.",
  "리듬을 타면 CPS가 올라갑니다.",
  "긴장하지 말고 자연스럽게 클릭하세요.",
  "상대가 빠를수록 더 집중하세요!",
  "매칭은 실력이 비슷한 플레이어와 이루어집니다.",
  "저는 한국에 살고 있는 개발자 입니다.",
  "이 게임의 이전 버전은 구글플레이에 있습니다.",
  "이 게임은 react로 개발했습니다.",
];

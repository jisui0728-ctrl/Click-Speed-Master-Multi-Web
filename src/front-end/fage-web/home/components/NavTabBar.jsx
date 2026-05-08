import { motion } from "framer-motion";
import { Home as HomeIcon, Trophy, History, Settings } from "lucide-react";
import { NAV_TABS } from "./constants";

/* ── 아이콘 맵: constants의 문자열 id → 실제 컴포넌트 ── */
const ICON_MAP = { HomeIcon, Trophy, History, Settings };

/* ═══════════════════════════════════════════
   Nav Tab Bar
═══════════════════════════════════════════ */
const TAB_COLORS = {
  ranking:  { default: "rgba(245,158,11,0.6)", active: "#f59e0b" },
  records:  { default: "rgba(16,185,129,0.6)", active: "#10b981" },
  settings: { default: "rgba(139,92,246,0.6)", active: "#8b5cf6" },
};

const NavTabBar = ({ activeTab, onTabChange }) => (
  <nav className="nav-tabbar">
    {NAV_TABS.map((tab) => {
      const Icon = ICON_MAP[tab.icon];
      const isActive = activeTab === tab.id;
      const colorSet = TAB_COLORS[tab.id];

      const defaultStyle = colorSet ? { color: colorSet.default, transition: "color 0.2s" } : {};
      const activeStyle  = isActive  ? { color: "#00c8ff" } : defaultStyle;
      const hoverStyle   = colorSet  ? { color: colorSet.active } : {};

      return (
        <motion.button
          key={tab.id}
          className={`nav-tab ${isActive ? "nav-tab--active" : ""}`}
          onClick={() => onTabChange(tab.id)}
          style={activeStyle}
          whileTap={{ scale: 0.88 }}
          whileHover={hoverStyle}
        >
          <div className="nav-tab__icon-wrap">
            <Icon size={20} />
          </div>
          <span className="nav-tab__label">{tab.label}</span>
        </motion.button>
      );
    })}
  </nav>
);

export default NavTabBar;

import { motion } from "framer-motion";

/* ═══════════════════════════════════════════
   모달 오버레이 배경
═══════════════════════════════════════════ */
const ModalBackdrop = ({ onClick }) => (
  <motion.div
    className="modal-backdrop"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClick}
  />
);

export default ModalBackdrop;

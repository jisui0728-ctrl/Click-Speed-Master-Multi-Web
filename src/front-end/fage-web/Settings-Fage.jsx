import { motion, AnimatePresence, } from "framer-motion";
import { Settings, LogOut, UserX, X, User } from "lucide-react";
import './Settings-Fage.css';

const Settings_Fage = ({Settings_Fage_Closed}) => {
    return (
        <>
            <div className="settings-fage-popup-background"></div>
            <motion.div
                className="settings-fage-popup"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
            >
                <div className="section">
                    <div className="settings-main-title-group">
                        <Settings></Settings>
                        <span className="settings-main-title">SETTINGS</span>
                    </div>
                </div>
                
                <div className="section">
                    <X className="settings-fage-popup-exit" onClick={Settings_Fage_Closed}></X>
                    
                    <div className="section-title-group1">
                        <User></User>
                        <span className="settings-section-title">ACCOUNT</span>
                    </div>
                    
                    <div className="log-out-delete-account-button-group">
                        {/**confirm UI는 일단 백엔드 기능 구현 완료 시 까지 브라우저 window.confirm으로 대체. */}
                        
                        <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                        className="log-out-button"
                        onClick={() => window.confirm('Do you want to log out?')}
                        >
                            <LogOut size={22}></LogOut>
                            <span className="log-out-delete-account-button-text">LOG OUT</span>
                        </motion.button>

                        <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                        className="log-out-button"
                        onClick={() => window.confirm('Delete your account? (This action cannot be undone.)')}
                        >
                            <UserX size={22}></UserX>
                            <span className="log-out-delete-account-button-text">DELETE ACCOUNT</span>
                        </motion.button>

                    {/**구글/애플/스팀 등 로그인 API를 활용한 계정 연동 기능 생성 시 버튼 추가. */}
                    </div>
                </div>
            </motion.div>
        </>
    )
};

export default Settings_Fage;
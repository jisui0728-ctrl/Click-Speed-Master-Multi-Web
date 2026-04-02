import { motion, } from "framer-motion";
import { User , } from "lucide-react";
import { useState } from "react";
import './account-create-and-login.css'

const Account_Create_And_Login_Fage = ({is_logeed_in}) => {
    // const [player_account_type,set_player_account_type] = useState(null);
    // --> 나중에 구글,애플 등 로그인 api 도입 시 활용 
    
    const [create_guest_account_fage,set_create_guest_account_fage] = useState(false);
    const [home_jsx_fage,set_home_jsx_fage] = useState(false);
    const [checking_guest_account_fage, set_checking_guest_account_fage] = useState(false);
    
    const [account_play_button_group,set_account_play_button_group] = useState(true);
    
    //처음 접속시나 재접속 하는 동안(해당 기기의 게스트 계정 존재 여부 확인)의 기본값
    //테스트 하기 위해 임의로 값 변경 가능 (실제 이용시 기본값은 null로 할당)
    const [guest_account_found,set_guest_account_found] = useState(true)

    const get_guest_account_found = () => {  
        if (guest_account_found === true) {
            return '[An account already exists]';
        } else if (guest_account_found === null) {
            return '[Checking account...]';
        } else {
            return '[No account found]';
        }
    };
    
    return (
        <div>
            {/**현재 지금은 guest 계정으로만 로그인,회원가입 할 수 있게 출시한다. */}
            
            {/**새로운 Guest 계정 생성(guest 계정 플레이 -> 기존 guest 계정 존재 확인 함수 -> no 일때) [자세한건 chatgpt 카톡 링크 확인]
             * --> yes 일때 기존 guest account로 자동 로그인 되고 게임 플레이 할 수 있는 버튼 페이지가 생김(home.jsx에서 상태 관리)
            */}
                
                {account_play_button_group && (
                    <div>
                        <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="main-button-group"
                        >
                            <motion.button
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.02 }}
                            className="main-button"
                            onClick={() => {
                                if (guest_account_found === true) {
                                    set_home_jsx_fage(true);
                                    is_logeed_in();
                                } else if (guest_account_found === null) {
                                    set_checking_guest_account_fage(true);
                                } else {
                                    set_create_guest_account_fage(true);
                                };
                                set_account_play_button_group(false);
                            }}
                            >
                                <User></User>
                                <span className="main-button-text">GUEST PLAY {
                                    //guest_account_found === null 이면 계정을 찾고 있는 중 이므로 이때는 [Checking account...] 을 반환 한다.
                                   get_guest_account_found()
                                }
                                </span>
                            </motion.button>
                            <motion.button
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.02 }}
                            disabled={true}
                            className="main-button"
                            >
                                <span className="main-button-text">example1</span>
                            </motion.button>
                            <motion.button
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.02 }}
                            disabled={true}
                            className="main-button"
                            >
                                <span className="main-button-text">example2</span>
                            </motion.button>
                            
                        </motion.div>
                    </div>
                )}
                
                {guest_account_found === true && home_jsx_fage === true && <h1>Hello,Home!</h1>}
                {guest_account_found === null && checking_guest_account_fage === true && (
                    <motion.div 
                    className="checking-account-animation-container"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <motion.div
                        className="checking-account-animation"
                        animate={{ rotate: 360 }}
                        transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                        }}
                        />
                        <span className="checking-account-text">Checking Account...</span>
                    </motion.div>
                )
                }
                {guest_account_found === false && create_guest_account_fage === true && <Create_Guest_Account_Fage></Create_Guest_Account_Fage>}                  
        </div>
    )
};

const Create_Guest_Account_Fage = () => {
    const [guest_player_name,set_guest_player_name] = useState('');
    const create_guest_account_button = guest_player_name.length > 0;
  
    return (
        <div>
            <motion.h3
            className="guest-account-section-title"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            >
                <User></User>
                Guest Account
            </motion.h3>       
    
            <motion.div 
            className="guest-player-name-input-container"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            >
                <input type="text" className="guest-player-name-input" id="guestPlayerNameInputLabel" value={guest_player_name} onChange={(e) => set_guest_player_name(e.target.value)} required/>
                <label className="guest-player-name-input-label" htmlFor="guestPlayerNameInputLabel">Enter nickname. (Play to create guest account.)</label>
                <span className="guest-player-name-input-span"></span>
            </motion.div>

            <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            >
                <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                disabled={!create_guest_account_button}
                className="main-button"
                >
                    <span className="main-button-text">CREATE GUEST ACCOUNT</span>  
                </motion.button>
            </motion.div>
        </div>
    )
};

export default Account_Create_And_Login_Fage;
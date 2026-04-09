import { motion, AnimatePresence, scale, DeprecatedLayoutGroupContext, } from "framer-motion";
import { Play , Timer , Gamepad , Gamepad2 , X , Users , Settings , ForkKnifeCrossed } from "lucide-react";
import './UnratedPlay-ChoiceFage.css';
import { useState } from "react";
import {ClipLoader} from "react-spinners";

const UnratedPlay_ChoiceFage = ({isClose}) => {
    const [selectedMode_gamebtn, setSelectedMode_gamebtn] = useState(null);
    const [selectedMode_timebtn, setSelectedMode_timebtn] = useState(null);
    
    const [btn_is_match_start,set_btn_is_match_start] = useState(false);

    const unratedplay_choicefage_popup_exit_element = document.getElementById("UnratedPlay-ChoiceFage-popup-exit") //exit button    
    
    const unratedplay_choicefage_popup_section_title_group1_element = document.getElementById("section-title-group1"); //Game Mode title
    const unratedplay_choicefage_popup_section_title_group2_element = document.getElementById("section-title-group2"); //time title
    
    const unratedplay_choicefage_popup_game_setting_container_element = document.getElementById("game-setting-container"); //game-setting-container
    const unratedplay_choicefage_popup_game_setting_button_group_element = document.getElementById("button-group"); //mode,time button group
    
    //btn_is_match === true,false 일때 팝업 창 안에서 움직이는 animation을 다루는 함수.
    const unratedplay_choicefage_popup_animation = () => {
        unratedplay_choicefage_popup_exit_element.classList.toggle("UnratedPlay-ChoiceFage-popup-exit-fade-animation"); //exit 버튼 fade-in-out 효과
       
        unratedplay_choicefage_popup_section_title_group1_element.classList.toggle("section-title-group1-animation");
        unratedplay_choicefage_popup_section_title_group2_element.classList.toggle("section-title-group2-animation");
        
        //unratedplay_choicefage_popup_game_setting_container_element.classList.toggle("game-setting-container-animation") //colum -> row
    }

    return (
        <>
            <div className="UnratedPlay-ChoiceFage-popup-background"></div>
            <motion.div
            className="UnratedPlay-ChoiceFage-popup"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            >
                <div className="section">
                    <X 
                    id="UnratedPlay-ChoiceFage-popup-exit"
                    className="UnratedPlay-ChoiceFage-popup-exit" 
                    onClick={isClose} 
                    />
                    <div className="section-main-title-group">
                        <Users></Users>
                        <span className="unratedplay-choice-fage-main-title">UNRATED PLAY</span>
                    </div>
                </div>

                <div id="game-setting-container" className="game-setting-container">
                    {/**추후 더 재미있고 흥미로운 매칭 ui로 개선. 
                     * --> 매칭 ui 컴포넌트 상태 관리 리펙토링 필요...
                    */}
                    {btn_is_match_start === true && (
                        <motion.div 
                        className="match-making-container"
                        initial={{ y: 50, scale: 0.7 , opacity: 0 }}   // 시작 위치: 아래 + 투명
                        animate={{ y: 0, scale: 1 , opacity: 1 }}    // 최종 위치: 원래 자리 + 불투명
                        exit={{ y: 50, scale: 0.9 , opacity: 0 }}      // 사라질 때: 다시 아래로
                        transition={{ 
                            type: "spring",                // 스프링 느낌
                            stiffness: 120,                // 튕기는 정도
                            damping: 20,                   // 감쇠
                            mass: 1,
                            duration: 0.6                  // 옵션: 고정 시간도 가능
                        }}
                        >
                            <span className="match-making-spinners"></span>
                            <div className="match-making-text-container">
                                <span className="match-making-text">⚡</span>
                                <span className="match-making-text">MATCH MAKING...</span>
                            </div>
                        </motion.div>
                    )}
                     
                    <div className="section">  
                        <div id="section-title-group1" className="section-title-group1">
                            <Gamepad></Gamepad>
                            <span className="unratedplay-choice-fage-section-title">{btn_is_match_start === true ? "GAME MODE :" : "GAME MODE"}</span>
                            {btn_is_match_start === true && <span className="unratedplay-choice-fage-selected-section-title">{selectedMode_gamebtn}</span>}
                        </div>
                        
                        <div id="button-group" className="button-group">
                        {["1vs1", "2vs2"].map((mode) => (
                            <motion.button
                            key={mode}
                            className={selectedMode_gamebtn === mode ? "mode-choice-button-selected" : "mode-choice-button"}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedMode_gamebtn(mode)}
                            disabled={btn_is_match_start === true ? true : false}
                            >
                                {mode}
                            </motion.button>
                        ))}
                        </div>
                    </div>

                    <div className="section">
                        <div id="section-title-group2" className="section-title-group2">
                            <Timer></Timer>
                            <span className="unratedplay-choice-fage-section-title">{btn_is_match_start === true ? "TIME :" : "TIME"}</span>
                            {btn_is_match_start === true && <span className="unratedplay-choice-fage-selected-section-title">{selectedMode_timebtn}</span>}
                        </div>

                        <div id="button-group" className="button-group">
                        {["1s", "5s", "10s", "30s", "60s"].map((time) => (
                            <motion.button
                            key={time}
                            className={selectedMode_timebtn === time ? "time-choice-button-selected" : "time-choice-button"}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedMode_timebtn(time)}
                            disabled={btn_is_match_start === true ? true : false}
                            >
                            {time}
                            </motion.button> 
                        ))}
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    <motion.button
                        className={selectedMode_gamebtn !== null && selectedMode_timebtn !== null ? (btn_is_match_start === false ? "match-start-button" : "cancel-match-button") : "match-start-button" }
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        style={{
                            opacity: selectedMode_gamebtn !== null && selectedMode_timebtn !== null ? "1" : "0.3",
                            pointerEvents: selectedMode_gamebtn !== null && selectedMode_timebtn !== null ? 'auto' : 'none',
                        }}
                        onClick={() => {
                            set_btn_is_match_start(!btn_is_match_start);
                            unratedplay_choicefage_popup_animation();
                        }}
                        >
                            {btn_is_match_start === false ? (
                                <>
                                    <Play></Play>
                                    MATCH START
                                </> 
                            ) : (
                                <>
                                    <X></X>
                                    CANCEL MATCH
                                </>
                            )}
                        </motion.button>
                </AnimatePresence>
            </motion.div>   
        </> 
)};

export default UnratedPlay_ChoiceFage;
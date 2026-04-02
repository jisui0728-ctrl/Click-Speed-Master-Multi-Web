import { motion, AnimatePresence } from "framer-motion";
import { Users, Trophy, Settings, Settings2,History,  Swords, LogOut, UserX, } from "lucide-react";
import UnratedPlay_ChoiceFage from "./UnratedPlay-ChoiceFage";
import Settings_Fage from "./Settings-Fage";
import Account_Create_And_Login_Fage from "./account-create-and-login";
import "./Home.css";
import { useState } from "react";
import LiveIsland from "react-live-island";

const Home = () => {
  const [create_guest_account,set_create_guest_account] = useState(null);
  const [create_linked_account,set_create_user_account] = useState(null);
  const [logged_in,set_logged_in] = useState(false);
  
  const [open_UnratedPlayChoiceFage,set_open_UnratedPlayChoiceFage] = useState(false);
  const [open_SettingsFage,set_open_SettingsFage] = useState(false);

  return (
    <div className="main-container">
      <div className="main-wrapper">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="main-logo"
        >
          CLICK SPEED MASTER
        </motion.h1>
        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="main-logo-highlight"
        >
          [MULTI]
        </motion.h1>

        {/**처음 접속 했을때 플레이 버튼과 ranking,reacords 등 안보이게 하고 닉네임 입력칸에 입력 후 
         * 생성 버튼을 눌러 게스트 계정이나 구글/애플/스팀 계정으로 회원가입 할 경우에 버튼이 보이게 하기.
         * -->회원가입 되면, 기존의 가입 창 (구글/애플/스팀 버튼,닉네임 입력칸,게스트 생성 버튼 등)이 안 보이고 플레이
         * -->닉네임 입력칸에 기재 후 플레이 버튼을 클릭했을때 게스트 계정으로 생성되고 플레이 할 건지 묻는 알람 창(yes/no)으로 로직 구현.
         * --> 게스트 계정은 기기의 고유 로컬 저장 방식을 사용하므로 기기에서 이전에 게스트 계정을 생성했으면 재접속 할때도 영원히 그 계정으로 접속되어 있게 하고, 닉네임 입력 칸은 영원히 안보이게 한다.
         * --> 게스트 계정은 본인이 스스로 로그아웃 하지 않는 이상 계정이 소멸되지 않으므로 위와 같은 기능을 구현한다.
        */}

        {/** 계정 생성 또는 로그인 완료 시 작동 */}
        
        {logged_in === true ? (
          <div>
              {/** 로그 아웃 되면 같이 사라지게 한다. */}

              <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="player-account-information"
              >
                <div className="player-user-name-group">
                  <span className="player-account-type">[GUEST]</span>
                  <span className="hello-username">Developer.jisu</span>
                </div>
              </motion.div>

              <motion.div 
              className="button-group1"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              > 
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    //alert('쪼끔만한 창에 시간 선택 버튼 하고 인원수(1vs1,2vs2,...등) 버튼, 그리고 매치 시작 버튼이 있는 창.');
                    set_open_UnratedPlayChoiceFage(!open_UnratedPlayChoiceFage);
                  }}
                  className="main-button"
                >
                  <Users></Users>
                  <span className="main-button-text">UNRATED PLAY</span>
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    alert('랭크나 티어를 중심인 시스템이므로, 게스트 플레이어는 이용 못하게 한다.');
                    //근데 게임 모드는 선택이고 시간은 랜덤으로 매칭되는 시스템이면 나쁘지 않을것 같음.
                  }}
                  className="main-button"
                  style={{opacity:0.3}} //출시되기 전 이나, 출시 되면 disabled는 안한 상태에서 게스트 플레이어만 보기에 한다.
                  disabled={true} //출시 되면 해당 코드 삭제.
                >
                  <Swords></Swords>
                  <span className="main-button-text">COMPETITIVE PLAY (Comming Soon..)</span>
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {alert('방을 생성하고 무작위로 생성된 방 초대 코드를 이용하여 사용자를 초대하는 방식으로 이용하므로, 게스트 플레이어도 이용가능.')}}
                  className="main-button"
                  style={{opacity:0.3}} //출시되기 전 이나, 출시 되면 disabled는 안한 상태에서 게스트 플레이어만 보기에 한다.
                  disabled={true} //출시 되면 해당 코드 삭제.
                >
                  <Settings2></Settings2>
                  <span className="main-button-text">CUSTOM PLAY (Comming Soon..)</span> 
                </motion.button>
              </motion.div>

              <motion.div 
              className="button-group2"
              initial={{ y: 50, opacity: 0 }}   // 시작 위치: 아래 + 투명
              animate={{ y: 0, opacity: 1 }}    // 최종 위치: 원래 자리 + 불투명
              exit={{ y: 50, opacity: 0 }}      // 사라질 때: 다시 아래로
              transition={{ 
                type: "spring",                // 스프링 느낌
                stiffness: 120,                // 튕기는 정도
                damping: 20,                   // 감쇠
                mass: 1,
                duration: 0.6                  // 옵션: 고정 시간도 가능
              }}
              >
                <div className="ranking-records-button-group">
                  <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {alert('연동 계정 플레이어만 이용 가능.(게스트 불가)')}}
                  className="main-button"
                  >
                    <Trophy size={20}></Trophy>
                    <span className="r-r-s-button-text">RANKING</span>
                  </motion.button>
                
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {alert('게스트는 기기별 영구 로컬 저장 방식으로 이용하고, 연동 계정 플레이어는 서버를 이용하여 db에 계정별 영구 저장 방식으로 이용한다.')}}
                    className="main-button"
                  >
                    <History size={20}></History>
                    <span className="r-r-s-button-text">RECORDS</span>
                  </motion.button>

                  <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  className="main-button"
                  onClick={() => set_open_SettingsFage(!open_SettingsFage)}
                  >
                    <Settings size={20}></Settings>
                    <span className="r-r-s-button-text">SETTINGS</span>
                  </motion.button> 
                </div>
              </motion.div>
              
              <p className="main-footer">Quickly, Click, To the limit, Reached.</p> 
               {/**여기에서 조금만한 창이 페이지위에 나타나도록 구현. */}
          </div>
        ) : <Account_Create_And_Login_Fage is_logeed_in={() => set_logged_in(!logged_in)} /> /*--> 게스트,연동 계정 생성 페이지*/ }
      </div>
      
      <AnimatePresence>
        {open_UnratedPlayChoiceFage && <UnratedPlay_ChoiceFage isClose={() => set_open_UnratedPlayChoiceFage(!open_UnratedPlayChoiceFage)}></UnratedPlay_ChoiceFage>}
        {open_SettingsFage && <Settings_Fage Settings_Fage_Closed={() => set_open_SettingsFage(!open_SettingsFage)}></Settings_Fage>}
      </AnimatePresence>
  </div>
);
};

export default Home;
import create_account_client  from "../client";

//create guest account api
export const create_guest_account_api = async (guest_player_name) => { 
    const response = await create_account_client.post("/api/create_guest_account", {
        guest_name: guest_player_name,
    });

    return response.data;
}

//추후 guest account 생성 뿐만 아니라, 삭제, 수정 등 api 추가.
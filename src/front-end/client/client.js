import axios from "axios";

//공통 client에서 데이터를 get,post,fatch,delete 등 api 호출 하는데 사용하는 client.
const create_account_client = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    timeout: 5000,
});

export default create_account_client;
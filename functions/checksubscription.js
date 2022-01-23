import { customRequest } from "./request";

async function checkSubscription(){
    return customRequest('checksubscription').then((res)=>{
        return res;
    })
}

export {checkSubscription};
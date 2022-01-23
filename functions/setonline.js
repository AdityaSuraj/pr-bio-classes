import * as SecureStore from 'expo-secure-store';
import { rootlink } from '../constants/link';

async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    return result;
}

function setMeOnline(){
    getValueFor('studentdetail').then((detail)=>{
        let studet = JSON.parse(detail);
        fetch(`${rootlink}/setonline`,{method:"post"
            ,body:JSON.stringify({"user_id":studet['id']}),
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then((res)=>{
            // console.log(res);
        })
    })
}

function setMeOffline(){
    getValueFor('studentdetail').then((detail)=>{
        let studet = JSON.parse(detail);
        fetch(`${rootlink}/setoffline`,{method:"post"
            ,body:JSON.stringify({"user_id":studet['id']}),
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then((res)=>{})
    })
}

export {setMeOffline,setMeOnline};
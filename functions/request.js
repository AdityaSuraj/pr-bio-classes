import { rootlink, instituteRootlink } from "../constants/link";
import {getValueFromStorage, saveInStorage} from "./securestorage";
import * as SecureStore from 'expo-secure-store';

async function getToken(key) {
    let result = await SecureStore.getItemAsync(key);
    return result;
}

async function customRequest(route,body){
    var token = await getToken('studenttoken');

    return fetch(`${rootlink}/${route}`,{
        method:"POST",
        body:JSON.stringify(body),
        headers:{
            'Authorization':'Bearer ' + token,
            'Accept':'application/json',
            'Content-Type': 'application/json',
        }
    }).then(response =>  response.json())
    .then((json)=>{
        return json;
    })
    
}

async function customRequestMultipart(route,body){
    var token = await getToken('studenttoken');
    
    return fetch(`${rootlink}/${route}`,{
        method:"POST",
        body:body,
        headers:{
            'Authorization':'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(response =>  response.json())
    .then((json)=>{
        return json;
    })
}


async function instituteCustomRequest(route,body){
    var token = await getToken('token');
    
    return fetch(`${instituteRootlink}/${route}`,{
        method:"POST",
        body:JSON.stringify(body),
        headers:{
            'Authorization':'Bearer ' + token,
            'Accept':'application/json',
            'Content-Type': 'application/json',
        }
    }).then(response =>  response.json())
    .then((json)=>{
        return json;
    })
    
}


async function insituteCustomRequestMultipart(route,body){
    var token = await getToken('token');

    return fetch(`${instituteRootlink}/${route}`,{
        method:"POST",
        body:body,
        headers:{
            'Authorization':'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(response =>  response.json())
    .then((json)=>{
        return json;
    })
}

export {customRequest,customRequestMultipart,insituteCustomRequestMultipart,instituteCustomRequest};
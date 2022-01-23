import * as SecureStore from 'expo-secure-store';

async function saveInStorage(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
async function getValueFromStorage(key) {
    let result = await SecureStore.getItemAsync(key);
    return JSON.parse(result);
}

async function getPlainValueFromStorage(key) {
    let result = await SecureStore.getItemAsync(key);
    return result;
}

async function deleteFromStorage(key) {
    let result = await SecureStore.deleteItemAsync(key);
}


export {saveInStorage,getValueFromStorage,deleteFromStorage,getPlainValueFromStorage};
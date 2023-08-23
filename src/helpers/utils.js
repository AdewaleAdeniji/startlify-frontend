
import CryptoJS from "crypto-js";
import { getUser } from "../services/api";

export function filterAlphanumeric(inputString) {
  const filteredString = inputString.replace(/[^a-zA-Z0-9]/g, "");
  return filteredString;
}


export const useCache = () => {
    const user = getUser();
  const encrypt = (dataKey, data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), dataKey+user?.userID).toString();
  };

  const decrypt = (dataKey, encryptedData) => {
    try {
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, dataKey+ user?.userID);
      return JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error("Error decrypting data:", error);
      return null;
    }
  };

  const getData = (dataKey, defaultData) => {
    const encryptedData = localStorage.getItem(dataKey);

    if (!encryptedData) {
      return defaultData;
    }

    const decryptedData = decrypt(dataKey, encryptedData);
    return decryptedData !== null ? decryptedData : defaultData;
  };

  const saveData = (dataKey, data) => {
    const encryptedData = encrypt(dataKey, data);
    localStorage.setItem(dataKey, encryptedData);
  };

  return {
    getData,
    saveData,
  };
};

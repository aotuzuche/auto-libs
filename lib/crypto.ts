import CryptoJS from 'crypto-js';

// 解密方法(ECB)
const Decrypt = (data: any, key: string) => {
  if (isEmpty(data)) {
    return '';
  }
  const decrypt = CryptoJS.AES.decrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr;
};

// 加密方法(ECB)
const Encrypt = (data: any, key: string) => {
  if (isEmpty(data)) {
    return '';
  }
  const cip = CryptoJS.enc.Utf8.parse(typeof data === 'object' ? JSON.stringify(data) : data);
  const encrypted = CryptoJS.AES.encrypt(cip, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  const encryptedStr = encrypted.toString();
  return encryptedStr;
};

// 判空
const isEmpty = (data: any) => {
  const isEmpty = data === '' || data === null || typeof data === 'undefined';
  return isEmpty;
};

export { Decrypt, Encrypt };

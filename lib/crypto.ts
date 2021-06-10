import CryptoJS from 'crypto-js';

// 加密方法
const Encrypt = {
  AES(data: any, key: string): string {
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
  },
};

// 解密方法
const Decrypt = {
  AES(data: any, key: string): string {
    if (isEmpty(data)) {
      return '';
    }
    const decrypt = CryptoJS.AES.decrypt(data, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr;
  },
};

// 判空
const isEmpty = (data: any) => {
  const isEmpty = data === '' || data === null || typeof data === 'undefined';
  return isEmpty;
};

export { Encrypt, Decrypt };

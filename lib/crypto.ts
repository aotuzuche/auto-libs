import CryptoJSAes from 'crypto-js/aes';
import CryptoJSEncUtf8 from 'crypto-js/enc-utf8';
import CryptoJSModeEcb from 'crypto-js/mode-ecb';
import CryptoJSPadPkcs7 from 'crypto-js/pad-pkcs7';
// @ts-ignore

// 加密方法
const Encrypt = {
  AES(data: any, key: string): string {
    if (isEmpty(data)) {
      return '';
    }
    const cip = CryptoJSEncUtf8.parse(typeof data === 'object' ? JSON.stringify(data) : data);
    const encrypted = CryptoJSAes.encrypt(cip, CryptoJSEncUtf8.parse(key), {
      mode: CryptoJSModeEcb,
      padding: CryptoJSPadPkcs7,
    });
    return encrypted.toString();
  },
};

// 解密方法
const Decrypt = {
  AES(data: any, key: string): string {
    if (isEmpty(data)) {
      return '';
    }
    const decrypt = CryptoJSAes.decrypt(data, CryptoJSEncUtf8.parse(key), {
      mode: CryptoJSModeEcb,
      padding: CryptoJSPadPkcs7,
    });
    return decrypt.toString(CryptoJSEncUtf8);
  },
};

// 判空
const isEmpty = (data: any) => {
  const isEmpty = data === '' || data === null || typeof data === 'undefined';
  return isEmpty;
};

export { Encrypt, Decrypt };

const CryptoJSAes = require('crypto-js/aes');
const CryptoJSEncUtf8 = require('crypto-js/enc-utf8');
const CryptoJSModeEcb = require('crypto-js/mode-ecb');
const CryptoJSPadPkcs7 = require('crypto-js/pad-pkcs7');
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

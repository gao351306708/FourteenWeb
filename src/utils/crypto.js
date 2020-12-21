/**
 * CryptoJS加密
 * create : 2020-12-21 by gaoju
 * **/

var CryptoJS = require('crypto-js');
let key = 'FourteenWebGaoju'
let iv = 'FourteenWebGaoju'

//加密
function getAesString(data, key, iv) {
  var keys = CryptoJS.enc.Utf8.parse(key);
  var ivs = CryptoJS.enc.Utf8.parse(iv);
  var encrypted = CryptoJS.AES.encrypt(data, keys, {
    iv: ivs,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString(); //返回的是base64格式的密文
}

//解密
function getDAesString(encrypted, key, iv) {
  var keys = CryptoJS.enc.Utf8.parse(key);
  var ivs = CryptoJS.enc.Utf8.parse(iv);
  var decrypted = CryptoJS.AES.decrypt(encrypted, keys, {
    iv: ivs,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export default {
  // 加密函數
  enCrypted_AES(word) {
    var encrypted = getAesString(word, key, iv); //密文
    return encrypted
  },
  // 解密函數
  deCrypted_AES(word) {
    if (word == "" || word == null || word == undefined) {
      throw new Error("加密密文为无效密文：" + word);
    }
    var decryptedStr = getDAesString(word, key, iv);
    return decryptedStr
  }
}

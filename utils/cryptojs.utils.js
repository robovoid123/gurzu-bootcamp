const CryptoJS = require("crypto-js");

const encryptPassword = (password, key) => {
  return CryptoJS.AES.encrypt(password, key).toString();
};

const decryptPassword = (cipher_text, key) => {
  var bytes = CryptoJS.AES.decrypt(cipher_text, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { encryptPassword, decryptPassword };

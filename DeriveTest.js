var crypto = require("crypto");
var pbkdf2 = require("pbkdf2");

const algorithm = "aes-256-cbc";
const initVector = crypto.randomBytes(16);
const message = "This is a secret message";
const password = "Very secret password";

const encrypt = (algorithm, password, initVector, message) => {
  const derivedKey = deriveKey(password);
  console.log("Derived Key: " + derivedKey.toString("hex"));
  const cipher = crypto.createCipheriv(algorithm, derivedKey, initVector);
  //   const cipher = crypto.createCipheriv(algorithm, key, initVector);
  let encryptedData = cipher.update(message, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  console.log("Encrypted message: " + encryptedData);
  return encryptedData;
};

const decrypt = (algorithm, password, initVector, encryptedData) => {
  const decipher = crypto.createDecipheriv(algorithm, deriveKey(password), initVector);

  let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

  decryptedData += decipher.final("utf8");

  console.log("Decrypted message: " + decryptedData);
  return decryptedData;
};

const deriveKey = (password) => {
  var derivedKey = pbkdf2.pbkdf2Sync(password, "salt", 100, 32, "sha256");
  //console.log("Derived key: " + derivedKey.toString("hex"));
  return derivedKey;
};

console.log("Original message: " + message);
const encrypted = encrypt(algorithm, password, initVector, message);
const decrypted = decrypt(algorithm, password, initVector,encrypted
);

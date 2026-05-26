function xorEncryptDecrypt(text, secret) {
  if (typeof text !== "string" || typeof secret !== "string") {
    console.error("Invalid input: both text and secret must be strings.");
    return null;
  }

  if (text.length === 0 || secret.length === 0) {
    console.error("Text and secret must not be empty.");
    return null;
  }

  const textChars = text.split("");
  const secretChars = secret.split("");
  let result = "";

  for (let i = 0; i < textChars.length; i++) {
    const encryptedCharCode =
      textChars[i].charCodeAt(0) ^
      secretChars[i % secretChars.length].charCodeAt(0);
    result += String.fromCharCode(encryptedCharCode);
  }

  return result;
}

function encrypt(text, secret) {
  const encrypted = xorEncryptDecrypt(text, secret);
  return btoa(encrypted);
}

function decrypt(encryptedText, secret) {
  let _encryptedText = encryptedText?.split(".txt")[0];
  console.log("🚀  decrypt encryptedText:", encryptedText);
  try {
    const decodedBase64 = decodeURIComponent(_encryptedText);

    const base64Pattern = /^[A-Za-z0-9+/]+={0,2}$/;
    if (!base64Pattern.test(decodedBase64)) {
      throw new Error("Invalid Base64 format");
    }

    const decoded = atob(decodedBase64);
    return xorEncryptDecrypt(decoded, secret);
  } catch (error) {
    console.error("Error decoding Base64 string:", error);
    return null;
  }
}

export { encrypt, decrypt };

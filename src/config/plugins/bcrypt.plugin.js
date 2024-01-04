import bcrypt from 'bcrypt';

export const encryptedPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

export const verifyPassword = async (bodyPassword, userPassword) => {
  return await bcrypt.compare(bodyPassword, userPassword);
};
// compara una contraseña plana con la contraseña encriptada, sin tener que desencriptar la contraseña ya almacenada.parseEnglish()

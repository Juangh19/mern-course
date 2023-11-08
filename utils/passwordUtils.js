import bycrypt from 'bcryptjs';

export async function hashPassword(password) {
  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePassword(password, hashedPassword) {
  const isMatch = await bycrypt.compare(password, hashedPassword);
  return isMatch;
}

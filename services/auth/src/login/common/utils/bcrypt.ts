import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  if (!hash) {
    throw new Error('Failed to hash password');
  }

  return hash;
}

export async function comparePassword(
  password: string,
  hash: string | undefined,
): Promise<boolean> {
  if (!hash) {
    return false;
  }

  const isPasswordValid = await bcrypt.compare(password, hash);
  return isPasswordValid;
}

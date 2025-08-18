import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  if (!hash) {
    throw new Error('Failed to hash password');
  }

  return hash;
}

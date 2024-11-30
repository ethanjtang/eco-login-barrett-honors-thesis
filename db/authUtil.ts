import bcrypt from "bcrypt";

const saltRounds = 10;

/**
 * Salts and hashes the given password.
 * @param {string} password - The plain text password.
 * @returns {Promise<string>} - The hashed password.
 */
export async function saltAndHashPassword(password: string): Promise<string> {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(`Hash generated: ${hash}`);
    return hash;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unexpected error occurred");
    }
    return '';
  }
}

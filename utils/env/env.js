import dotenv from "dotenv";
dotenv.config();

/**
 * Returns the string value of an environment variable.
 * If it doesn't exist and a fallback is provided, the fallback is returned.
 * Otherwise, throws an error.
 */
function getString(key, fallback) {
  const value = process.env[key];

  // If there's no value in the environment, either return fallback or throw
  if (!value) {
    if (fallback !== undefined) {
      return fallback;
    }
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export { getString };

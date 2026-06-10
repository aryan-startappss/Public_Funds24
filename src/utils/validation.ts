/**
 * Validates whether the provided email string matches a standard email pattern.
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates whether the provided phone string matches a standard phone layout.
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[0-9\s-]{8,15}$/;
  return phoneRegex.test(phone);
}

/**
 * Validates if the password meets strength constraints (minimum 6 characters).
 */
export function validatePassword(password: string): boolean {
  return password.length >= 6;
}

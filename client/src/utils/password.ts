export const PASSWORD_REGEX =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[^\s]{8,}$/;

export const passwordRules = {
  minLength: (v: string) => v.length >=8,
  lowercase: (v: string) => /[a-z]/.test(v),
  uppercase: (v: string) => /[A-Z]/.test(v),
  number: (v: string) => /\d/.test(v),
  special: (v: string) => /[\W_]/.test(v),
  noSpaces: (v: string) => !/\s/.test(v),
};

export function isStrongPassword(password: string) {
  return Object.values(passwordRules).every(rule => rule(password));
}

export function isValidPassword(password: string): boolean {
    return PASSWORD_REGEX.test(password);
}
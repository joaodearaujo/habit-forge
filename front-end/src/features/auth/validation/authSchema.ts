export const EMAIL_MAX = 254;
export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 64;

export function validateLoginFields(email: string, password: string) {
  const emailConditions = {
    emptyInput: !email.trim(),
    tooLong: email.length > EMAIL_MAX,
  };

  const passwordConditions = {
    emptyInput: !password,
    charactersLimit:
      password.length < PASSWORD_MIN || password.length > PASSWORD_MAX,
  };

  const isEmailInvalid = emailConditions.emptyInput || emailConditions.tooLong;
  const isPasswordInvalid =
    passwordConditions.emptyInput || passwordConditions.charactersLimit;

  if (emailConditions.emptyInput) {
    return { isValid: false, errorMessage: 'The email cannot be empty.' };
  }

  if (emailConditions.tooLong) {
    return {
      isValid: false,
      errorMessage: `The email must be at most ${EMAIL_MAX} characters long.`,
    };
  }

  if (passwordConditions.emptyInput) {
    return { isValid: false, errorMessage: 'The password cannot be empty.' };
  }

  if (passwordConditions.charactersLimit) {
    return {
      isValid: false,
      errorMessage: `The password must be between ${PASSWORD_MIN} and ${PASSWORD_MAX} characters long.`,
    };
  }

  return { isValid: true, errorMessage: '', isEmailInvalid, isPasswordInvalid };
}

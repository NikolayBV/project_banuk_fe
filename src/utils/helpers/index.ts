export const validatePhoneNumber = (phoneNumber: string): string | boolean => {
  const phoneRegex = /^\8\d{10}$/;
  if (!phoneNumber) {
    return 'Phone number cannot be empty';
  } else if (!phoneRegex.test(phoneNumber)) {
    return 'Phone number must start with 8 and have ten digits';
  }
  return true;
};

export const validateNickname = (username: string): string | boolean => {
  const regex = /^[a-zA-Z0-9_]+$/;
  return !regex.test(username)
    ? 'Username can only contain letters, numbers and underscore'
    : true;
};

export const validatePassword = (password: string): string | boolean => {
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  return !passwordRegex.test(password)
    ? 'Password must contain at least one number, one uppercase letter, one lowercase letter and one special character!'
    : true;
};

export const getTwoLettersFromName = (name: string) => {
  return name
    .split(' ')
    .map(str => str[0].toUpperCase())
    .slice(0, 2)
    .join('');
};

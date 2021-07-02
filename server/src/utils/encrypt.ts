import * as bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

export const hashPassword = async function (password: string) {
  try {
    const genSalt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const bcryptPassword =  await bcrypt.hash(password, genSalt);
    return bcryptPassword;
  } catch (err) {
    return err;
  }
}

export const validatePassword = function (candidatePassword: string, password: string, next: any) {
  bcrypt.compare(candidatePassword, password)
        .then((isMatch) => {
          next(null, isMatch)
        })
        .catch((err) => {
          return next(err)
        })
};

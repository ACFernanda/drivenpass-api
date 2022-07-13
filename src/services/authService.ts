import {
  CreateUserData,
  findByEmail,
  insert,
} from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT = 10;

export async function signUpService(userData: CreateUserData) {
  userData.email = userData.email.toLowerCase();
  const { email, password } = userData;
  const checkEmail = await findByEmail(email);
  if (checkEmail)
    throw {
      type: "conflict",
      message: "E-mail already register",
    };

  userData.password = await bcrypt.hash(password, SALT);
  await insert(userData);
}

export async function signInService(userData: CreateUserData) {
  const { email, password } = userData;

  const user = await findByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password)))
    throw {
      type: "unauthorized",
      message: "Wrong email or password",
    };

  const token = jwt.sign({ id: user.id, email }, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 24 * 30,
  });

  return token;
}

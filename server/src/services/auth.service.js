import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// sign Up Admin

const register = async (data) => {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    throw new Error("Admin already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newAdmin = await prisma.admin.create({
    data: {
      name,
      email,
      password: hashPassword,
      role: "admin",
    },
  });

  const accessToken = jwt.sign(
    {
      id: newAdmin.id,
      email: newAdmin.email,
      role: newAdmin.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  const refreshToken=jwt.sign({
    id:newAdmin.id,
    email:newAdmin.email,
    role:newAdmin.role
  },process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"})
  

  return {
    success: true,
    message: "Admin Signup Successfully",
    accessToken,
    refreshToken,
    data: {
      id: newAdmin.id,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
    }
  };
};

const login = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!existingAdmin) {
    throw new Error("User with this email does not exist");
  }

  const isPasswordMatch = await bcrypt.compare(
    password,
    existingAdmin.password
  );

  if (!isPasswordMatch) {
    throw new Error("Invalid password");
  }

  const accessToken = jwt.sign(
    {
      id: existingAdmin.id,
      email: existingAdmin.email,
      role: existingAdmin.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  //refreshToken

  const refreshToken=jwt.sign(
    {
      id:existingAdmin.id,
      email:existingAdmin.email,
      role:existingAdmin.role
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:"7d"}

   
  )

  return {
    accessToken,
    refreshToken,
    user: {
      id: existingAdmin.id,
      name: existingAdmin.name,
      email: existingAdmin.email,
      role: existingAdmin.role,
    },
  };
};
export { register, login };

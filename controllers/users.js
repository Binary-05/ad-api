import { registerUserValidator, loginUserValidator } from "../validators/users.js";
import { UserModel } from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res, next) => {
  // validate user input
  const {error, value} = registerUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error)
  }
  // check if user does not exist
  const  user = await UserModel.findOne({email: value.email});
  if (user) {
    return res.status(409).json("User already exist");
  }
  // Hash their password
  const hashedPassword = bcrypt.hashSync(value.password, 10);
  // save user into database
  await UserModel.create({
    ...value, password: hashedPassword
  })
  // send comfirmation email
  // reponse to request
  try {
    res.json("User register")
  } catch (error) {
    next(error)
  } 
}

export const loginUser = async (req, res, next) => {
  try {
    // validate user input
    const {error, value} = loginUserValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    // find one user with identifier
  const user = await UserModel.findOne({email: value.email});
  if (!user) {
    return res.status(404).json("User does not exist!");
  }
  // compare their passwords
  const correctPassword = bcrypt.compareSync(value.password, user.password);
  if (!correctPassword) {
    return res.status(401).json
    ("Invalid credentials!");
  }
  // sigm a token for user
  const token = jwt.sign(
    {id: user.id}, process.env.JWT_PRIVATE_KEY, {expiresIn: "24h"}
  );
  // respond to resquest
  res.json({message: "User logged in!", accessToken: token})
    
  } catch (error) {
    next(error)
  }
  
}

export const logoutUser = (req, res, next) => {
  res.json("User logged out successfully");
}

export const getProfile = async (req, res, next) => {
  try {
    // Find authenticated user from database
    const user = await UserModel
    .findById(req.auth.id)
    .select({password: false});
    // Response request
    res.json(user);
  } catch (error) {
    next(error)
    
  }
}
export const updateProfile = (req, res, next) => {
  try {
    // validate user input
    const {} = updateProfileValidator.validate(req.body)

    res.json("User profile update");
    
  } catch (error) {
    next(error)
  }
}
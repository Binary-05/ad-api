import { registerUserValidator, loginUserValidator, updateProfileValidator } from "../validators/users.js";
import { UserModel } from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AdvertModel } from "../models/adverts.js";

export const registerUser = async (req, res, next) => {
  try {
    // Validate user input
    const { error, value } = registerUserValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    // Check if user does not exist
    const user = await UserModel.findOne({ email: value.email });
    if (user) {
      return res.status(409).json("User already exists!");
    }
    // Hash their password
    const hashedPassword = bcrypt.hashSync(value.password, 10);
    // Save user into database
    await UserModel.create({
      ...value,
      password: hashedPassword
    });
    // Send comfirmation email
    // Reponse to request
    res.json("User registered!");
  } catch (error) {
    next(error);
  }
}

export const loginUser = async (req, res, next) => {
  try {
    // Validate user input
    const { error, value } = loginUserValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    // Find one user with identifier
    const user = await UserModel.findOne({ email: value.email });
    if (!user) {
      return res.status(404).json("User does not exist!");
    }
    // Compare their passwords
    const correctPassword = bcrypt.compareSync(value.password, user.password);
    if (!correctPassword) {
      return res.status(401).json
        ("Invalid credentials!");
    }
    // sigm a token for user
    const token = jwt.sign(
      { id: user.id }, process.env.JWT_PRIVATE_KEY, { expiresIn: "24h" }
    );
    // respond to resquest
    res.json({ message: "User logged in!", accessToken: token })

  } catch (error) {
    next(error);
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
      .select({ password: false });
    // Response request
    res.json(user);
  } catch (error) {
    next(error);

  }
}

export const getUserAdverts = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}", limit = 15, skip = 0 } = req.query;
    // Fetch ads from database 
    const adverts = await AdvertModel
      .find({
        ...JSON.parse(filter),
        user: req.auth.id
      })
      .sort(JSON.parse(sort))
      .limit(limit)
      .skip(skip);
    // Return response
    res.status(200).json(adverts);
  } catch (error) {
    next(error);
  }
}

export const updateProfile = async (req, res, next) => {
  try {
    // validate user input
    const { error, value } = updateProfileValidator.validate({
      ...req.body,
      // avatar: req.file?.filename
    });
    if (error) {
      return res.status(422).json(error);
    }
    // update user
    await UserModel.findByIdAndUpdate(req.auth.id, value);
    // respond to request
    res.json("User profile updated");
  } catch (error) {
    next(error);
  }
}
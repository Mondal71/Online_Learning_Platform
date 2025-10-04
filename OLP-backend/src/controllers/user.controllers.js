import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/userModel/user.models.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //   message: "OK"
  // })

  const { fullName, userName, email, password } = req.body
  console.log("email", email);


  // if (fullName === "") {
  //   throw new ApiError(400, "Full name is required!")
  // }else if (userName === "") {
  //   throw new ApiError(400, "Username is required!")
  // }else if (email === "") {
  //   throw new ApiError(400, "email is required!")
  // }else if (password === "") {
  //   throw new ApiError(400, "password is required!")
  // } 

  //************** Another way to write this */
  
  if (
    [fullName, userName, email, password].some((field) =>
      field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required")
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }]
  })

  if (existedUser) {
    throw new ApiError(409, "User with username or email already exist")
  }

  // const avatarPath = req.file.path

  // console.log(avatarPath);
  

  // if (!avatarPath ) {
  //   throw new ApiError(400, "Avatar file is required!")
  // }

  // const avatar = await uploadOnCloudinary(avatarPath)

  // console.log(avatar);
  

  // if (!avatar) {
  //   throw new ApiError(400, "Avatar is required!");
  // }
  

  const user = await User.create({
    fullName,
    email,
    userName: userName.toLowerCase(),
    password,
    role: "student",
    isBlocked: false,
    // avatar: avatar.url,
  });

  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if (!userCreated) {
    throw new ApiError(500, "Something went wrong register the user!")
  }

  return res.status(201).json(
    new ApiResponse(200, userCreated, "User registered successfully!")
  )

})

export {registerUser}
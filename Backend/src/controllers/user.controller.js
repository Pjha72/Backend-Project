import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {accessToken, refreshToken}
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while genration access and refresh token!!"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // Step-1 : get user details from frontend
  const { fullName, email, username, password } = req.body;
  // console.log("email: ", email);
  console.log(req.body);
  // Step-2 : validation - not empty

  // if(fullName === ""){
  //     throw new ApiError(400, "fullName is required!!")
  // }

  if (
    [fullName, email, username, password].some((filed) => filed?.trim() === "")
  ) {
    throw new ApiError(400, "All fileds are required!!");
  }
  // Step-3 : check if user already exists: username,email
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist");
  }

  // console.log(req.files)
  // Step-4 : check for images, check for avatar
  const avatartLoaclPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLoaclPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLoaclPath = req.files.coverImage[0].path;
  }

  if (!avatartLoaclPath) {
    throw new ApiError(400, "Avatar file is required!!");
  }
  // Step-5 : upload them to cloudinary, avatar
  const avatar = await uploadOnCloudinary(avatartLoaclPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required!!");
  }
  // Step-6 : create user object - create entry in db
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // Step-7 : remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  // Step-8 : check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  // Step-9 : return response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // step-1 : take a data from req body
  const { username, email, password } = req.body;
  // step-2 : Take a username or email
  if (!username || !email) {
    throw new ApiError(400, "username or email is required!!!");
  }
  // step-3 : fins the user
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiError(404, "user does not exist!!");
  }
  // step-4 : enter the password
  const isPaaswordValid = await user.isPasswordCorrect(password);
  if (!isPaaswordValid) {
    throw new ApiError(401, "Invalid user credentials!!");
  }
  // step-5 : access token and refresh token genration
  const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);
  // step-6 : send the both token to the cookie
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
    httpOnly : true,
    secure: true
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(
        200,
        {
            user: loggedInUser, accessToken, refreshToken
        },
        "User logged In Successfully"
    )
  )
});

const logoutUser = asyncHandler(async (req, res)=>{
    // Step-1: 
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly : true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out!!"))
})

export { registerUser, loginUser, logoutUser };

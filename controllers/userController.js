import { StatusCodes } from 'http-status-codes';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId);
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getAppStats = async (req, res) => {
  const jobs = await Job.countDocuments();
  const users = await User.countDocuments();
  res.status(StatusCodes.OK).json({ jobs, users });
};

export const updateUser = async (req, res) => {
  console.log(req.file);
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const user = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && user.avatarPublicId) {
    await cloudinary.uploader.destroy(user.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ user });
};

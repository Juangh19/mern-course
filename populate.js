import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Job from './models/JobModel.js';
import User from './models/UserModel.js';
import { log } from 'console';

try {
  await mongoose.connect(process.env.MONGO_URL);

  const jobs = JSON.parse(
    await readFile(new URL('./utils/MOCK_DATA.json', import.meta.url))
  );

  const testUser = await User.findOne({ email: 'juangarcia7337@gmail.com' });

  const testUserId = testUser._id;

  const newJobs = jobs.map((job) => {
    return { ...job, createdBy: testUserId };
  });

  await Job.deleteMany({ createdBy: testUserId });
  await Job.insertMany(newJobs);
  console.log('Data successfully imported!');
} catch (error) {
  console.log(error);
  process.exit(1);
}

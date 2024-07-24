import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Course from '../Courses/model.js';
import Module from '../Modules/model.js';
import coursesData from './courses.js';
import modulesData from './modules.js';

dotenv.config({ path: path.resolve('../../.env') });

const connectionString = process.env.MONGO_CONNECTION_STRING;

console.log('Environment variables loaded successfully:', process.env);
console.log('MONGO_CONNECTION_STRING:', connectionString);

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');

  // 清空现有数据
  await Course.deleteMany({});
  await Module.deleteMany({});

  // 插入课程数据
  const courseDocs = await Course.insertMany(coursesData.default);
  console.log('Courses inserted');

  // 插入模块数据并设置正确的 course 字段
  for (const module of modulesData.default) {
    const courseExists = courseDocs.some(c => c._id === module.course);
    if (courseExists) {
      await Module.create(module);
    } else {
      console.error(`Course not found for module: ${module.name}`);
    }
  }
  console.log('Modules inserted');

  mongoose.disconnect();
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

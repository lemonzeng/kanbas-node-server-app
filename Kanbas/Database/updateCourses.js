import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// 定义虚拟的 author ObjectId
const defaultAuthorId = '654f9ec2ea7ead465908d1e3';

// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 动态导入 courses.js 模块
const coursesFilePath = path.resolve(__dirname, 'courses.js');
const coursesModuleUrl = pathToFileURL(coursesFilePath).href;
const coursesData = await import(coursesModuleUrl).then(module => module.default);

// 更新缺少 author 字段的课程数据
const updatedCoursesData = coursesData.map(course => {
  if (!course.author) {
    course.author = defaultAuthorId;
  }
  return course;
});

// 将更新后的数据写回 courses.js 文件
const newContent = `export default ${JSON.stringify(updatedCoursesData, null, 2)};`;
fs.writeFileSync(coursesFilePath, newContent, 'utf-8');

console.log('Courses data updated successfully.');

import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() }, 
  name: { type: String, required: true },
  description: String,
  course: { type: String, required: true },
  lessons: [
    {
      _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() }, 
      name: { type: String, required: true },
      description: String
    }
  ]
}, { collection: 'modules' });

export default moduleSchema;

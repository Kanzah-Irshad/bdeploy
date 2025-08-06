// import mongoose from 'mongoose';

// const itemSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// }, { timestamps: true });

// export default mongoose.model('Item', itemSchema);
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String, // ✅ added field
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);

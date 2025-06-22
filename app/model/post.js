import mongoose from 'mongoose';
import slugify from 'slugify';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  excerpt: String,
  content: String,
  author: String,
  image: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Only attach middleware once (for hot-reload or serverless)
if (!mongoose.models.Post) {
  postSchema.pre('save', function (next) {
    if (this.isModified('title')) {
      this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
  });
}

export default mongoose.models.Post || mongoose.model('Post', postSchema);

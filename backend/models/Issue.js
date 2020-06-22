import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Issue = new Schema({
  title: {
    type: String
  },
  responsible: {
    type: String
  },
  description: {
    type: String
  },
  severity: {
    type: String
  },
  status: {
    type: String,
    default: 'Open'
  },
  archived: {
    type: Boolean,
    default: false
  },
  archivedOn: {
    type: String,
    default: "Jan 1, 0000"
  },
  comments: {
    type: Array,
    default: []
  }
});

export default mongoose.model('Issue', Issue);
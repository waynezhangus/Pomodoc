const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    date: {
      type: Date,
    },
    pdfLink: {
      type: String,
    },
    status: {
      type: String,
      enum: ['ongoing', 'finished'],
      default: 'ongoing',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Note', noteSchema)
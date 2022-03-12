const mongoose = require('mongoose')

const docSchema = mongoose.Schema(
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
    note: {
      type: String,
    },
    dueDate: {
      type: Date,
      default: Date.now
    },
    pdfLink: {
      type: String,
    },
    pomoTotal: {
      type: Number,
    },
    pomoDone: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['ongoing', 'done'],
      default: 'ongoing',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Doc', docSchema)
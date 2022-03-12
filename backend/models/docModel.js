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
      default: ''
    },
    dueDate: {
      type: Date,
      default: Date.now
    },
    pdfLink: {
      type: String,
    },
    pageCount:{
      type: Number,
    },
    pomoTotal: {
      type: Number,
    },
    pomoDone: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['ongoing', 'finished'],
      default: 'ongoing',
    },
    findings: [{
      type: String
    }],
    referenceLinks: [{
        id: String,
        entry: String,
        scholar_url: String,
        oa_query: String
    }],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Doc', docSchema)
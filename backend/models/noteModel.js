const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
  {
    title:{
      type: String,
      required: true,
    },
    content:{
      type: String,
    },
    date:{
      type: Date,
    },
    user_id: {
      type: String,
      required: true,
    },
    pdfLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)


module.exports = mongoose.model('Notes', noteSchema)
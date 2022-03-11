const asyncHandler = require('express-async-handler')

const Doc = require('../models/docModel')

// @desc    Get doc list
// @route   GET /api/docs
// @access  Private
const getDocs = asyncHandler( async (req, res) => {
  const docs = await Doc.find({ user: req.user.id }).select('-note')
  res.status(200).json(docs)
})
// @desc    Create new doc
// @route   POST /api/docs
// @access  Private
const createDoc = asyncHandler( async (req, res) => {
  const {title, dueDate, pdfLink, pomoTotal} = req.body; 
  if (!title) {
    res.status(400)
    throw new Error('Please add a title')
  }

  const doc = await Doc.create({
    user: req.user.id,
    title,
    dueDate,
    pdfLink,
    pomoTotal,
    pomoDone: 0,
    status: 'ongoing',
  })
  res.status(201).json(doc)
})
// @desc    Get one doc
// @route   GET /api/docs/:id
// @access  Private
const getDoc = asyncHandler( async (req, res) => {
  const doc = await Doc.findById(req.params.id).select('-dueDate -status')
  if (!doc) {
    res.status(404)
    throw new Error('Note not found')
  }
  if (doc.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  res.status(200).json(doc)
})
// @desc    Update one doc
// @route   PATCH /api/docs/:id
// @access  Private
const updateDoc = asyncHandler( async (req, res) => {
  const doc = await Doc.findById(req.params.id).select('user')
  if (!doc) {
    res.status(404)
    throw new Error('Note not found')
  }
  if (doc.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedDoc = await Doc.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.status(200).json(updatedDoc)
})
// @desc    Delete one doc
// @route   DELETE /api/docs/:id
// @access  Private
const deleteDoc = asyncHandler( async (req, res) => {
  const doc = await Doc.findById(req.params.id).select('user')
  if (!doc) {
    res.status(404)
    throw new Error('Note not found')
  }
  if (doc.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  await doc.remove()
  res.status(200).json({ success: true })
})

const noteCtrl = {
  getDocs,
  createDoc,
  getDoc,
  updateDoc,
  deleteDoc,
}

module.exports = noteCtrl
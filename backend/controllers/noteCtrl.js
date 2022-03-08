const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Note = require('../models/noteModel')

const noteCtrl = {
  // @desc    Get all notes
  // @route   GET /api/notes
  // @access  Private
  getNotes: asyncHandler( async (req, res) => {
    const notes = await Note.find({ user: req.user.id })
    res.status(200).json(notes)
  }),
  // @desc    Create note
  // @route   POST /api/notes
  // @access  Private
  createNote: asyncHandler( async (req, res) => {
    const {title, content, date, pdfLink,} = req.body; 
    if (!title) {
      res.status(400)
      throw new Error('Please add a title')
    }

    const note = await Note.create({
      user: req.user.id,
      title,
      content,
      date,
      pdfLink,
      status: 'ongoing',
    })
    res.status(201).json(note)
  }),
  // @desc    Get one note
  // @route   GET /api/notes/:id
  // @access  Private
  getNote: asyncHandler( async (req, res) => {
    const note = await Note.findById(req.params.id)
    if (!note) {
      res.status(404)
      throw new Error('Note not found')
    }
    if (note.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('Not Authorized')
    }
    res.status(200).json(note)
  }),
  // @desc    Update one note
  // @route   PUT /api/notes/:id
  // @access  Private
  updateNote: asyncHandler( async (req, res) => {
    const note = await Note.findById(req.params.id)
    if (!note) {
      res.status(404)
      throw new Error('Note not found')
    }
    if (note.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('Not Authorized')
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(updatedNote)
  }),
  // @desc    Delete one note
  // @route   DELETE /api/notes/:id
  // @access  Private
  deleteNote: asyncHandler( async (req, res) => {
    const note = await Note.findById(req.params.id)
    if (!note) {
      res.status(404)
      throw new Error('Note not found')
    }
    if (note.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('Not Authorized')
    }
    await note.remove()
    res.status(200).json({ success: true })
  }),
}

module.exports = noteCtrl
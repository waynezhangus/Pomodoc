const asyncHandler = require('express-async-handler')
const axios = require('axios')

const Doc = require('../models/docModel')
const User = require('../models/userModel')
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
  const {dueDate, pdfLink} = req.body; 
  
  const findingData = await axios.get(
    'http://api.scholarcy.com/api/findings/extract', 
    { params: {url: pdfLink} }
  )
  const referenceData = await axios.get(
    'http://ref.scholarcy.com/api/references/extract', 
    { params: {url: pdfLink} }
  )

  const title = (req.body.title ? req.body.title : (findingData.data.metadata.title ?? 'Title not found'))
                  
  const pageCount = findingData.data.metadata.pages
  const pomoTotal = Math.max( Math.ceil( pageCount / req.user.readingSpeed ), 1)
  const findings = findingData.data.findings
  const references = referenceData.data.reference_links

  const doc = await Doc.create({
    user: req.user.id,
    title,
    dueDate,
    pdfLink,
    pageCount,
    pomoTotal,
    findings,
    references
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
  const doc = await Doc.findById(req.params.id)
  if (!doc) {
    res.status(404)
    throw new Error('Note not found')
  }
  if (doc.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  if (req.body.status === 'done') {
    req.body.pomoTotal = doc.pomoDone
    if (doc.pomoDone) {
      const currentSpeed = doc.pageCount / doc.pomoDone
      const newSpeed = (req.user.readingSpeed * req.user.docDone + currentSpeed) / (req.user.docDone + 1)
      await User.findByIdAndUpdate(
        req.user.id,
        { readingSpeed: newSpeed, docDone: req.user.docDone + 1 }
      )
    }
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
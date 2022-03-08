const express = require('express')
const noteCtrl = require('../controllers/noteCtrl')
const { protect } = require('../middleware/authMid')

const router = express.Router()

router.route('/')
    .get(protect, noteCtrl.getNotes)
    .post(protect, noteCtrl.createNote)

router.route('/:id')
    .get(protect, noteCtrl.getNote)
    .put(protect, noteCtrl.updateNote)
    .delete(protect, noteCtrl.deleteNote)

module.exports = router
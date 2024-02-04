const express = require('express')
const router = express.Router()
const Chat = require('../models/Chat')

router.get('/allChats', async (req, res) => {
    try {
        const data = await Chat.find()
        res.status(200).json({ status: "Successful", data: data })
    } catch (error) {
        res.status(500).json({ status: "Failed", data: error })

    }
})


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await Chat.deleteOne({ _id: id })
        res.status(201).json({ status: "Successful", data: response })
    } catch (error) {
        res.status(500).json({ status: "Failed", data: error })
    }
})

module.exports = router
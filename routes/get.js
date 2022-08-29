const fs = require('fs')
const path = require('path')


exports.getRouter = (app) => {
    app.get('/api/v1/getdata', (req, res) => {
        const {
            token
        } = req.query;
        const file = path.resolve(__dirname, '../db/bilhetagem.csv')
        token == 'acredite' ? res.sendFile(file) : res.send('Access denied')
    })
}
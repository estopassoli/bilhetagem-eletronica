const fs = require('fs')
const path = require('path')

exports.postRouter = (app) => {
    app.post('/api/v1/nova-bilhetagem', (req, res) => {
        const data = {
            prefixo: req.body.prefixo,
            linha: req.body.linha,
            sentido: req.body.sentido,
            date: req.body.date,
            hora_ini: req.body.hora_ini,
            hora_fim: req.body.hora_fim,
            qtd_pax: req.body.qtd_pax
        }
        let string = data.prefixo.toString().includes(',')
        let line = "";
        console.log(string)
        if (string) {
            for (let i in data.prefixo) {
                line += `${data.prefixo[i]};${data.linha[i]};${data.sentido[i]};${data.date[i]};${data.hora_ini[i]};${data.hora_fim[i]};${data.qtd_pax[i]}\n`
            }
        } else {
            line += `${data.prefixo};${data.linha};${data.sentido};${data.date};${data.hora_ini};${data.hora_fim};${data.qtd_pax}\n`
        }


        fs.appendFileSync(path.resolve(__dirname, '../db/bilhetagem.csv'), line)
    })
}
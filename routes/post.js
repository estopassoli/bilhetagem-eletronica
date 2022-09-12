const fs = require('fs')
const path = require('path')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const extensaoArquivo = file.originalname.split('.')[1];
        const nomeArquivo = file.originalname.split('.')[0];
        // Indica o novo nome do arquivo:
        /*  setTimeout(() => {
             fs.rmSync(path.resolve(__dirname, '../uploads/' + nomeArquivo + '.' + extensaoArquivo))
         }, 1000 * 60 * 60 * 24) */
        cb(null, `${nomeArquivo}.${extensaoArquivo}`)
    }
});

const upload = multer({
    storage
});
exports.postRouter = (app) => {


    app.post('/api/v1/novo-transbordo', (req, res) => {
        const header = "Carro;Sentido;Ponto de Parada;Chegada no Ponto;Saída do Ponto;Qtd. Pass.;Obs\n"
        const data = {
            date: req.body.date,
            linha: req.body.linha,
            prefixo: req.body.prefixo,
            sentido: req.body.sentido,
            ponto: req.body.ponto,
            hora_ini: req.body.hora_ini,
            hora_fim: req.body.hora_fim,
            qtd_pax: req.body.qtd_pax,
            obs: req.body.obs
        }
        let line = "";
        for (let i in data.programado) {
            line += `${data.date};${data.linha[i]};${data.prefixo[i]};${data.sentido[i]};${data.ponto[i]};${data.hora_ini[i]};${data.hora_fim[i]};${data.qtd_pax[i]};${data.obs[i]}\n`;
        }
        fs.writeFileSync(path.resolve(__dirname, '../db/' + `${data.date}_${data.sentido}_${data.linha}.csv`), header + line)
    })
    app.post('/api/v1/nova-bilhetagem', (req, res) => {
        const header = "Data;Linha;Sentido;Tabela;Prefixo;Programado;Inicio Real;Fim Real;Qtd. Pass.;Encerrante;Observação\n"
        const data = {
            date: req.body.date,
            linha: req.body.linha,
            sentido: req.body.sentido,
            tabela: req.body.tabela,
            prefixo: req.body.prefixo,
            programado: req.body.programado,
            hora_ini: req.body.hora_ini,
            hora_fim: req.body.hora_fim,
            qtd_pax: req.body.qtd_pax,
            encerrante: req.body.encerrante,
            obs: req.body.obs,
        }
        let line = "";
        for (let i in data.programado) {
            line += `${data.date};${data.linha};${data.sentido};${data.tabela[i]};${data.prefixo[i]};${data.programado[i]};${data.hora_ini[i]};${data.hora_fim[i]};${data.qtd_pax[i]};${data.encerrante[i]};${data.obs[i]}\n`;
        }

        fs.writeFileSync(path.resolve(__dirname, '../db/' + `${data.date}_${data.sentido}_${data.linha}.csv`), header + line)

    })
    app.post('/api/v1/upload', upload.single('arquivo'), (req, res) => {
        res.end('Upload feito com sucesso!')
    }); //s


    app.post('/api/v1/get-bilhetagem', (req, res) => {
        const {
            date,
            sentido,
            linha
        } = req.body;
        console.log(date, sentido, linha)
        let data = []
        try {
            let file = fs.readFileSync(path.resolve(__dirname, '../db/' + date + '_' + sentido + '_' + linha + '.csv'), 'utf8')
            console.log(file)
            if (file) {
                file = file.split('\n')
                file.shift()
                for (let i in file) {
                    let split = file[i].split(';')
                    var dados = {
                        tabela: split[3],
                        prefixo: split[4],
                        programado: split[5],
                        hora_ini: split[6],
                        hora_fim: split[7],
                        qtd: split[8],
                        encerrante: split[9],
                        obs: split[10]
                    }
                    data.push(dados)
                }
            }
        } catch {
            let arquivo = fs.readFileSync(path.resolve(__dirname, '../uploads/' + linha + '.csv'), 'utf8')
            let file = arquivo.split('\r\n')
            for (let i in file) {
                let split = file[i].split(';')
                if (split[2] == 'Viagem' && split[12] == sentido) {
                    var dados = {
                        tabela: split[0],
                        programado: split[3],
                    }
                    data.push(dados)
                }
            }
        }
        res.json(data);
    })

    app.post('/api/v1/delete-digitado', (req, res) => {
        const file = req.body.file;
        fs.rmSync(path.resolve(__dirname, '../db/' + file + '.csv'))
        res.end('Arquivo deletado com sucesso!')
    })
    app.post('/api/v1/delete-importado', (req, res) => {
        const file = req.body.file;
        fs.rmSync(path.resolve(__dirname, '../uploads/' + file + '.csv'))
        res.end('Deletado com sucesso')
    })
}
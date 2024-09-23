const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/sobre', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Sobre</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: #333; }
                </style>
            </head>
            <body>
                <h1>Sobre</h1>
                <p>Bem-vindo, em nosso site, oferecemos um quiz lúdico inspirado no programa "Quem Quer Ser um Milionário?".</p>
                <a href="/">Voltar para a página inicial</a>
            </body>
        </html>
    `);
});

app.post('/upload', (req, res) => {
    let fileData = '';
    req.on('data', chunk => {
        fileData += chunk.toString();
    });
    req.on('end', () => {
        res.status(200).send('Upload simulado com sucesso!');
    });
});

app.use((req, res) => {
    res.status(404).send(`
        <html>
            <head>
                <title>Página não encontrada</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        background-image: url(https://media.tenor.com/_BiwWBWhYucAAAAM/what-huh.gif);
                        background-size: cover;
                    }
                    h1 { color: #1c3372; }
                </style>
            </head>
            <body>
                <h1>404 - Página Não Encontrada</h1>
                <p>Desculpe, a página que você está procurando não existe.</p>
                <a href="/">Voltar para a página inicial</a>
            </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

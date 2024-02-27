const stream = require("stream");
const express = require("express");
const multer = require("multer");
const path = require("path");
const { google } = require("googleapis");
const app = express();
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Define a pasta 'public' para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/upload', upload.any(), async (req, res) => {
    try {
        res.send("Upload realizado com sucesso");
    } catch (f) {
        res.send(f.message);
    }
});

// iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});



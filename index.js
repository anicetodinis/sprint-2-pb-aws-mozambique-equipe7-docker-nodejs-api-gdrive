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



const KEYFILEPATH = path.join(__dirname, "apikeys.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});


app.post('/upload', upload.any(), async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.files);
        const { body, files } = req;

        for (let f = 0; f < files.length; f += 1) {
            await uploadFile(files[f]);
        }

        res.status(200).send("Dados submetidos");
    } catch (f) {
        res.send(f.message);
    }
});


const uploadFile = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const { data } = await google.drive({ version: "v3", auth }).files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
        },
        requestBody: {
            name: fileObject.originalname,
            parents: ["16cu-4XYbFKUPXIOw2MnY-7wJY7xGjlja"],
        },
        fields: "id,name",
    });
    console.log(`Uploaded file ${data.name} ${data.id}`);
};

// iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});



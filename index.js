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
const FOLDERPATH = "16cu-4XYbFKUPXIOw2MnY-7wJY7xGjlja";

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});

const drive = google.drive({
    version: 'v3',
    auth: auth,
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
        return true;
    } catch (f) {
        
        res.send(f.message);

        return false;
    }
});

app.get('/view', async (req, res) => {
    try {
        const file = await listFiles();
        res.status(200).send(file);
    } catch (f) {
        res.send(f.message);
    }
});

app.get('/download', async (req, res) => {
    try {
        const id = req.query.fileId;
        const link = await downloadFile(id);
        res.status(200).send(link);
    } catch (f) {
        res.send(f.message);
    }
});


app.get('/delete', async (req, res) => {
    try {
        const id = req.query.fileId;
        const file = await deleteFile(id);
        res.status(200).send(file);
    } catch (f) {
        res.send(f.message);
    }
});


const uploadFile = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const { data } = await drive.files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
        },
        requestBody: {
            name: fileObject.originalname,
            parents: [FOLDERPATH],
        },
        fields: "id,name",
    });
    console.log(`Uploaded file ${data.name} ${data.id}`);
};

const listFiles = async () => {
    const res  = await drive.files.list({
        fields: 'nextPageToken, files(id, name, mimeType, size, createdTime)',
      });
      const files = res.data.files;
      if (files.length === 0) {
        console.log('Ficheiros não encontrados.');
        return;
      }

      return files;

};


const downloadFile = async (fileId) => {
    try {
          /* 
            webViewLink: vero file no navegador
            webContentLink: Link para download direto 
            */
          const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink',
          }); 

        return result.data;
    } catch (err) {
        
        throw err;
    }

};

const deleteFile = async (fileId) => {
    try {
        const response = await drive.files.delete({
            fileId: fileId,
          }
        );
          
        return response;
    } catch (err) {
        
        throw err;
    }

};

// iniciando o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});



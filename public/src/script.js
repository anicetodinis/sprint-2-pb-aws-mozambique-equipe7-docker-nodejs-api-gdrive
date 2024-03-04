//const { displayvideo } = require("googleapis/build/src/apis/displayvideo");
var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'))


function mensage(type, msg){
    
    if (type === 'success') {
        var toastLive = document.getElementById('liveToastSuccess');
        var mensage = document.getElementById('mensage-success');
        var toast = new bootstrap.Toast(toastLive);    

        mensage.textContent = msg
        toast.show()
    } else if(type === 'error') {
        var toastLive2 = document.getElementById('liveToastError');
        var mensage2 = document.getElementById('mensage-error');
        var toast2 = new bootstrap.Toast(toastLive2);
        
        mensage2.textContent = msg
        toast2.show()
    }
}


function getTypeFile(type){
    if(type === 'image/png'){
        return 'picture.png';
    }else if(type === 'application/vnd.google-apps.folder'){
        return 'folder.png'
    }else if(type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
        return 'doc.png'
    }else if(type === 'application/pdf'){
        return 'pdf.png'
    }else if(type === 'image/jpeg'){
        return 'picture.png'
    }else if(type === 'video/mp4'){
        return 'multimedia.png'
    }else if(type === 'application/zip'){
        return 'zip.png'
    }else{
        return 'folder.png'
    }
}

const url = "";
const fetchData = async () => {
    var dadoslistados = document.getElementById('meusdados');
    try{
    
    const responses = await fetch('http://127.0.0.1:3000/view', {
        method: 'GET'
    });

    if (!responses.ok) {
      throw new Error(`API request failed with status ${responses.status}`);
    }

    // Extract data from JSON response
    const data = await responses.json();
    let lista = '';

    //console.log(data)
    // Process the retrieved data
    for (const file of data) {
        
        lista = lista + `<div class="col">
        <div class="card shadow-sm">
          <img class="card-img-top" src="icon/${getTypeFile(file.mimeType)}" width="200" alt="" style="width: 200px !important; text-align: center !important;">

          <div class="card-body">
              <p class="card-text">
              <strong>ID:</strong> ${file.id} <br>
              <strong>Name:</strong> ${file.name} <br>
              <strong>size:</strong> ${file.size} bytes <br>
              </p>

            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">ver</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">baixar</button>
                  <button type="button" class="btn btn-danger btn-sm text-black btn-outline-secondary">eliminar</button>
              </div>
              <small class="text-muted">${file.createdTime}</small>
            </div>
          </div>
        </div>
      </div>`;
        
     }
     dadoslistados.textContent = "";
     dadoslistados.innerHTML = "";
     dadoslistados.innerHTML = lista;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData();


var fileInput = document.getElementById('fileInput');
var fileInputLabel = document.getElementById('fileInputLabel');

fileInput.addEventListener('change', function () {
    if (fileInput.files && fileInput.files.length > 0) {
        var fileName = '';
        if (fileInput.files.length === 1) {
            fileName = fileInput.files[0].name;
        } else {
            fileName = fileInput.files.length + ' fotografias selecionadas';
        }
        fileInputLabel.textContent = fileName;
    } else {
        fileInputLabel.textContent = 'Selecionar Ficheiro uma ou mais fotografias';
    }
});

const formElem = document.querySelector('form');
formElem.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://127.0.0.1:3000/upload', {
            method: 'POST',
            body: new FormData(formElem),
        });

        if (!response.ok) {
            throw new Error('Erro: ' + response.status);
        }
        
        myModal.hide();
        mensage("success", "Upload com sucesso!");
        fetchData()
    } catch (error) {
        myModal.hide();
        mensage("error", "Erro ao fazer o upload - "+ error);
    }
});


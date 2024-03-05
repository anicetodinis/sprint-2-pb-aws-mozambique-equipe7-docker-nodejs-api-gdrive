//const { displayvideo } = require("googleapis/build/src/apis/displayvideo");
var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'))
const url = 'http://127.0.0.1:3000'

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


const fetchData = async () => {
    var dadoslistados = document.getElementById('meusdados');
    try{
    
    const responses = await fetch(url+'/view', {
        method: 'GET'
    });

    if (!responses.ok) {
      throw new Error(`API request failed with status ${responses.status}`);
    }

    // Extract data from JSON response
    const data = await responses.json();
    let lista = '';
    let links = "";

    //console.log(data)
    // Process the retrieved data
    for (const file of data) {
        
        links = await verBaixarFile(file.id);
        
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
                  <button onclick="verBaixarFile('${file.id}', 1)"  class="btn btn-sm btn-outline-secondary" >ver</button>
                  <button onclick="verBaixarFile('${file.id}', 2)"  class="btn btn-sm btn-outline-secondary">baixar</button>
                  <button  onclick="eliminarFile('${file.id}')"  class="btn btn-danger btn-sm text-black btn-outline-secondary" >eliminar</button>
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
    mensage("error", "Ocorreu algum erro ao carregar os dados: "+error);
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
        const response = await fetch(url+'/upload', {
            method: 'POST',
            body: new FormData(formElem),
        });

        if (!response.ok) {
            throw new Error('Erro: ' + response.status);
        }
        formElem.reset();
        myModal.hide();
        mensage("success", "Upload com sucesso!");
        fetchData()
    } catch (error) {
        formElem.reset();
        myModal.hide();
        mensage("error", "Erro ao fazer o upload - "+ error);
    }
});

const verBaixarFile = async (id, type) => {
    try{
    const responses = await fetch(url+'/download?fileId='+id, {
        method: 'GET'
    });

    if (!responses.ok) {
      throw new Error(`API request failed with status ${responses.status}`);
    }

    // Extract data from JSON response
    const data = await responses.json();
    if (type === 1){
        window.open(data.webViewLink);
    }else if(type === 2){
        window.open(data.webContentLink);
    }

  } catch (error) {
    mensage("error", "Ocorreu algum erro ao carregar os dados: "+error);
  }
};

const eliminarFile = async (id) => {

    const confirmar = confirm("Deseja realmente excluir este item?");

    if (confirmar) {
    // Excluir o item
    try{
        const responses = await fetch(url+'/delete?fileId='+id, {
            method: 'GET'
        });
    
        if (!responses.ok) {
          throw new Error(`API request failed with status ${responses.status}`);
        }
    
        // Extract data from JSON response
        const data = await responses.json();

        fetchData();
        
        mensage("success", "Ficheiro "+data.name+" foi excluido com sucesso!");
    
      } catch (error) {
        mensage("error", "Ocorreu algum erro ao carregar os dados: "+error);
      }
    } else {
        //nao excluir
        mensage("success", "Operacao cancelada com sucesso!");
    }

};
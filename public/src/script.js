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
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: new FormData(formElem),
        });

        if (!response.ok) {
            throw new Error('Erro: ' + response.status);
        }
        
        myModal.hide();
        mensage("success", "Upload com sucesso!");
    } catch (error) {
        myModal.hide();
        mensage("error", "Erro ao fazer o upload - "+ error);
    }
});


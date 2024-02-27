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
        //console.log("form submitting")
        e.preventDefault();
        const response = await fetch('/upload', {
            method: 'POST',
            body: new FormData(formElem),
        }).then(response => {
            if (!response.ok) {
                throw new Error(' Erro : ' + response.status);
            }
            console.log("Upload com sucesso "+response);
        }).catch(error => {
            console.error("Erro ao fazer o upload - " +error);
        });
    });
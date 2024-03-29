<h1>API da Google Drive usando o node.js</h1>

![head section of the system page](https://github.com/anicetodinis/sprint-2-pb-aws-mozambique-equipe7-docker-nodejs-api-gdrive/assets/104785625/8949a870-3f9c-47b6-b39e-d03e0de12e01)

<h2>Descrição do sistema</h2>
<p>Este sistema foi desenvolvido com o proposito de avaliação no programa da compass o AI&ML | Machine Learning AWS | Mozambique | 2023, sendo a segunda actividade da sprint.</p>
<p>Tem como tarefa criar um sistema em node.js que faça uso da API do Google Drive, tendo como funcionalidade upload, download, delete </p>

<h2>Funcionalidades do sistema</h2>

<ul>
  <li style= "font-weight:bold;"><span>Funcionalidade 1:</span> Upload de ficheiros</li>
  <li><span>Funcionalidade 2:</span> Download de ficheiros</li>
  <li><span>Funcionalidade 3:</span> Deletar os ficheiros</li>
  <li><span>Funcionalidade 4:</span> Listar os ficheiros na pagina do sistema</li>
</ul>

<h2>Como usar o sistema</h2>
<p>Formas de inicializar o projecto</p>
<p>1. Clone do projecto:</p>

```
git clone https://github.com/anicetodinis/sprint-2-pb-aws-mozambique-equipe7-docker-nodejs-api-gdrive.git
```

```
npm install
```

```
npm start
```

Ou

<p>2. Imagem Docker:</p>

```
sudo docker pull anicetodinis/hey-nodejs:0.0.2.RELEASE
```

```
sudo docker container run -d -p 3000:3000 anicetodinis/hey-nodejs:0.0.2.RELEASE
```

<p>3. Host URL: <a href="http://3.88.235.22:3000/" target="_blank" >click aqui</a></p>
<p>Após aceder ao sistema podemos executar as seguintes operações</p>

<h3>Upload file</h3>

<p>para poder fazer o upload de ficheiro click no button <strong>Upload</strong> de seguida vai abrir uma janela</p>

![image-upload-button](https://github.com/anicetodinis/sprint-2-pb-aws-mozambique-equipe7-docker-nodejs-api-gdrive/assets/104785625/b080a221-345d-474d-90f4-6e29484a0a62)

<p>Tendo a janela aberta podes selecionar o ficheiro na sua maquina local, podendo ser um ou varios de uma só vez </p>
<p>após selecionar click no button <strong>upload</strong> ou se não quiser mais fazer a operação clica no button <strong>fechar</strong></p>

![image-upload](https://github.com/anicetodinis/sprint-2-pb-aws-mozambique-equipe7-docker-nodejs-api-gdrive/assets/104785625/f89f736c-fcce-4cf2-ab07-54a6bf04ddc4)

<p>Feito o upload dos seus ficheiros elas serão listados no na mesma pagina, tendo control de fazer downlad, delete e view do ficheiro</p>

![image-liste-file](https://github.com/anicetodinis/sprint-2-pb-aws-mozambique-equipe7-docker-nodejs-api-gdrive/assets/104785625/78a62fa5-04d9-42fd-b407-ea21da8ea98b)

<h2>Dificuldades encontradas</h2>

<p>No processo do desenvolvimento do system foram encontradas as segintes dificuldades</p>
<ul>
  <li>Capacidade de trabalhar em equipa, no inicio da actividade tive-se uma limitação na comunicação com outros elementos do grupo</li>
  <li>Alguns elementos do grupo não davam feedback positivo</li>
  <li>Devido a falta de colaboração de alguns elementos do grupo teve-se uma device no processo de distribuição das tarefas</li>
</ul>

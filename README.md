Frontend do projeto, diário online.

Para rodar localmente é necessário a instalação das seguintes tecnologias:
Node 20.9.0
Angular 16.2.0

O projeto está apontando para a API hospedada na AWS, para apontar o projeto para a api local é necessário alterar a variável "endpoint" presente em src/app/shared/crud.service.ts

Para rodar a aplicação é necessário executar o comando "ng serve" na pasta raíz do repositório.
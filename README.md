# Containerizando um site estático com Docker

Aluno: Bruno Ferreira Fonseca
Curso: Análise e Desenvolvimento de Sistemas (AEMS)

## Sobre o trabalho

Fiz uma página estática (HTML, CSS, JS e uma imagem SVG) que explica como o Docker funciona, e coloquei ela dentro de um container com Nginx. O objetivo era conseguir abrir a página no navegador, em `http://localhost:8080`, com ela rodando dentro do container.

## Estrutura do repositório

```
.
├── Dockerfile
├── .dockerignore
├── index.html
├── css/style.css
├── js/main.js
├── img/fluxo.svg
└── README.md
```

## Como rodar

Precisa ter o Docker instalado e aberto (Docker Desktop no Windows ou Mac).

Entrar na pasta do projeto, onde está o Dockerfile


```

Build da imagem:

```
docker build -t site-docker .
```

Rodar o container:

```
docker run -d --name meu-site -p 8080:80 site-docker
```

Depois é só abrir no navegador:

```
http://localhost:8080
```

O `-p 8080:80` liga a porta 8080 do meu computador na porta 80 do container, que é onde o Nginx escuta. Se a 8080 já estiver ocupada, dá para trocar por outra, tipo `-p 8081:80`.

## Comandos que usei para conferir

Ver se o container está rodando:

```
docker ps
```

Ver os logs do Nginx:

```
docker logs meu-site
```

Parar e remover o container:

```
docker stop meu-site
docker rm meu-site
```

## Diferença entre imagem e container

A imagem é o pacote pronto. Ela tem o Nginx e os arquivos do meu site dentro, mas fica parada, só guardada, e não dá para alterar. Quem cria ela é o docker build, seguindo o que está escrito no Dockerfile.

O container é essa imagem rodando. Quando eu uso o docker run, o Docker pega a imagem e liga ela, e aí o site fica no ar. Da mesma imagem dá para subir quantos containers eu quiser, e cada um fica isolado do outro.

Eu entendi comparando com programação: a imagem é a classe e o container é o objeto criado a partir dela.

## Evidência de funcionamento

Vídeo mostrando o build, o run e o site aberto no navegador: https://drive.google.com/file/d/1roaYx9669umdXpGBQp1iD1mIkiTsWFrY/view?usp=sharing

## IA utilizada

Usei o Claude (Anthropic) como apoio para montar a página e organizar o projeto, depois testei e revisei tudo por conta própria.
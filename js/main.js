(function () {
  var saida = document.getElementById('saida');
  var estado = document.getElementById('estado');
  var texto = document.getElementById('estadoTexto');
  var imagem = false;
  var container = null;

  function mostrar(linhas) {
    saida.textContent = linhas.join('\n');
  }

  function atualizar() {
    estado.className = 'estado';
    if (container === 'rodando') {
      estado.classList.add('on');
      texto.textContent = 'Container rodando. Site no ar em localhost:8080.';
    } else if (container === 'parado') {
      estado.classList.add('pronta');
      texto.textContent = 'Container parado. A imagem continua guardada.';
    } else if (imagem) {
      estado.classList.add('pronta');
      texto.textContent = 'Imagem pronta, ainda sem container.';
    } else {
      texto.textContent = 'Nenhuma imagem criada ainda.';
    }
  }

  var comandos = {
    build: function () {
      imagem = true;
      return ['$ docker build -t site-docker .', '=> [1/5] FROM nginx:alpine', '=> [2/5] COPY index.html', '=> [3/5] COPY css/ js/ img/', '=> naming to site-docker', 'Imagem criada.'];
    },
    run: function () {
      if (!imagem) return ['$ docker run -d --name meu-site -p 8080:80 site-docker', 'Erro: a imagem site-docker não existe. Rode o docker build antes.'];
      if (container) return ['$ docker run -d --name meu-site -p 8080:80 site-docker', 'Erro: já existe um container chamado meu-site. Remova com docker rm ou inicie o que já existe.'];
      container = 'rodando';
      return ['$ docker run -d --name meu-site -p 8080:80 site-docker', 'a3f9c1d2e4b7', 'Container criado e rodando.'];
    },
    ps: function () {
      var l = ['$ docker ps', 'NAME      IMAGE        PORTS                  STATUS'];
      if (container === 'rodando') l.push('meu-site  site-docker  0.0.0.0:8080->80/tcp  Up 5 seconds');
      else l.push('(nenhum container rodando)');
      return l;
    },
    stop: function () {
      if (container !== 'rodando') return ['$ docker stop meu-site', 'Não tem container rodando com esse nome.'];
      container = 'parado';
      return ['$ docker stop meu-site', 'meu-site', 'Container parado.'];
    },
    rm: function () {
      if (!container) return ['$ docker rm meu-site', 'Não existe container com esse nome.'];
      if (container === 'rodando') return ['$ docker rm meu-site', 'Erro: o container está rodando. Pare com docker stop antes.'];
      container = null;
      return ['$ docker rm meu-site', 'meu-site', 'Container removido.'];
    }
  };

  document.querySelectorAll('[data-cmd]').forEach(function (b) {
    b.addEventListener('click', function () {
      mostrar(comandos[b.dataset.cmd]());
      atualizar();
    });
  });
})();

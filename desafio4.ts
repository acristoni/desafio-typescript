// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB 
//para criar um organizador de filmes, mas desistiu 
// pois considerou o seu código inviável. 
//Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi 
//feito?

// A ideia dessa atividade é criar um aplicativo que: 
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela

// Todas as requisições necessárias para as atividades acima já estão prontas, 
// mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ 
// e seguir a documentação do site para entender como gera 
// uma API key https://developers.themoviedb.org/3/getting-started/introduction

//Chave da API (v3 auth):
//56b2ed065da87b235d821347a7093f8e
//Exemplo de Requisição de API:
//https://api.themoviedb.org/3/movie/550?api_key=56b2ed065da87b235d821347a7093f8e
//Token de Leitura da API (v4 auth):
//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmIyZWQwNjVkYTg3YjIzNWQ4MjEzNDdhNzA5M2Y4ZSIsInN1YiI6IjYyYWUxNjhmYTZhNGMxMDBlZjg3YTIyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YPljkNW-6uBTTdSJLJa40T77MB9NX_lIu7g1w1mcugE

var apiKey: string;//chave do usuario inserido na página
let requestToken: string;//VALOR SERÁ CRIADO QUANDO O BOTÃO DE LOGIN FOR USADO
let username: string;//dados do login do usuario inseridos na página
let password: string;//senha do usuario inseri do na pagina 
let sessionId: string;
let listId: string;
var method: string;

let loginButton = document.getElementById('login-button') as HTMLButtonElement;
let searchButton = document.getElementById('search-button') as HTMLButtonElement;
let searchContainer = document.getElementById('search-container');

if (loginButton !== null) {
    loginButton.addEventListener('click', async () => { //ATENÇÃO AQUI!!!- devolve o sessionID do usuário
    await criarRequestToken();
    await logar();
    await criarSessao();
    })//FUNÇÃO QUE PEGA OS DADOS DO USUARIO (PRIMEIRA FUNÇÃO)
}

if (searchButton !== null) {
    searchButton.addEventListener('click', async () => {//FUNÇÃO DO BOTÃO DE BUSCA DO FILME
    let lista = document.getElementById("lista");
    if (lista) {
        lista.outerHTML = "";
    }
    let quer = document.getElementById('search') as HTMLInputElement;
    let query:string = quer.value
    let listaDeFilmes = await procurarFilme(query);
    let ul = document.createElement('ul');
    ul.id = "lista"
    if (typeof listaDeFilmes === 'object' && listaDeFilmes != null) {
      for (const item of listaDeFilmes.results) {
          let li = document.createElement('li');
          li.appendChild(document.createTextNode(item.original_title))
          ul.appendChild(li)
      }
    }
    console.log(listaDeFilmes);
    if (searchContainer !== null) {
        searchContainer.appendChild(ul);
    }
    })
}

function preencherSenha() {//PEGA SENHA, ATIVADA NA 
  let senha = document.getElementById('senha') as HTMLInputElement;
  password = senha.value;
  validateLoginButton();
}

function preencherLogin() {
    let login = document.getElementById('login') as HTMLInputElement;
    username =  login.value;
    validateLoginButton();
}

function preencherApi() {
  let api_key = document.getElementById('api-key') as HTMLInputElement;
  apiKey = api_key.value;
  validateLoginButton();
}

function validateLoginButton() {
  if (password && username && apiKey && loginButton !== null) {
    loginButton.disabled = false;
  } else {
    if (loginButton !== null) {
        loginButton.disabled = true;
    }
  }
}

class HttpClient {
  static async get({url, method, body = 0}: {url: string, method: string, body: any}) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(method, url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        body = JSON.stringify(body);
      }
      request.send(body);
    })
  }
}

async function procurarFilme(query: string) {
  query = encodeURI(query)
  console.log(query)
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    method: "GET",
    body: null
  })
  return result
}

async function adicionarFilme(filmeId: string) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
    method: "GET",
    body: null
  })
  console.log(result);
}

async function criarRequestToken () {//CRIA TOKEN, ATIVADA NA (PRIMEIRA FUNÇÃO)
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: "GET",
    body: null
  })
  if (typeof result === 'object' && result != null) {
    requestToken = result.request_token
  }
}

async function logar() {//PASSA AS INFORMAÇÕES PARA O SERVIDOR PARA LOGAR, ATIVADA NA (1ª GUNÇÃO)
  await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    method: "POST",
    body: {
      username: `${username}`,
      password: `${password}`,
      request_token: `${requestToken}`
    }
  })
}

async function criarSessao() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    method: "GET",
    body: null
  })
  if (typeof result === 'object' && result != null) {
    sessionId = result.session_id;
  }
}

async function criarLista(nomeDaLista: string, descricao: string) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      name: nomeDaLista,
      description: descricao,
      language: "pt-br"
    }
  })
  console.log(result);
}

async function adicionarFilmeNaLista(filmeId: number, listaId: number) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      media_id: filmeId
    }
  })
  console.log(result);
}

async function pegarLista() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
    method: "GET",
    body: null
  })
  console.log(result);
}

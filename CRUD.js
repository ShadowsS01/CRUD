console.log(`Olá ${loggedUser !== null ? loggedUser : "pessoas"}!`);
console.log("#ConstruindoCRUDS");
// "MODELO"
const miniRedeSocial = {
  usuarios: [
    {
      username: loggedUser,
    },
  ],
  posts: [
    {
      id: Date.now(),
      owner: "DKSHS",
      content: "Bem vindo!!!",
    },
  ],
  readPosts() {
    miniRedeSocial.posts.forEach(({ id, owner, content }) => {
      miniRedeSocial.criaPost({ id, owner: owner, content: content }, true);
    });
  },
  criaPost(dados, htmlOnly = false) {
    const idInternoAqui = Date.now();
    if (!htmlOnly) {
      // Cria Posts na Memória (Array/Objeto)
      miniRedeSocial.posts.push({
        id: dados.id || idInternoAqui,
        owner: dados.owner,
        content: dados.content,
      });
    }
    // Cria Post no HTML
    $listaDePosts.insertAdjacentHTML(
      "afterbegin",
      `
          <li 
              data-id="${idInternoAqui}"
              class="space-y-2 border-t border-white/30 py-8"
          >
            ${
              loggedUser === dados.owner
                ? `
              <button 
                class="btn-delete px-1 py-1 rounded-md bg-red-600 hover:bg-red-600/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-600 duration-300"
              >
                Delete
              </button>
            `
                : ``
            }
            <span
            ${
              loggedUser === dados.owner
                ? `
              contenteditable
            `
                : `disabled`
            }
              class="tracking-wide leading-7 flex flex-row flex-wrap px-2 py-4 rounded-md bg-gray-600/50 border-2 border-white/50 hover:border-blue-600 focus:border-transparent focus:outline-none focus:ring focus:ring-blue-600 duration-300" 
            >
              ${dados.content}
            </span>
            <span id="error" class="text-red-600"></span>
          </li>
        `
    );
  },
  apagaPost(id) {
    const listaDePostsAtualizada = miniRedeSocial.posts.filter((postAtual) => {
      return postAtual.id !== Number(id);
    });
    console.log(listaDePostsAtualizada);
    miniRedeSocial.posts = listaDePostsAtualizada;
  },
  atualizaContentDoPost(id, novoConteudo) {
    const postQueVaiSerAtualizado = miniRedeSocial.posts.find((post) => {
      return post.id === Number(id);
    });
    console.log(postQueVaiSerAtualizado);
    if (novoConteudo !== "") {
      postQueVaiSerAtualizado.content = novoConteudo;
    }
  },
};

// [Código de Front End: Web]

// CRUD: [READ]
miniRedeSocial.readPosts();

// CRUD: [CREATE]
$formCriaPost.addEventListener(
  "submit",
  function criaPostController(infosDoEvento) {
    infosDoEvento.preventDefault();
    console.log("Estamos criando um post novo!");
    const $campoCriaPost = document.querySelector(
      'input[name="campoCriaPost"]'
    );
    if (!$campoCriaPost) {
      alert("Erro na página");
      window.location.reload();
    } else if ($campoCriaPost.value === "") {
      alert("Digite algo");
    } else {
      miniRedeSocial.criaPost({
        owner: loggedUser,
        content: $campoCriaPost.value,
      });
    }

    $campoCriaPost.value = "";
  }
);

// CRUD: [DELETE]
$listaDePosts.addEventListener("click", function (infosDoEvento) {
  console.log("Houve um click");
  const elementoAtual = infosDoEvento.target;
  const isBtnDeleteClick = elementoAtual.classList.contains("btn-delete");
  if (isBtnDeleteClick) {
    console.log("Clicou no botão de apagar");
    const id = elementoAtual.parentNode.getAttribute("data-id");

    // Manipula o lado do ServerSide/Banco De Dados/Arquivo/Fonte!
    miniRedeSocial.apagaPost(id);
    // Manipula a View/o Ouput e ...
    elementoAtual.parentNode.remove();

    console.log(miniRedeSocial.posts);
  }
});

// CRUD: [UPDATE]
$listaDePosts.addEventListener("input", function (infosDoEvento) {
  console.log("Houve uma digitação");
  const elementoAtual = infosDoEvento.target;
  const id = elementoAtual.parentNode.getAttribute("data-id");

  miniRedeSocial.atualizaContentDoPost(id, elementoAtual.innerText);
});

// ------ CRUD - JavaScript Básico ------

const miniTwitter = {
  usuarios: [
    {
      username: "DKSHS",
    },
  ],
  posts: [
    {
      id: 1,
      owner: "DKSHS",
      content: "Meu primeiro post",
    },
  ],
};
console.log(miniTwitter.posts);

// C - CREATE

function criaPost(dados) {
  miniTwitter.posts.push({
    id: miniTwitter.posts.length + 1,
    owner: dados.owner,
    content: dados.content,
  });
}
criaPost({ owner: "DKSHS", content: "Meu segundo post" });
criaPost({ owner: "DKSHS", content: "Meu terceiro post" });
criaPost({ owner: "DKSHS", content: "Meu quarto post" });
console.log(miniTwitter.posts);

// R - READ

function pegaPost() {
  return miniTwitter.posts;
}
console.log(pegaPost());

// U - UPDATE

function updateContentOfPost(id, newContent) {
  const targetPost = pegaPost().find((post) => {
    return post.id === id;
  });
  console.log(targetPost);
  targetPost.content = newContent;
}
updateContentOfPost(2, "Novo conteúdo do post");
console.log(miniTwitter.posts);

// D - DELETE

function deletePost(id) {
  const listaDePostsAtualizada = pegaPost().filter((postAtual) => {
    return postAtual.id !== id;
  });

  miniTwitter.posts = listaDePostsAtualizada;
  console.log(listaDePostsAtualizada);
}
deletePost(2);

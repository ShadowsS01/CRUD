if (loggedUser === null) {
  $formCriaPost.remove();
  $listaDePosts.remove();
  $titlePosts.innerText = "Faça login para ver os posts!";
  $forms.insertAdjacentHTML(
    "afterbegin",
    `
    <form id="formCriaUser" class="flex flex-col space-y-4">
      <input 
        class="px-2 py-2 rounded-md bg-gray-900 focus:outline-none focus:ring focus:ring-blue-600 duration-300"
        name="campoCriaUser"
        placeholder="Digite o seu usuário" />
      <button
        type="submit"
        class="font-medium w-full py-2 bg-blue-600/30 rounded-md hover:bg-blue-600/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-600 duration-300"
      >
        Criar usuário
      </button>
    </form>
  `
  );

  const $formCriaUser = document.querySelector("#formCriaUser");
  const $campoCriaUser = document.querySelector('input[name="campoCriaUser"]');
  $formCriaUser.addEventListener("submit", function criaUserController(e) {
    e.preventDefault();
    if ($campoCriaUser.value == "") {
      error = "Campo cria usuário não pode ser vazio!";
      $formCriaUser.insertAdjacentHTML(
        "beforeend",
        `
        <span class="text-red-600 selection:bg-red-600/20 text-center">${error}</span>
      `
      );
    } else {
      success = `Usuário ${$campoCriaUser.value} criado com sucesso.`;
      localStorage.setItem("LoggedUser", $campoCriaUser.value);
      $formCriaUser.insertAdjacentHTML(
        "beforeend",
        `
        <span class="text-green-600 selection:bg-green-600/20 text-center">${success}</span>
      `
      );
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  });
} else {
  $forms.insertAdjacentHTML(
    "afterbegin",
    `
      <div id="loggedUser" class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 items-center justify-center text-center">
        <span>Você está logado como: 
          <span class="underline underline-offset-2 text-blue-600">${loggedUser}</span>
        </span>
        <button 
          class="py-2 px-2 bg-red-600 rounded-md hover:bg-red-600/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-600 duration-300" 
          type="button" 
          id="disconnectUser"
        >
          Desconectar
        </button>
      </div>
  `
  );

  document.querySelector("#loggedUser").addEventListener("click", (e) => {
    console.log("Houve um click");

    const btnLogout = document.querySelector("#disconnectUser");
    if (!btnLogout) {
      alert("Erro na página");
      window.location.reload();
    } else {
      const elementoAtual = e.target;
      const isBtnLogout = elementoAtual.getAttribute("id") == "disconnectUser";
      if (isBtnLogout) {
        localStorage.removeItem("LoggedUser");
        window.location.reload();
      }
    }
  });
}

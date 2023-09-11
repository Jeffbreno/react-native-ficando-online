import api from "../api";

export async function pegarRepositoriosDoUsuario(login) {
  try {
    const resultado = await api.get(`/users/${login}/repos`);
    return resultado.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function salvarRepositoriosDoUsuario(postId, nome, data, id) {
  try {
    await api.put(`/repos/${id}`, {
      name: nome,
      data: data,
      postId: postId,
      id: id,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

//Esta pesquisa trás o repositório por parte da palavra
export async function pegarRepositoriosDoUsuarioPeloNome(login, nome) {
  //Pesquisar por trecho de palavra no campo nome
  try {
    // Realiza uma consulta para obter todos os repositórios do usuário (ou apropriada para sua API)
    const allRepository = await api.get(`/users/${login}/repos`);
    // Filtra os repositórios com base na parte do nome fornecida
    const repositoriosFiltrados = allRepository.data.filter((repositorio) => {
      const nomeRepositorio = repositorio.name.toLowerCase();
      return nomeRepositorio.includes(nome.toLowerCase());
    });

    return repositoriosFiltrados;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function criarRepositorio(postId, nome, data) {
  try {
    await api.post(`/repos`, {
      name: nome,
      data: data,
      postId: postId,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteRepositorio(id) {
  try {
    await api.delete(`/repos/${id}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

import api from "../api";

export async function pegarRepositoriosDoUsuario(id) {
  try {
    const resultado = await api.get(`/repos?postId=${id}`);
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
    return "sucesso";
  } catch (error) {
    console.log(error);
    return "erro";
  }
}

//Esta pesquisa trás o repositório por parte da palavra
export async function PegarRepositoriosDoUsuarioPeloNome(id, nome) {
  //Pesquisar por trecho de palavra no campo nome
  try {
    // Realiza uma consulta para obter todos os repositórios do usuário (ou apropriada para sua API)
    const allRepository = await api.get(`/repos?postId=${id}`);

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

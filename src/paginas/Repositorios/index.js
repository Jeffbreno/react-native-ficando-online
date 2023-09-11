import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, TextInput } from "react-native";
import estilos from "./estilos";
import { pegarRepositoriosDoUsuarioPeloNome, pegarRepositoriosDoUsuario } from "../../services/Repositorios/repositorios";
import { useIsFocused } from "@react-navigation/native";
import { formatDate } from "../../formatDate";

export default function Repositorios({ route, navigation }) {
  const [repo, setRepo] = useState([]);
  const [nomeRepo, setNomeRepo] = useState("");
  const estaNaTela = useIsFocused();

  const pegandoRepositorio = async () => {
    const resultado = await pegarRepositoriosDoUsuario(route.params.login);
    setRepo(resultado);
  };

  useEffect(() => {
    pegandoRepositorio();
  }, [estaNaTela]);

  async function buscarRepositorioPorNome() {
    const resultado = await pegarRepositoriosDoUsuarioPeloNome(route.params.login, nomeRepo);
    setRepo(resultado);
    setNomeRepo("");
    console.log("Busca feita com sucesso");
  }

  return (
    <View style={estilos.container}>
      <TextInput value={nomeRepo} onChangeText={setNomeRepo} placeholder="Busca Repositorio" autoCapitalize="none" style={estilos.entrada} />
      <TouchableOpacity onPress={buscarRepositorioPorNome} style={estilos.botao}>
        <Text style={estilos.textoBotao}>Buscar</Text>
      </TouchableOpacity>
      <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
      <TouchableOpacity style={estilos.botao} onPress={() => navigation.navigate("CriarRepositorio", { id: route.params.id })}>
        <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
      </TouchableOpacity>
      <FlatList
        data={repo}
        style={{ width: "100%" }}
        keyExtractor={(repo) => repo.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={estilos.repositorio} onPress={() => navigation.navigate("InfoRepositorio", { item })}>
            <Text style={estilos.repositorioNome}>{item.name}</Text>
            <Text style={estilos.repositorioData}>Criado em {formatDate(item.created_at)}</Text>
            <Text style={estilos.repositorioData}>Atualizado em {formatDate(item.updated_at)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import estilos from "./estilos";
import { salvarRepositoriosDoUsuario, deleteRepositorio } from "../../services/Repositorios/repositorios";
import { formatDate } from "../../formatDate";

export default function InfoRepositorio({ route, navigation }) {
  const [nome, setNome] = useState(route.params.item.name);
  const [data, setData] = useState(formatDate(route.params.item.created_at));

  async function salvar() {
    const resultado = await salvarRepositoriosDoUsuario(route.params.item.postId, nome, data, route.params.item.id);
    if (resultado) {
      Alert.alert("Repositorio atualizado!");
      console.log("Repositorio atualizado!");
      navigation.goBack();
    } else {
      Alert.alert("Erro ao atualizar repositorio!");
      console.log("Erro ao atualizar repositorio!");
    }
  }

  async function deletar() {
    const resultado = await deleteRepositorio(route.params.item.id);
    console.log(route.params.item.id);
    if (resultado) {
      Alert.alert("Repositorio deletado!");
      console.log("Repositorio deletado!");
      navigation.goBack();
    } else {
      Alert.alert("Erro ao excluir repositorio!");
      console.log("Erro ao excluir repositorio!");
    }
  }

  return (
    <View style={estilos.container}>
      <TextInput placeholder="Nome do repositório" autoCapitalize="none" style={estilos.entrada} value={nome} onChangeText={setNome} />
      <TextInput placeholder="Data de criação" autoCapitalize="none" style={estilos.entrada} value={data} onChangeText={setData} />
      <TouchableOpacity style={estilos.botao} onPress={salvar}>
        <Text style={estilos.textoBotao}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deletar} style={[estilos.botao, { backgroundColor: "#DD2B2B", marginTop: 10 }]}>
        <Text style={estilos.textoBotao}>Deletar</Text>
      </TouchableOpacity>
    </View>
  );
}

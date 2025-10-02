import { View, Text, Button, StyleSheet, FlatList, TextInput } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { db, initDb } from "../data/db";
const db = SQLite.openDatabase("atividades.db");

initDb();

function getTarefas() {
  return db.getAllSync("SELECT * FROM musculacao"); 
}

function insertTarefa(nome) {
  db.runSync("INSERT INTO tarefas(nome) VALUES (?)", [nome]);
}

function deleteTarefa(id) {
  db.runSync("DELETE FROM tarefas WHERE id = ?", [id]);
}

  
export default function Segunda() {
  const [texto, setTexto] = useState("");
  const [tarefas, setTarefas] = useState([]);

  function salvarTarefa() {
    const nome = texto.trim();
    if (!nome) return;
    insertTarefa(nome);
    setTexto("");
    carregarTarefas();
  }

  function carregarTarefas() {
    setTarefas(getTarefas());
  }

  function excluirTarefa(id) {
    deleteTarefa(id);
    carregarTarefas();
  }

  return (
   <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>musculaçao</Text>

      <View style={estilos.linhaEntrada}>
        <TextInput
          value={texto}
          onChangeText={setTexto}
          placeholder="Nova musculaçao..."
          style={estilos.campoTexto}
        />
        <Button title="Salvar" onPress={salvarTarefa} />
      </View>
              
  
      <Button title="Carregar tarefas" onPress={carregarTarefas} />

      <FlatList
        data={tarefas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={estilos.itemLinha}>
            <Text style={estilos.textoItem}>- {item.nome}</Text>
            <Button title="x" color="#b91c1c" onPress={() => excluirTarefa(item.id)} />
          </View>
        )}
      />
  
        <View style={estilos.rodape}>
        <Button title="Voltar" onPress={() => router.back()} />
        <Button title="Início" onPress={() => router.replace("/")} />
      </View>
    </SafeAreaView>
  );
}
 

  const estilos = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16 
  },
  titulo: { 
    fontSize: 18, 
    fontWeight: "600", 
    marginBottom: 8 
  },
  linhaEntrada: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 8, 
    gap: 8 
  },
  campoTexto: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  textoItem: { 
    fontSize: 16, 
    paddingVertical: 6 
  },
  itemLinha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  rodape: { 
    flexDirection: "row", 
    gap: 8, 
    marginTop: 8 
  },
});
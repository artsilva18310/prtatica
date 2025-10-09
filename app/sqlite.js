import { View, Text, Button, StyleSheet, FlatList, TextInput } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { db, initDb } from "../data/db.js";

initDb();

function getTarefas() {
  return db.getAllSync('SELECT * FROM tarefas');
}

function insertTarefa(nome) {
  db.runSync('INSERT INTO tarefas (atividade), (categoria) VALUES (?)', [nome]);
}

function deleteTarefa(id) {
  db.runSync('DELETE FROM tarefas WHERE id = ?', [id]);
}

function getTarefaById(id) {
  const [tarefa] = db.getAllSync('SELECT * FROM tarefas WHERE id = ?', [id]);
  return tarefa;
}
function updateTarefa(id, nome, categoria) {
  db.runSync('UPDATE tarefas SET atividade = ? WHERE id = ? categoria = ?', [nome, id, categoria]);
}
export default function sqlite() {
  const [atividade, setatividade] = useState("");
  const [categoria, setcategoria] = useState("");
  const [id, setid] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);


  function salvarTarefa() {
    const nome = texto.trim();
    if (!nome) return;
    insertTarefa(nome);
    setTexto("");
  }

  function editarTarefa(id) {
    const tarefa = getTarefaById(id);
    if (!tarefa) return;
    setTexto(tarefa.nome);
    setEditandoId(id);
  }



  function carregarTarefas() {
    setTarefas(getTarefas());
  }

  function atualizarTarefa() {
    const nome = texto.trim();
    if (!nome || !editandoId) return;
    updateTarefa(editandoId, nome);
    setTexto("");
    setEditandoId(null);
    carregarTarefas();
  }
  function excluirTarefa(id) {
    deleteTarefa(id);
    carregarTarefas();
  }
  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>Tarefas</Text>

      <View style={estilos.linhaEntrada}>
      
      
      
        <TextInput
          value={texto}
          onChangeText={setTexto}
          placeholder="Nova tarefa..."
          style={estilos.campoTexto}

        />

        <TextInput
          value={atividade}
          onChangeText={setatividade}
          placeholder="Novo exercicio..."
          style={estilos.campoTexto}
        />


        <TextInput
          value={categoria}
          onChangeText={setcategoria}
          placeholder="Nova Minutagem..."
          style={estilos.campoTexto}
        />
        <Button title="Salvar" onPress={salvarTarefa} />
        {<Button title="Editar" onPress={salvarTarefa} disabled={!!editandoId} /> /* converte para boolean */}
        <Button title="Atualizar" onPress={atualizarTarefa} disabled={!editandoId} />
        <Button title="Excluir" onPress={excluirTarefa} disabled={!editandoId} />
      </View>


      <Button title="Carregar treino" onPress={carregarTarefas} />

      <FlatList
        data={tarefas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={estilos.itemLinha}>
            <Text style={estilos.textoItem}>- {item.nome}</Text>
            <Button title="x" color="#f3eaeaff" onPress={() => excluirTarefa(item.id)} />
            <View style={estilos.acoesLinha}>
              <Button title="E" onPress={() => editarTarefa(item.id)} />
              <Button title="x" color="#b91c1c" onPress={() => excluirTarefa(item.id)} />
            </View>
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
    backgroundColor: '#f9f9f9',
    padding: 16,
  },

  titulo: { 
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: 'center',
    color: "#333",
  },

  titulo1: { 
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },

  linhaEntrada: { 
    flexDirection: "column",
    gap: 12,
    marginBottom: 24,
  },

  campoTexto: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    backgroundColor: "#fff",
  },

  itemLinha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  textoItem: { 
    fontSize: 16, 
    color: "#333",
    flex: 1,
  },

  acoesLinha: {
    flexDirection: "row",
    gap: 6,
  },

  rodape: { 
    flexDirection: "row", 
    justifyContent: "space-between",
    marginTop: 24,
  },
});
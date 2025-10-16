import { View, Text, Button, StyleSheet, FlatList, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { db, initDb } from "../data/db";

initDb();

function getTarefas(){
  return db.getAllSync('SELECT * FROM tarefas');
}

function insertTarefa(titulo, genero, ano){
  db.runSync( 'INSERT INTO tarefas (titulo, genero, ano) VALUES (?, ?, ?)', [titulo, genero, ano]);
}

function deleteTarefa(id) {
  db.runSync('DELETE FROM tarefas WHERE id = ?', [id]);
}

function getTarefaById(id) {
  const [tarefa] = db.getAllSync('SELECT * FROM tarefas WHERE id = ?', [id]);
  return tarefa;
}

function updateTarefa(id, titulo, genero, ano) {
  db.runSync('UPDATE tarefas (titulo, genero, ano) VALUES (?, ?, ?)', [titulo, genero, ano]);
}

function countTarefa() {
 const [resultado] = db.getAllSync('SELECT COUNT(*) as tt FROM tarefas');
 return resultado.tt;
}
export default function sqlite() {
  const [titulo, settitulo] = useState("");
  const [genero, setgenero] = useState("");
  const [ano, setano] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);


  function salvarTarefa() {

    const nome = titulo.trim();
    const ge = genero.trim();
    const an  = ano.trim();
    if (!nome || !ge || !an) return;
    insertTarefa(nome);
    settitulo("");
    setgenero("");
    setano("");


  }
 

  function editarTarefa(id) {
    const nome = getTarefaById(id);
    if (!nome) return;
    settitulo(nome.titulo);
    setgenero(nome.genero);
    setano(nome.ano);
    setEditandoId(id);
  }



  function carregarTarefas() {
    setTarefas(getTarefas());
  }

  function atualizarTarefa() {
    const nome = titulo.trim();
    const ge = genero.trim();
    const an  = ano.trim();
    if (!nome || !ge || !an) return;
    updateTarefa(editandoId, nome, ge, an);
    settitulo("");
    setgenero("");
    setano("");
    setEditandoId(null);
    carregarTarefas();

      useEffect(() => {
    carregarTarefa();
  }, []);

  useEffect(() => {
    const tt = countTarefas();
    setContador(tt);
  }, [tarefas]);

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
          value={titulo}
          onChangeText={settitulo}
          placeholder="Novo titulo..."
          style={estilos.campoTexto}

        />


        <TextInput
          value={genero}
          onChangeText={setgenero}
          placeholder="Novo genero..."
          style={estilos.campoTexto}
        />


        <TextInput
          value={ano}
          onChangeText={setano}
          placeholder="Novo ano..."
          style={estilos.campoTexto}
        />
       
        <Button title="Salvar" onPress={salvarTarefa} />
        <Button title="Atualizar" onPress={atualizarTarefa} disabled={!editandoId} />
   
      </View>
      <Button title="Carregar Filme" onPress={carregarTarefas} />

      <FlatList
        data={tarefas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={estilos.itemLinha}>
            <Text style={estilos.textoItem}>- {item.nome}, {item.ano},{item.genero}</Text>
            <View style={estilos.acoesLinha}></View>

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
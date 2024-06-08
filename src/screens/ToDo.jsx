import * as React from "react";
import { FlatList, StyleSheet, View, Alert } from "react-native";
import { Checkbox, FAB } from "react-native-paper";
import openDB from "../../db";

function Home({ route, navigation }) {
  const db = openDB();
  const [tarefas, setTarefas] = React.useState([]);

  async function fetchData() {
    const statement = await db.getAllAsync("select * from tarefas");
    const tasks = statement;
    setTarefas(tasks);
  }

  async function updateDate(tarefa) {
    const statement = await db.prepareAsync(
      "update tarefas set situacao = $situacao where id = $id"
    );
    const result = await statement.executeAsync({
      $situacao: tarefa.situacao,
      $id: tarefa.id,
    });
    if (result.lastInsertRowId !== null && tarefa.situcao == "C") {
      Alert.alert("Sucesso", "Tarefa Finalizada!", [
        {
          text: "OK",
        },
      ]);
    } else {
      Alert.alert("Sucesso", "Tarefa Pendente!", [
        {
          text: "OK",
        },
      ]);
    }
  }
  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [route.params?.refresh]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={tarefas}
        renderItem={({ item, index }) => (
          <Checkbox.Item
            label={item.descricao}
            status={item?.situacao == "P" ? "unchecked" : "checked"}
            labelStyle={
              item?.situacao == "P"
                ? {}
                : { textDecorationLine: "line-through" }
            }
            onPress={() => {
              const tempArr = [...tarefas];
              tempArr.splice(index, 1, {
                ...item,
                situacao: item.situacao == "P" ? "C" : "P",
              });
              setTarefas(tempArr);
              updateDate({
                id: item.id,
                situacao: item.situacao == "P" ? "C" : "P",
              });
            }}
          />
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("Cadastrar Tarefa")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Home;

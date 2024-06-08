import * as React from "react";
import openDB from "../../db";
import { View, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";

function CadastroTarefa({ navigation }) {
  const db = openDB();
  const criarTarefa = async () => {
    let statement = await db.prepareAsync(`
            insert into tarefas (descricao, situacao) values ($descricao, $situacao);
            `);
    try {
      let result = await statement.executeAsync({
        $descricao: text,
        $situacao: "P",
      });
      if (result.lastInsertRowId !== null) {
        Alert.alert("Sucesso", "Tarefa Salva!", [
          {
            text: "Ver tarefas",
            onPress: () =>
              navigation.navigate({
                name: "To Do",
                params: { refresh: true },
              }),
          },
        ]);
      }
    } catch (error) {
      console.log("Erro ao inserir a tarefa", error);
    }
  };
  const [text, setText] = React.useState("");
  return (
    <View
      style={{ flex: 1, gap: 10, padding: 10, justifyContent: "space-between" }}
    >
      <TextInput
        label="Descrição da Tarefa"
        value={text}
        onChangeText={(text) => setText(text)}
        mode="outlined"
      />
      <Button
        icon="content-save"
        mode="contained"
        onPress={() => criarTarefa()}
        compact={true}
      >
        Salvar
      </Button>
    </View>
  );
}

export default CadastroTarefa;

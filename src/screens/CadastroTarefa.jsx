import * as React from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

function CadastroTarefa() {
    const [text, setText] = React.useState("");

    return (
        <View style={{ flex: 1, gap: 10, padding: 10, justifyContent: 'space-between' }}>
            <TextInput
                label="Descrição da Tarefa"
                value={text}
                onChangeText={text => setText(text)}
                mode="outlined"
            />
            <Button icon="content-save" mode="contained" onPress={() => console.log('Pressed')} compact={true}>
                Salvar
            </Button>
        </View>
    );
}

export default CadastroTarefa;
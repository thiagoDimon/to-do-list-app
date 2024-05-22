import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Checkbox, FAB } from 'react-native-paper';

function Home({ navigation }) {
    const [listaObj, setListaObj] = React.useState([
        { a: 'test1', b: 'test2', c: 'test3', checked: false },
        { a: 'test111', b: 'test222', c: 'test333', checked: false },
    ]);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={listaObj}
                renderItem={({ item, index }) => (
                    <Checkbox.Item
                        label={item.a}
                        value={item.b}
                        status={item.checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            const tempArr = [...listaObj];
                            tempArr.splice(index, 1, { ...item, checked: !item.checked });
                            setListaObj(tempArr);
                        }}
                    />
                )}
            />
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('Cadastrar Tarefa')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})

export default Home;
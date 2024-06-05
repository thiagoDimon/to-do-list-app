import * as React from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { Checkbox, FAB } from 'react-native-paper';
import openDB from '../../db';

function Home({ navigation }) {
    const db = openDB();
    const [tarefas, setTarefas] = React.useState([]);

    async function fetchData() {
        const statement = await db.getAllAsync('select * from tarefas');
        const tasks = statement;
        setTarefas(tasks);
    }

    React.useEffect(() => {
        const recarregar = navigation.params?.refresh ?? false
        if (recarregar) {
            return fetchData()
        }
        return fetchData();
    }, [navigation.params?.refresh])

    return (
        <ScrollView style={{ flex: 1 }}>
            <FlatList
                data={tarefas}
                renderItem={({ item, index }) =>
                    <Checkbox.Item
                        label={item.descricao}
                        status={item?.situacao == 'P' ? 'unchecked' : 'checked'}
                        onPress={() => {
                            const tempArr = [...tarefas];
                            tempArr.splice(index, 1, { ...item, situacao: item.situacao == 'P' ? 'C' : 'P' });
                            setTarefas(tempArr);
                        }}
                    />
                }
            />
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('Cadastrar Tarefa')}
            />
        </ScrollView>
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
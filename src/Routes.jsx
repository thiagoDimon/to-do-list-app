import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ToDo from './screens/ToDo';
import CadastroTarefa from './screens/CadastroTarefa';

function Routes() {
    const stack = createStackNavigator()
    return (
        <NavigationContainer>
            <stack.Navigator initialRouteName='To Do'>
                <stack.Screen name='To Do' component={ToDo} />
                <stack.Screen name='Cadastrar Tarefa' component={CadastroTarefa} />
            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;
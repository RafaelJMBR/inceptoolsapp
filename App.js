import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './screens/HomeScreen'
import FreteCuritibaScreen from './screens/FreteCuritibaScreen'
import FreteCepScreen from './screens/FreteCepScreen'
import TarefasScreen from './screens/TarefasScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'IncepTools' }}
        />
        <Stack.Screen
          name="FreteCuritiba"
          component={FreteCuritibaScreen}
          options={{ title: 'Frete - Curitiba' }}
        />
        <Stack.Screen
          name="FreteCep"
          component={FreteCepScreen}
          options={{ title: 'Frete - Por CEP' }}
        />
        <Stack.Screen
          name="Tarefas"
          component={TarefasScreen}
          options={{ title: 'Quadro de Tarefas' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

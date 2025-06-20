import { CurrentRenderContext } from '@react-navigation/native'
import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { Image } from 'react-native'
import logo from '../assets/logo.png'

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={{
          width: 150,
          height: 150,
          alignSelf: 'center',
          marginBottom: 5
        }}
      />
      <Text style={styles.title}>IncepTools</Text>
      <View style={styles.button}>
        <Button
          title="Frete - Curitiba"
          onPress={() => navigation.navigate('FreteCuritiba')}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Frete - Por Cep"
          onPress={() => navigation.navigate('FreteCep')}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Quadro de Tarefas"
          onPress={() => navigation.navigate('Tarefas')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: 'bold'
  },
  Button: {
    marginVertical: 10
  }
})

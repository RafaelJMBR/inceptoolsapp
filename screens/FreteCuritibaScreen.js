import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView
} from 'react-native'

export default function FreteCuritibaScreen() {
  const [distancia, setDistancia] = useState('')
  const [precoGasolina, setPrecoGasolina] = useState('')
  const [eficiencia, setEficiencia] = useState('10')
  const [resultado, setResultado] = useState(null)

  const calcularFrete = () => {
    const dist = parseFloat(distancia)
    const preco = parseFloat(precoGasolina)
    const ef = parseFloat(eficiencia)

    if (isNaN(dist) || isNaN(preco) || isNaN(ef)) {
      setResultado('Preencha todos os campos corretamente.')
      return
    }

    const frete = ((dist * 2) / ef) * preco
    setResultado(`Frete estimado: R$ ${frete.toFixed(2)}`)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Distância (Ida) em KM:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={distancia}
        onChangeText={setDistancia}
      />
      <Text style={styles.label}>Preço da gasolina (R$):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={precoGasolina}
        onChangeText={setPrecoGasolina}
      />

      <Text style={styles.label}>Eficiência do veículo (KM/L):</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={eficiencia}
          onValueChange={itemValue => setEficiencia(itemValue)}
        >
          <Picker.Item label="Palio" value="10" />
          <Picker.Item label="Siena" value="10" />
          <Picker.Item label="Fox" value="8" />
        </Picker>
      </View>

      <View style={styles.Button}>
        <Button title="Calcular Frete" onPress={calcularFrete} />
      </View>

      {resultado && <Text style={styles.resultado}>{resultado}</Text>}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff'
  },
  label: {
    fontSize: 16,
    marginTop: 12
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 4,
    borderRadius: 4
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginTop: 4
  },
  button: {
    marginTop: 20
  },
  resultado: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold'
  }
})

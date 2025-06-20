import React, { useState } from 'react'
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TextInput
} from 'react-native'
import { Picker } from '@react-native-picker/picker'

export default function FreteCepScreen() {
  const [cep, setCep] = useState('')
  const [products, setProducts] = useState([])
  const [opcoes, setOpcoes] = useState([])
  const [freteBuscado, setFreteBuscado] = useState(false)
  const [produtoSelecionado, setProdutoSelecionado] = useState('')

  function handleSelecionarProduto(tipo) {
    setProdutoSelecionado(tipo)
    switch (tipo) {
      case 'caneca':
        setProducts([
          {
            weight: 0.6,
            height: 10,
            width: 10,
            length: 12,
            insurance_value: 30,
            quantity: 1
          }
        ])
        break
      case 'camiseta':
        setProducts([
          {
            weight: 0.25,
            height: 2,
            width: 25,
            length: 30,
            insurance_value: 49,
            quantity: 1
          }
        ])
        break
      case 'geral':
        setProducts([
          {
            weight: 1.2,
            height: 15,
            width: 15,
            length: 15,
            insurance_value: 150,
            quantity: 1
          }
        ])
        break
      default:
        setProducts([])
    }
  }

  async function buscarFretes() {
    try {
      const resposta = calcularFreteSimulado(cep, products)
      setOpcoes(resposta || [])
      setFreteBuscado(true)
    } catch (err) {
      console.error('Erro ao simular fretes:', err)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cálculo de Frete - Simulação</Text>

      <Text style={styles.label}>Escolha um produto:</Text>
      <Picker
        selectedValue={produtoSelecionado}
        onValueChange={handleSelecionarProduto}
        style={styles.picker}
      >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Caneca de Porcelana" value="caneca" />
        <Picker.Item label="Camiseta" value="camiseta" />
        <Picker.Item label="Caixa Geral 15x15" value="geral" />
      </Picker>

      <TextInput
        placeholder="Digite o CEP de destino"
        value={cep}
        onChangeText={setCep}
        style={styles.input}
        keyboardType="numeric"
      />

      <Button title="Buscar fretes" onPress={buscarFretes} />

      {freteBuscado && (
        <View style={styles.resultado}>
          <Text style={styles.resultTittle}>Opções de Frete:</Text>
          {opcoes.map((opt, index) => (
            <View
              key={index}
              style={[
                styles.card,
                { backgroundColor: coresCards[index % coresCards.length] }
              ]}
            >
              <Text style={styles.cardText}>
                Transportadora: {opt.company.name}
              </Text>
              <Text style={styles.cardText}>
                Preço: R$ {Number(opt.price).toFixed(2)}
              </Text>
              <Text style={styles.cardText}>Prazo: {opt.delivery_time}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  )
}

function calcularFreteSimulado(cepDestino, produtos) {
  const pesoTotal = produtos.reduce(
    (soma, p) => soma + p.weight * p.quantity,
    0
  )
  const prefixo = parseInt(cepDestino.substring(0, 3))
  let distanciaEstimadaKm = 0

  if (prefixo < 100) distanciaEstimadaKm = 15
  else if (prefixo < 200) distanciaEstimadaKm = 50
  else if (prefixo < 500) distanciaEstimadaKm = 150
  else distanciaEstimadaKm = 300

  const base = 5
  const custoKm = 0.6
  const custoPeso = 2.5
  const preco = base + distanciaEstimadaKm * custoKm + pesoTotal * custoPeso

  return [
    {
      company: { name: 'Sedex' },
      price: preco * 1.1,
      delivery_time: '1 a 2 dias úteis'
    },
    {
      company: { name: 'Loggi' },
      price: preco * 0.9,
      delivery_time: '3 a 5 dias úteis'
    },
    {
      company: { name: 'PAC' },
      price: preco * 0.75,
      delivery_time: '5 a 7 dias úteis'
    }
  ]
}

const coresCards = ['#dcedc8', '#b2dfdb', '#ffe082']

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  label: {
    marginBottom: 6,
    fontWeight: 'bold'
  },
  picker: {
    marginBottom: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 12,
    borderRadius: 4
  },
  resultado: {
    marginTop: 20
  },
  resultTittle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    elevation: 2
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4
  }
})

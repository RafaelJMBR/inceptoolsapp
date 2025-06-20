import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'

export default function TarefasScreen() {
  const [novaTarefa, setNovaTarefa] = useState('')
  const [tarefas, setTarefas] = useState({
    paraFazer: [],
    emAndamento: [],
    concluido: []
  })

  useEffect(() => {
    carregarTarefas()
  }, [])

  const salvarTarefas = async novas => {
    try {
      await AsyncStorage.setItem('tarefas', JSON.stringify(novas))
    } catch (e) {
      console.error('Erro ao salvar tarefas:', e)
    }
  }

  const carregarTarefas = async () => {
    try {
      const dados = await AsyncStorage.getItem('tarefas')
      if (dados) {
        setTarefas(JSON.parse(dados))
      }
    } catch (e) {
      console.error('Erro ao carregar tarefas:', e)
    }
  }

  const adicionarTarefa = () => {
    if (!novaTarefa.trim()) return

    const nova = {
      id: Date.now().toString(),
      texto: novaTarefa
    }
    const atualizadas = {
      ...tarefas,
      paraFazer: [...tarefas.paraFazer, nova]
    }
    setTarefas(atualizadas)
    salvarTarefas(atualizadas)
    setNovaTarefa('')
  }

  const excluirTarefa = (id, chave) => {
    const atualizadas = {
      ...tarefas,
      [chave]: tarefas[chave].filter(t => t.id !== id)
    }
    setTarefas(atualizadas)
    salvarTarefas(atualizadas)
  }

  const moverTarefasEntreColunas = (id, origem, destino) => {
    const tarefa = tarefas[origem].find(t => t.id === id)
    const atualizadas = {
      ...tarefas,
      [origem]: tarefas[origem].filter(t => t.id !== id),
      [destino]: [...tarefas[destino], tarefa]
    }
    setTarefas(atualizadas)
    salvarTarefas(atualizadas)
  }

  const moverTarefaDentroDaColuna = (chave, index, direcao) => {
    const lista = [...tarefas[chave]]
    const novaPos = index + direcao
    if (novaPos < 0 || novaPos >= lista.length) return

    const temp = lista[index]
    lista[index] = lista[novaPos]
    lista[novaPos] = temp

    const atualizadas = {
      ...tarefas,
      [chave]: lista
    }
    setTarefas(atualizadas)
    salvarTarefas(atualizadas)
  }

  const renderColuna = (titulo, chave, proxima) => (
    <View
      key={chave}
      style={[styles.colunaVertical, { backgroundColor: coresColunas[chave] }]}
    >
      <Text style={styles.tituloColuna}>{titulo}</Text>
      {tarefas[chave].map((item, index) => (
        <View key={item.id} style={styles.tarefa}>
          <View style={styles.botoesEsquerda}>
            <TouchableOpacity
              onPress={() => moverTarefaDentroDaColuna(chave, index, -1)}
              style={[styles.botaoMover, { backgroundColor: '#a29bfe' }]}
            >
              <Text>↑</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => moverTarefaDentroDaColuna(chave, index, 1)}
              style={[styles.botaoMover, { backgroundColor: '#a29bfe' }]}
            >
              <Text>↓</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.tarefaTexto}>{item.texto}</Text>

          <View style={styles.botoesDireita}>
            {proxima && (
              <TouchableOpacity
                onPress={() =>
                  moverTarefasEntreColunas(item.id, chave, proxima)
                }
                style={[styles.botaoMover, { backgroundColor: '#55efc4' }]}
              >
                <Text>→</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => excluirTarefa(item.id, chave)}
              style={styles.botaoExcluir}
            >
              <Text style={{ color: 'white' }}>🗑</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  )

  const coresColunas = {
    paraFazer: '#fce4ec',
    emAndamento: '#fff3f0',
    concluido: '#e8f5e9'
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Quadro de Tarefas</Text>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Nova Tarefa"
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />
        <Button title="Adicionar" onPress={adicionarTarefa} />
      </View>
      <View style={styles.quadro}>
        {renderColuna('Para Fazer', 'paraFazer', 'emAndamento')}
        {renderColuna('Em Andamento', 'emAndamento', 'concluido')}
        {renderColuna('Concluído', 'concluido', null)}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12
  },
  inputArea: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    borderColor: '#ccc',
    minHeight: 40,
    maxHeight: 100
  },
  quadro: {
    gap: 20
  },
  colunaVertical: {
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  tituloColuna: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
  },
  tarefa: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
    flexWrap: 'wrap'
  },
  tarefaTexto: {
    flex: 1,
    flexWrap: 'wrap',
    marginHorizontal: 6
  },
  botoesEsquerda: {
    flexDirection: 'column',
    gap: 4
  },
  botoesDireita: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center'
  },
  botaoMover: {
    borderRadius: 4,
    padding: 4,
    marginLeft: 4
  },
  botaoExcluir: {
    backgroundColor: '#e74c3c',
    borderRadius: 4,
    padding: 4,
    marginLeft: 4
  }
})

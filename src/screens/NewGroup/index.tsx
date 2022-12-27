import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Container, Content, Icon } from './styles'

import { groupCreate } from '@storage/group/groupCreate'

import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Hightlight'
import { Input } from '@components/Input'
import { AppError } from '@utils/AppError'
import { Alert } from 'react-native'

export function NewGroup() {
  const [group, setGroup] = useState('')

  const navigation = useNavigation();

  async function handleNewGroup() {
    try {

      if(group.trim().length === 0) {
        return Alert.alert('Erro ao criar grupo', 'Informe o nome da turma')
      } 

      await groupCreate(group)
      navigation.navigate('players', { group })

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Erro ao criar grupo', `${error.message}`)
      } else {
        Alert.alert('Erro ao criar grupo', 'Não foi possível criar a nova turma, verifique os dados e tente novamente!')
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas."
        />

        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
        />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNewGroup}
        />

      </Content>

    </Container>
  )
}
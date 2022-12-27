import { useState, useCallback } from 'react'
import { Alert, FlatList } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { GroupsGetAll } from '@storage/group/groupsGetAll'

import { GroupCard } from '@components/GroupCard'
import { Header } from '@components/Header'
import { Highlight } from '@components/Hightlight'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'

import { Container } from './styles'
import { Loading } from '@components/Loading'

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('newgroup')
  }

  async function fetchGroups() {

    try {
      const data = await GroupsGetAll();
      setGroups(data);

    } catch (error) {
      Alert.alert('Erro ao carregar', 'Não foi possível carregar a lista de turmas, tente novamente!')
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, [groups]));

  return (
    <Container>
      <Header />

      <Highlight
        title='Turmas'
        subtitle='jogue com a sua turma'
      />

        <FlatList
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard
              title={item}
              onPress={() => handleOpenGroup(item)}
            />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() =>
            <ListEmpty
              message='Ops, sua lista está vazia! Cadastre a primeira turma'
            />
          }
        />

      <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
      />

    </Container>
  )
}
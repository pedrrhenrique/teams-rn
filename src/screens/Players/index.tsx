import { useEffect, useState, useRef } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'

import { ButtonIcon } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { Header } from '@components/Header'
import { Highlight } from '@components/Hightlight'
import { Input } from '@components/Input'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'

import { AppError } from '@utils/AppError'

import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { PlayerAddByGroup } from '@storage/player/playerAddByGroup'
import { PlayersGetByGroupAndTeam } from '@storage/player/PlayersGetByGroupAndTeam'
import { PlayerRemoveByGroup } from '@storage/player/playerRemoveByGroup'
import { GroupRemoveByName } from '@storage/group/groupRemoveByName'

import { Container, Form, HeaderList, QuantityPlayers } from './styles'

interface RoutesProps {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const { group } = useRoute().params as RoutesProps;

  const navigation = useNavigation();

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Erro ao adicionar', 'Infome o nome da pessoa.')
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await PlayerAddByGroup(newPlayer, group)

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName('');
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Erro ao adicionar', error.message)
      } else {
        Alert.alert('Erro ao adicionar', 'N??o foi poss??vel adicionar esta pessoa, verifique os dados e tente novamente!')
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)
      const playersByTeam = await PlayersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      Alert.alert('Erro ao carregar', 'N??o foi poss??vel carregar a lista, tente novamente!')
    } finally {
      setIsLoading(false)

    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await PlayerRemoveByGroup(playerName, group)
      fetchPlayersByTeam();

    } catch (error) {
      Alert.alert('Erro ao remover', 'N??o foi poss??vel remover a pessoa, verifique os dados e tente novamente!')
    }
  }

  async function groupRemove() {
    try {
      await GroupRemoveByName(group)
      navigation.navigate('groups')
    } catch (error) {
      Alert.alert('Erro ao remover', 'N??o foi poss??vel ao remover a turma, tente novamente!')
    }
  }

  async function handleRemoveGroup() {
    Alert.alert(
      'Esta a????o n??o poder?? ser desfeita',
      'Tem certeza que deseja remover este grupo?',
      [
        {
          text: 'N??o', style: 'cancel'
        },
        {
          text: 'Sim', onPress: () => groupRemove()
        }
      ]
    )
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle='adicione a galera e separe os grupos'
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder='Nome da pessoa'
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon
          icon='add'
          onPress={handleAddPlayer}
        />

      </Form>


      <HeaderList >
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />

          )}
          horizontal
        />
        <QuantityPlayers>
          {players.length}
        </QuantityPlayers>
      </HeaderList>

      {isLoading ? <Loading /> :
        <FlatList
          data={players}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <ListEmpty message='N??o h?? pessoas nesse time! Adicione-as.' />
          )}
          contentContainerStyle={[
            { paddingBottom: 50 },
            players.length === 0 && { flex: 1 }
          ]}
        />
      }

      <Button
        title='Remover turma'
        type='RED'
        onPress={handleRemoveGroup}
      />

    </Container>
  )
}

import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppError } from '@utils/AppError'

import { PLAYER_COLLECTION } from '@storage/storage.config'

import { PlayerStorageDTO } from './PlayerStorageDTO'
import { PlayersGetByGroup } from './playersGetByGroup'


export async function PlayerAddByGroup( newPlayer: PlayerStorageDTO, group: string) {
  try {

    const storedPlayers = await PlayersGetByGroup(group)

    const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name)

    if( playerAlreadyExists.length > 0 ) {
      throw new AppError('Essa pessoa já consta na lista de algum dos times!')
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer])
    
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)

  } catch (error) { 
      throw error
  }
}



import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storage.config'
import { AppError } from '@utils/AppError';
import { GroupsGetAll } from './groupsGetAll'

export async function groupCreate(newGroup: string) {
  try {
    const storedGroups = await GroupsGetAll();

    const groupAlreadyExists = storedGroups.includes(newGroup)

    if (groupAlreadyExists) {
      throw new AppError('Turma com mesmo nome já existente!')
    }

      const storage = JSON.stringify([...storedGroups, newGroup])

      await AsyncStorage.setItem(GROUP_COLLECTION, storage)
  } catch (error) {
    throw error
  }
}
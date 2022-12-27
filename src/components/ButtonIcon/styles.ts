
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import styled from 'styled-components/native'

export type ButtonIconTypeStyleProps = 'ADD' | 'REM'

interface Props {
  type: ButtonIconTypeStyleProps
}

export const Container = styled(TouchableOpacity)`
  width: 56;
  height: 56;
  margin-left: 12px;

  justify-content: center;
  align-items: center;
`

export const Icon = styled(MaterialIcons).attrs<Props>(({ theme, type }) => ({
  size: 24,
  color: type === 'ADD' ? theme.COLORS.GREEN_700 : theme.COLORS.RED
}))``
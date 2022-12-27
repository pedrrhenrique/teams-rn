
import { TouchableOpacityProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { ButtonIconTypeStyleProps, Container, Icon } from './styles'

interface Props extends TouchableOpacityProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconTypeStyleProps
}

export function ButtonIcon({ icon, type = 'ADD', ...rest }: Props) {
  return(
    <Container {...rest} >
      <Icon name={icon} type={type} />
    </Container>
  )
}
import { Container, Logo, BackIcon, BackButton, BackContainer } from './styles'
import { TouchableOpacityProps } from 'react-native'

import logoImg from '@assets/logo.png'
import { useNavigation } from '@react-navigation/native';

interface Props extends TouchableOpacityProps {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false }: Props) {

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.navigate('groups')
  }

  return (
    <Container>
{     showBackButton &&
        <BackContainer >
          <BackButton onPress={handleGoBack}  >
            <BackIcon />
          </BackButton>
        </BackContainer>
}
      <Logo source={logoImg} />
    </Container>
  )
}
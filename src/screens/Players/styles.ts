
import styled, { css } from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context';


export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  padding: 24px;
`

export const Form = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  border-radius: 6px;

  flex-direction: row;
  justify-content: center;
`

export const HeaderList = styled.View`
  width: 100%;
  margin: 32px 0 12px;

  flex-direction: row;
  align-items: center;
`

export const QuantityPlayers = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.GRAY_200};
  `}
`
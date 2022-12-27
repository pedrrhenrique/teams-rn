
import styled, { css } from 'styled-components/native'
import { TextInput } from 'react-native'


export const Container = styled(TextInput).attrs(({ theme }) => ({
  // placeholderTextColor: theme.COLORS.GRAY_300
}))`
  ${({ theme }) => css`
      font-family: ${theme.FONT_FAMILY.REGULAR};
      font-size: ${theme.FONT_SIZE.MD}px;
      background-color: ${theme.COLORS.GRAY_700};
      color: ${theme.COLORS.WHITE};
  `}
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  border-radius: 6px;
  padding: 16px;
`
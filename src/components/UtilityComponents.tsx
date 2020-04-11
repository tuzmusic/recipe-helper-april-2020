import styled from "@emotion/styled";

export const SimpleBorderedContainer = styled.div({
  border: 'solid black thin',
  padding: 10,
  margin: '10px 0'
});
export const Section = styled.div({
  border: 'solid black thin',
  padding: 10,
  margin: 10,
  display: 'flex',
  flexDirection: 'column'
});
export const RowSection = styled(Section)({
  flexDirection: 'row'
});
export const CenterFlexRow = styled.div<{
  bordered?: boolean
  vMargin?: boolean
  hMargin?: boolean
  margin?: boolean
  padding?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
}>({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
}, props =>
  Object.assign({},
    props.bordered && { border: 'solid thin black' },
    props.vMargin && { marginTop: 10, marginBottom: 10 },
    props.hMargin && { marginLeft: 10, marginRight: 10 },
    props.margin && { margin: 10 },
    props.padding && { padding: 10 },
    props.fullWidth && { width: '100%' },
    props.fullHeight && { height: '100%' },
  ))
export const CenterFlexColumn = styled(CenterFlexRow)({ flexDirection: 'column' })

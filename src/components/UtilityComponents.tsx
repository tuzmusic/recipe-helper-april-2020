import styled from "@emotion/styled";

export const SimpleBorderedContainer = styled.div({
  border: 'solid black thin',
  padding: 10,
  margin: 10
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

import { CookingTimerState } from "../../../models/Models";
import React from "react";
import styled from "@emotion/styled";
import { CenterFlexRow } from "../../UtilityComponents";
import { keyframes } from "@emotion/core";
import { GiCancel } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { setTimerState } from "../../../redux/cookingSessionSlice";
import { AppStepTimer } from "../../../redux/state/stateMap";

const BackgroundBlink = keyframes`
  from { background-color: red }
  to { background-color: transparent }
`

const DoneTimerWrapper = styled(CenterFlexRow)({
  padding: 5,
  margin: 2,
  background: 'red',
  width: '100%',
  animation: `${ BackgroundBlink } 1s infinite`
})

const CancelWrapper = styled.div({
  position: 'absolute',
  right: 10,
})

const Cancel = styled(GiCancel)({
  display: 'flex',
  opacity: 0.4
})

type Props = {
  timer: AppStepTimer,
  clearTimer: () => void
}

const DoneTimer = ({ timer, clearTimer }: Props) =>
  <CenterFlexRow fullWidth onClick={ clearTimer }>
    <DoneTimerWrapper>DONE: { timer.label }</DoneTimerWrapper>
    <CancelWrapper children={ <Cancel size={ '1.3em' }/> }/>
  </CenterFlexRow>

const DoneTimerContainer = ({ timer }: { timer: AppStepTimer }) => {
  const dispatch = useDispatch();
  
  return <DoneTimer
    timer={ timer }
    clearTimer={ () => dispatch(setTimerState({ timer, timerState: CookingTimerState.Pending })) }
  />
}
export default DoneTimerContainer

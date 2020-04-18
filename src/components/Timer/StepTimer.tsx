import { CookingTimerState, StepTimer } from "../../models/Models";
import React from "react";
import styled from "@emotion/styled";
import Timer from "react-compound-timer";
import { CenterFlexRow } from "../UtilityComponents";
import { AppDispatch } from "../../redux/store";
import { setTimerState } from "../../redux/cookingSessionSlice";
import { connect } from "react-redux";

const TimerWrapper = styled.div({
  textAlign: 'center',
})

const StepTimerButton = styled.button({
  borderRadius: 50,
  height: '60px',
  width: '60px',
  display: 'block',
  fontSize: 18
})
const DurationWrapper = styled(CenterFlexRow)({
  width: '100%',
})

type Props = {
  timer: StepTimer
  startTimer?: any // FIXME
};
const StepTimerComponent = ({ timer, startTimer }: Props) =>
  <TimerWrapper>
    { timer.label }
    <StepTimerButton onClick={ startTimer }>
      <Timer direction="backward" initialTime={ timer.durationSec * 1000 }
             startImmediately={ timer.state === CookingTimerState.Running }
      >{/* Any actual whitespace between the closing carat and the opening brace will BREAK the timer display */ }
        { ({ start, resume, pause, stop, reset, timerState }: any) =>
          <CenterFlexRow>
            <DurationWrapper>
              <Timer.Minutes/>:
              <Timer.Seconds formatValue={ (v: number) => `${ v }`.padStart(2, "0") }/>
            </DurationWrapper>
          </CenterFlexRow>
        }{/* Any actual whitespace between the closing carat and the opening brace will BREAK the timer display */ }
      </Timer>
    </StepTimerButton>
  </TimerWrapper>

const actions = (dispatch: AppDispatch, { timer }: Props) => ({
  startTimer: () => dispatch(setTimerState({ timer, timerState: CookingTimerState.Running }))
})

const StepTimerContainer = connect(null, actions)(StepTimerComponent)
export default StepTimerContainer

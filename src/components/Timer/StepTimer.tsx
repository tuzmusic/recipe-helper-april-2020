import { CookingTimerState, StepTimer } from "../../models/Models";
import React from "react";
import styled from "@emotion/styled";
import Timer from "react-compound-timer";
import { CenterFlexRow } from "../UtilityComponents";
import { AppDispatch } from "../../redux/store";
import { setTimerState } from "../../redux/cookingSessionSlice";
import { connect } from "react-redux";

type Props = {
  timer: StepTimer
  startTimer: Function
};

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
const StepTimerComponent = ({ timer, startTimer }: Props) =>
  <TimerWrapper>
    { timer.label }
    <StepTimerButton onClick={ () => startTimer(timer) }>
      <Timer direction="backward"
             initialTime={ timer.durationSec * 1000 }
             startImmediately={ timer.state === CookingTimerState.Running }
        // checkpoints={ [{ time: 0, callback: () => {/* handle timer completion */} }] }
      > {
        ({ start, stop, reset, getTime, ...timerProps }: any) =>
          <CenterFlexRow>
            { getTime() <= 0 ? "Done!" :
              <DurationWrapper>
                <Timer.Minutes/>:
                <Timer.Seconds formatValue={ (v: number) => `${ v }`.padStart(2, "0") }/>
              </DurationWrapper>
            }
            {/*
          <button onClick={ start }>Start</button>
          <button onClick={ stop }>Stop</button>
          <button onClick={ reset }>Reset</button>
          <button onClick={ () => clearTimer(timer) }>Clear</button>
*/ }
          </CenterFlexRow>
      } </Timer>
    </StepTimerButton>
  </TimerWrapper>

const actions = (dispatch: AppDispatch) => ({
  startTimer: (timer: StepTimer) => dispatch(
    setTimerState({ timer, timerState: CookingTimerState.Running })
  )
})

const StepTimerContainer = connect(null, actions)(StepTimerComponent)
export default StepTimerContainer

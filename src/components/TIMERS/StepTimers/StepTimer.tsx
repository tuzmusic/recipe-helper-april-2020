import React from "react";
import styled from "@emotion/styled";
import Timer from "react-compound-timer";
import { CenterFlexColumn, CenterFlexRow } from "../../UtilityComponents";
import { setTimerState } from "../../../redux/cookingSessionSlice";
import { useDispatch } from "react-redux";
import { MdCancel, MdPause, MdPlayArrow } from 'react-icons/md'
import { AppStepTimer, CookingTimerState } from "../../../redux/state/stateMap";

const TimerWrapper = styled.div({})

const TimerLabel = styled.div({
  textAlign: 'center',
  fontFamily: 'sans-serif',
  fontSize: '14px',
  paddingBottom: 3
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

const IconsWrapper = styled(CenterFlexRow)({
  width: '100%',
  justifyContent: 'space-between'
})

type Props = {
  timer: AppStepTimer
  startTimer: () => void
  pauseTimer: () => void
  timerDone: () => void
  clearTimer: () => void
};

const StepTimerComponent = (props: Props) => {
  const { timer, startTimer, pauseTimer, clearTimer, timerDone } = props
  
  // add 100ms buffer so that react-compound-timer displays the first few seconds correctly
  const initialTime = timer.durationSec * 1000 + 100;
  
  return <Timer
    direction="backward"
    initialTime={ initialTime }
    startImmediately={ timer.state === CookingTimerState.Running }
    onStart={ startTimer }
    onResume={ startTimer }
    onPause={ pauseTimer }
    onReset={ clearTimer }
    checkpoints={ [{ time: 0, callback: timerDone }] }
  >{ ({ start, resume, pause, stop, reset, timerState, state, ...timerProps }: any) => {
    
    /* NOTE: react-compound-timer uses the 'state' variable
    * which is pretty close to my state. They are 'PAUSED, PLAYING, STOPPED` as
    * far as I can tell, although there doesn't appear to be a distinction between
    * STOPPED and 'done'. When a timer hasn't been started its state is undefined.
    * For now I'll use my own definition of timer state to render the buttons/timer
    * and use the react-compound-timer to run the timer itself, but it may be worth
    * just using their state in the future, or redefining the values (strings) for my
    * enum.
    * */
    let iconSize = '1.5em';
    const controls = {
      [CookingTimerState.Pending]: <MdPlayArrow size={ iconSize } onClick={ start }/>,
      [CookingTimerState.Paused]: <MdPlayArrow size={ iconSize } onClick={ resume }/>,
      [CookingTimerState.Running]: <MdPause size={ iconSize } onClick={ pause }/>,
      [CookingTimerState.Done]: <MdPlayArrow size={ iconSize } onClick={ start }/>,
    }
    
    return <TimerWrapper>
      <TimerLabel children={ timer.label }/>
      <StepTimerButton onClick={ start }>
        <CenterFlexColumn>
          <DurationWrapper>
            <Timer.Minutes/>:
            <Timer.Seconds formatValue={ (v: number) => `${ v }`.padStart(2, "0") }/>
          </DurationWrapper>
        </CenterFlexColumn>
      </StepTimerButton>
      <IconsWrapper>
        { controls[timer.state] }
        <MdCancel onClick={ reset } size={ iconSize }/>
      </IconsWrapper>
    </TimerWrapper>;
  }
  }{/* Any actual whitespace between the carat and the brace will BREAK the timer display */ }
  </Timer>
}

const StepTimerContainer = ({ timer }: { timer: AppStepTimer }) => {
  const dispatch = useDispatch();
  
  return <StepTimerComponent
    timer={ timer }
    startTimer={ () => dispatch(setTimerState({ timer, timerState: CookingTimerState.Running })) }
    pauseTimer={ () => dispatch(setTimerState({ timer, timerState: CookingTimerState.Paused })) }
    timerDone={ () => dispatch(setTimerState({ timer, timerState: CookingTimerState.Done })) }
    clearTimer={ () => dispatch(setTimerState({ timer, timerState: CookingTimerState.Pending })) }
  />
}
export default StepTimerContainer

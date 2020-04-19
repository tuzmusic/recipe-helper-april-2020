import { CookingTimerState, StepTimer } from "../../models/Models";
import React from "react";
import styled from "@emotion/styled";
import Timer from "react-compound-timer";
import { CenterFlexColumn, CenterFlexRow } from "../UtilityComponents";
import { setTimerState } from "../../redux/cookingSessionSlice";
import { useDispatch } from "react-redux";
import { MdEdit, MdPause, MdPlayArrow } from 'react-icons/md'

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
  timer: StepTimer
  startTimer: () => void
  pauseTimer: () => void
};

const StepTimerComponent = (props: Props) => {
  const { timer, startTimer, pauseTimer } = props
  
  return <Timer direction="backward" initialTime={ timer.durationSec * 1000 }
                startImmediately={ timer.state === CookingTimerState.Running }
  >{ ({ start, resume, pause, stop, reset, timerState }: any) => {
    
    const controls = {
      [CookingTimerState.Pending]: () => <MdPlayArrow size={ '1.5em' } onClick={ startTimer }/>,
      [CookingTimerState.Paused]: () => <MdPlayArrow size={ '1.5em' } onClick={ startTimer }/>,
      [CookingTimerState.Running]: () => <MdPause size={ '1.5em' } onClick={ pauseTimer }/>,
      [CookingTimerState.Done]: () => null,
    }
    
    return <TimerWrapper>
      <TimerLabel children={ timer.label }/>
      <StepTimerButton onClick={ startTimer }>
        <CenterFlexColumn>
          <DurationWrapper>
            <Timer.Minutes/>:
            <Timer.Seconds formatValue={ (v: number) => `${ v }`.padStart(2, "0") }/>
          </DurationWrapper>
        </CenterFlexColumn>
      </StepTimerButton>
      <IconsWrapper>
        { controls[timer.state]() }
        <MdEdit size={ '1.5em' } style={ { opacity: 0.3 } }/>
      </IconsWrapper>
    </TimerWrapper>;
  }
  }{/* Any actual whitespace between the carat and the brace will BREAK the timer display */ }
  </Timer>
}

const StepTimerContainer = ({ timer }: { timer: StepTimer }) => {
  const dispatch = useDispatch();
  
  return <StepTimerComponent
    timer={ timer }
    startTimer={ () => dispatch(setTimerState({ timer, timerState: CookingTimerState.Running })) }
    pauseTimer={ () => dispatch(setTimerState({ timer, timerState: CookingTimerState.Paused })) }
  />
}
export default StepTimerContainer

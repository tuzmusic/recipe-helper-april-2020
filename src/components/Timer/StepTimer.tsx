import { CookingTimer } from "../../models/Models";
import React from "react";
import styled from "@emotion/styled";
import Timer from "react-compound-timer";
import { CenterFlexRow } from "../UtilityComponents";

type Props = {
  timer: CookingTimer
  startTimer?: (e: React.MouseEvent) => void
};

const TimerWrapper = styled.div({
  textAlign: 'center',
})
const StepTimer = styled.button({
  borderRadius: 50,
  height: '60px',
  width: '60px',
  display: 'block',
  fontSize: 18
})

const DurationWrapper = styled(CenterFlexRow)({
  width: '100%',
})
const StepTimerComponent = ({ timer, startTimer }: Props) => {
  return (
    <TimerWrapper>
      <StepTimer onClick={ startTimer }>
        <Timer direction="backward"
               initialTime={ timer.durationSec * 1000 }
               startImmediately={ !startTimer }
          // checkpoints={ [{ time: 0, callback: () => {/* handle timer completion */} }] }
        >
          { ({ start, stop, reset, getTime, ...timerProps }: any) =>
            <CenterFlexRow>
              { console.log(getTime()) }
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
          }
        </Timer>
      </StepTimer>
      { timer.label }
    </TimerWrapper>
  );
}
export default StepTimerComponent

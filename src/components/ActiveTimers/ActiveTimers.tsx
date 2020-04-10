import { CookingTimer } from "../../models/Models";
import Timer from "react-compound-timer";
import React from "react";
import { Section } from "../UtilityComponents";

export const ActiveTimers = ({ timers, clearTimer }: { timers: CookingTimer[], clearTimer: (t: CookingTimer) => void }) => {
  return <Section>
    <h3>Active Timers</h3>
    { !timers.length ? "No timers." : timers.map((timer, i) =>
      <Timer key={ i } direction="backward"
             initialTime={ timer.durationSec * 1000 }
        // checkpoints={ [{ time: 0, callback: () => {/* handle timer completion */} }] }
      >
        { ({ start, stop, reset, getTime, ...timerProps }: any) =>
          <div style={ { display: 'flex' } }>
            { console.log(getTime()) }
            { timer.label }{ ": " }
            { getTime() <= 0 ? "Done!" :
              <>
                <Timer.Minutes/>:
                <Timer.Seconds formatValue={ (v: number) => `${ v }`.padStart(2, "0") }/>
              </> }{ " " }
            <button onClick={ start }>Start</button>
            <button onClick={ stop }>Stop</button>
            <button onClick={ reset }>Reset</button>
            <button onClick={ () => clearTimer(timer) }>Clear</button>
          </div>
        }
      </Timer>
    ) }
  </Section>
};

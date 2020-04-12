import { Instruction } from "../models/Models";
import { RootState } from "../redux/rootReducer";
import { initialCookingSessionState } from "../redux/cookingSessionSlice";
import { Currentness, getShouldShowStep } from "../redux/selectors/cookingSession.selectors";

describe('getShouldShowState', () => {
  let state: RootState
  const createState = (displayedSteps: number, currentStepIndex: number): RootState => {
    const instructions: Instruction[] = Array(10).fill('').map(
      (_, n) => new Instruction(`#${ n }`)
    );
    return {
      cookingSession: { ...initialCookingSessionState, instructions, currentStepIndex },
      prefs: { displayedSteps }
    };
  }
  const resultForStep = (state: RootState, n: number): Currentness =>
    getShouldShowStep(state.cookingSession.instructions[n])(state);
  
  describe('1 step shown', () => {
    test('current = 0', () => {
      state = createState(1, 0)
      expect(resultForStep(state, 0)).toEqual(Currentness.Current);
      expect(resultForStep(state, 1)).toEqual(Currentness.Future);
      expect(resultForStep(state, 2)).toEqual(Currentness.Future);
    });
    test('current = 1', () => {
      state = createState(1, 1)
      expect(resultForStep(state, 0)).toEqual(Currentness.Past);
      expect(resultForStep(state, 1)).toEqual(Currentness.Current);
      expect(resultForStep(state, 2)).toEqual(Currentness.Future);
    });
    test('current = 2', () => {
      state = createState(1, 2)
      expect(resultForStep(state, 0)).toEqual(Currentness.Past);
      expect(resultForStep(state, 1)).toEqual(Currentness.Past);
      expect(resultForStep(state, 2)).toEqual(Currentness.Current);
    });
  });
  
  describe('3 steps shown', () => {
    test('current = 4', () => {
      state = createState(3, 4);
      [0, 1, 2].forEach(n => expect(resultForStep(state, n)).toEqual(Currentness.Past));
      [3, 4, 5].forEach(n => expect(resultForStep(state, n)).toEqual(Currentness.Current));
      [6, 7, 8, 9].forEach(n => expect(resultForStep(state, n)).toEqual(Currentness.Future));
    });
    test('current = 0', () => {
      state = createState(3, 0);
      const result = [0, 1, 2].map(n => resultForStep(state, n));
      expect(result).toEqual([Currentness.Current, Currentness.Current, Currentness.Current]);
    });
  });
  
});

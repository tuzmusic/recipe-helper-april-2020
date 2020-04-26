import { cookies } from "../fixtures/sampleRecipes";
import cookingSession, {
  clearTimer,
  CookingSessionState,
  decStep,
  goToStep,
  incStep,
  initialCookingSessionState,
  startRecipe,
  toggleDone,
  toggleIngredientState
} from '../redux/cookingSessionSlice'
import { CookingTimer } from "../models/Models";

describe('recipe model and actions', () => {
  
  const cookieRecipe = cookies();
  let cookieState: CookingSessionState;
  beforeEach(() => {
    cookieState = {
      ...initialCookingSessionState,
      recipeInfo: cookieRecipe.info,
      instructions: cookieRecipe.instructions,
      ingredients: cookieRecipe.ingredients
    };
  });
  
  const stateAtStep = (n: number): CookingSessionState =>
    ({ ...cookieState, currentStepIndex: n });
  
  describe('start recipe', () => {
    const newState = cookingSession(initialCookingSessionState, startRecipe(cookieRecipe));
    
    it('loads a recipe into the store', () => {
      expect(newState.recipeInfo!.title).toEqual("Cookies");
      expect(newState.instructions).toEqual(cookieRecipe.instructions);
      expect(newState.ingredients).toEqual(cookieRecipe.ingredients);
    });
    
    it('initializes the step and timers', () => {
      expect(newState.currentStepIndex).toEqual(0);
      expect(newState.activeTimers.length).toEqual(0);
    });
  });
  describe('goToStep', () => {
    
    it('moves to the step requested', () => {
      expect(cookingSession(cookieState, goToStep(2))).toEqual(stateAtStep(2));
    });
    it('ignores numbers that are too low', () => {
      expect(cookingSession(cookieState, goToStep(-2))).toEqual(stateAtStep(0));
    });
    it('ignores numbers that are too high', () => {
      expect(cookingSession(cookieState, goToStep(3))).toEqual(stateAtStep(0));
    });
  });
  describe('incStep', () => {
    it('moves to the next step', () => {
      expect(cookingSession(cookieState, incStep()).currentStepIndex).toEqual(1);
      expect(cookingSession(stateAtStep(1), incStep()).currentStepIndex).toEqual(2);
    });
    it('stays within the range of the steps', () => {
      expect(cookingSession(stateAtStep(2), incStep()).currentStepIndex).toEqual(2);
    });
  });
  describe('decStep', () => {
    it('moves to the previous step', () => {
      expect(cookingSession(stateAtStep(2), decStep()).currentStepIndex).toEqual(1);
      expect(cookingSession(stateAtStep(1), decStep()).currentStepIndex).toEqual(0);
    });
    it('stays within the range of the steps', () => {
      expect(cookingSession(stateAtStep(0), decStep()).currentStepIndex).toEqual(0);
    });
  });
  describe('toggleIngredientState', () => {
    const sugar = cookieRecipe.ingredients[2];
    it('toggles the value a state flag', () => {
      expect(sugar.state.done).toBe(false);
      let newState = cookingSession(cookieState, toggleIngredientState({ ingredient: sugar, stateKey: 'done' }));
      expect(newState.ingredients[2].state.done).toBe(true);
      newState = cookingSession(cookieState, toggleIngredientState({ ingredient: sugar, stateKey: 'done' }));
      expect(newState.ingredients[2].state.done).toBe(false)
    });
    it('can use toggleDone too', () => {
      expect(sugar.state.done).toBe(false);
      let newState = cookingSession(cookieState, toggleDone(sugar));
      expect(newState.ingredients[2].state.done).toBe(true);
      newState = cookingSession(cookieState, toggleDone(sugar));
      expect(newState.ingredients[2].state.done).toBe(false)
    });
  });
  describe('timers', () => {
    
    let timer: CookingTimer;
    beforeEach(() => {
      timer = cookieRecipe.instructions[2].timers[0];
      expect(timer.label).toEqual("Bake");
    });
/*
    describe('startTimer', () => {
      it('adds the timer', () => {
        expect(cookingSession(cookieState, startTimer(timer)).activeTimers)
          .toEqual([timer]);
      });
      xit('starts the timer', () => {
      
      });
    });
*/
    describe('clearTimer', () => {
      xit('stops the timer', () => {
      
      });
      it('removes the timer', () => {
        const state: CookingSessionState = {
          ...cookieState, activeTimers: [
            new CookingTimer(2, 'dummy timer'),
            new CookingTimer(2, 'dummy timer'),
            timer,
            new CookingTimer(2, 'dummy timer'),
          ]
        };
        expect(cookingSession(state, clearTimer(timer)).activeTimers).toEqual([
          new CookingTimer(2, 'dummy timer'),
          new CookingTimer(2, 'dummy timer'),
          new CookingTimer(2, 'dummy timer'),
        ]);
      });
    });
  });
});

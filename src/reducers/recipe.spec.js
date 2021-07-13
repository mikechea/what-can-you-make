import reducer from './recipe';
import * as actions from '../actions/recipe';
import { GET_RECIPE, RECEIVE_RECIPE, FAIL_RECIPE } from '../actions/recipe';

describe('recipe reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({recipe: null});
  });

  it('should handle GET_POST_START', () => {
    const startAction = {
      type: actions.GET_RECIPE
    };

    expect(reducer(undefined, {})).toEqual({recipe: null});
  });

  it('should handle RECEIVE_RECIPE', () => {
    const recieveAction = {
      type: actions.RECEIVE_RECIPE,
      payload: {name: 'recipe'}, // important to pass correct payload, that's what the tests are for ;)
    };
    expect(reducer({}, recieveAction)).toEqual({
      recipe: {
        name: 'recipe'
      },
      isLoading: false
    });
  });

  it('should handle FAIL_RECIPE', () => {
    const failAction = {
      type: actions.FAIL_RECIPE,
      payload: { message: 'recipe not found' },
    };
    expect(reducer({}, failAction)).toEqual(
      { 
        error: { message: 'recipe not found' },
        isLoading: false
      }
    );
  });
})
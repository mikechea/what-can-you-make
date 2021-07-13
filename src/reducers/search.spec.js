import reducer from './search';
import * as actions from '../actions/search';
import { GET_SEARCH, RECEIVE_SEARCH, FAIL_SEARCH } from '../actions/recipe';

describe('search reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      recipes: null,
      error: null,
      isLoading: false
    });
  });

  it('should handle GET_SEARCH', () => {
    const startAction = {
      type: actions.GET_SEARCH
    };

    expect(reducer({}, startAction)).toEqual({
      isLoading: true,
    });
  });

  it('should handle RECEIVE_SEARCH', () => {
    const recieveAction = {
      type: actions.RECEIVE_SEARCH,
      payload: [{name: 'recipe'}], // important to pass correct payload, that's what the tests are for ;)
    };
    expect(reducer({}, recieveAction)).toEqual({
      recipes: [{
        name: 'recipe'
      }],
      isLoading: false
    });
  });

  it('should handle FAIL_SEARCH', () => {
    const failAction = {
      type: actions.FAIL_SEARCH,
      payload: { message: 'error searching recipes' },
    };
    expect(reducer({}, failAction)).toEqual(
      { 
        error: { message: 'error searching recipes' },
        isLoading: false
      }
    );
  });
})
import { push } from 'react-router-redux';
import * as fromTokens from 'redux/tokens';

export const onCreateToken = body => dispatch =>
  dispatch(fromTokens.createToken(body))
    .then((action) => {
      if (action.error) throw new Error();
      return dispatch(push(`/tokens/${action.payload.result}`));
    });

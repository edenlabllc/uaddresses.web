import { push } from 'react-router-redux';
import * as fromTokens from 'redux/tokens';

export const onDeleteToken = body => dispatch =>
  dispatch(fromTokens.deleteToken(body))
    .then((action) => {
      if (action.error) throw action;
      dispatch(push('/tokens'));
      return action;
    });

import { CALL_API } from 'redux-api-middleware';
import { REACT_APP_CUSTOM_PSK_HEADER } from '../config';

export const invoke = ({ body, headers, ...config }, { auth = true } = {}) => (
  dispatch,
  getState,
  { req }
) =>
  dispatch({
    [CALL_API]: {
      ...config,
      body: typeof body === 'string' ? body : JSON.stringify(body),
      headers: {
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache',
        Cookie: req ? req.headers.cookie : undefined, // use cookie from request in SSR mode
        'X-Custom-PSK': REACT_APP_CUSTOM_PSK_HEADER,
        ...headers,
      },
      credentials: auth ? 'same-origin' : 'omit',
    },
  });

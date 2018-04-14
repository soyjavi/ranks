
const DEFAULT_HEADERS = {
  Accept: 'application/json',
  timeout: 5000,
  'Content-Type': 'application/json',
};

export default (endpoint, props = {}) => {
  const { headers, method = 'GET', ...others } = props;

  return new Promise((resolve) => {
    fetch(endpoint, { headers: { ...DEFAULT_HEADERS, ...headers }, method, ...others })  // eslint-disable-line
      .then(async (response) => {
        const json = await response.json();
        if (response.status >= 400) {
          const error = new Error();
          error.response = response;
          error.message = json.message;
          throw error;
        }
        return resolve(json);
      }).catch((error = {}) => {
        if (!error.response) error.message = 'Something is going wrong';

        console.log('[ERROR]', {
          code: error.response ? error.response.status : undefined,
          endpoint,
          props,
          message: error.message,
        });

        return resolve(undefined);
      });
  });
};

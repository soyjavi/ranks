import { node, string } from 'prop-types';
import React, { PureComponent, createContext } from 'react';

const { localStorage: storage } = window;
const Context = createContext('persist');
const { Provider, Consumer: ConsumerPersist } = Context;

class ProviderPersist extends PureComponent {
  constructor(props) {
    super(props);

    const store = storage.getItem(props.namespace);
    this.state = {
      store: store ? JSON.parse(store) : {},
    };
  }

  _hydrate = (props = {}) => {
    const { props: { namespace } } = this;
    const store = { ...this.state.store, ...props };

    storage.setItem(namespace, JSON.stringify(store));
    this.setState({ store });
  }

  render() {
    return (
      <Provider value={{ ...this.state.store, hydrate: this._hydrate }}>
        { this.props.children }
      </Provider>
    );
  }
}

ProviderPersist.propTypes = {
  children: node,
  namespace: string,
};

ProviderPersist.defaultProps = {
  children: undefined,
  namespace: 'persistor',
};

export { ConsumerPersist, ProviderPersist };

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'react-thunk';

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

export { store }
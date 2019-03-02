import 'babel-polyfill';// prevent 'regeneratorRuntime is not defined' error.
// See https://github.com/babel/babel/issues/5085
// Seems that it is Babel-7 specific error
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';

ReactDOM.render(<HashRouter>
                  <App />
                </HashRouter>,
                document.getElementById('root'));

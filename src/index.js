import React from 'react'
import ReactDOM from 'react-dom';
import App from "./routes/App";
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

ReactDOM.render(<App/>, document.getElementById('app'));

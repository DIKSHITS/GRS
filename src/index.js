import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

//import 'ionicons/dist/css/ionicons.css';


import 'admin-lte/plugins/fontawesome-free/css/all.css';
import 'admin-lte/dist/js/adminlte.js';
//import 'admin-lte/dist/css/adminlte.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'datatables.net-buttons/js/dataTables.buttons.min';
    import 'datatables.net-buttons-bs4/js/buttons.bootstrap4.min';
    import 'datatables.net-buttons/js/buttons.html5.min';
    import 'datatables.net-buttons/js/buttons.print.min';
    





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

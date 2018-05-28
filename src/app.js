/* main import  */
// import STORE_KEY from 'CONSTANTS/storeKey';
// import store from 'store';
// import 'LESS/main.less';
import ReactDOM from 'react-dom';
import createRoute from './routes';
import "babel-polyfill";

const MOUNT_NODE = document.getElementById('app');
ReactDOM.render(createRoute(), MOUNT_NODE);
if (module.hot) {
  module.hot.accept();
}

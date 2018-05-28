import React from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router-dom';
import store from 'store';
import apiService from 'SERVICE';
import STORE_KEY from 'CONSTANTS/storeKey';
import { PAGE_URL } from 'CONSTANTS/default';
import logo from 'IMAGES/logo.png';
import styles from './header.local.less';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const { history } = this.props
    apiService.logout().then(() => {
      store.remove(STORE_KEY.LOGIN_USER);
      // history.push('/signin');
      history.push(PAGE_URL.SIGNIN);
    });
  }

  render() {
    const { homePage } = this.props;
    const loginUser = store.get(STORE_KEY.LOGIN_USER);
    return (
      <header styleName="hd">
        <Link to={homePage} styleName="logo-box"><img src={logo} alt="天虎云商" /></Link>
        <div styleName="menu">
          <span styleName="user">{loginUser}</span>
          <span
            styleName="logout"
            onClick={() => {
              this.logout();
            }}
          >退出</span>
        </div>
      </header>
    )
  }
}

export default CSSModules(Header, styles);

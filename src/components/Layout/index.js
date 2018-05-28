import React from 'react';
// import CSSModules from 'react-css-modules';

import 'LESS/main.less';

import Header from './Header';
import Sidebar from './Sidebar';

import styles from './styles.local.less';

/*
const layout = WrappedComponent => {
  const Layout = () => {
    Layout.displayName = 'Layout()';
    return (
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.main}>
          <Sidebar />
          <WrappedComponent {...this.props} className={styles.container} />
        </div>
      </div>
    )
  }
  return Layout;
}
*/

const layout = WrappedComponent => {
  class LayoutWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        homePage: ''
      };
      this.changeHomePage = this.changeHomePage.bind(this);
    }
    changeHomePage(homePage) {
      this.setState({
        homePage
      });
    }
    componentDidMount() {
      if (typeof flexibility !== 'undefined') {
        flexibility(document.getElementById('app'));
      }
    }
    render() {
      const { homePage } = this.state;
      return (
        <div className={styles.wrapper}>
          <Header {...this.props} homePage={homePage} />
          <div className={styles.main}>
            <Sidebar {...this.props} changeHomePage={this.changeHomePage} />
            <div className={styles.container}>
              <WrappedComponent {...this.props} className={styles['content-box']} />
            </div>
          </div>
        </div>
      )
    }

  }
  LayoutWrapper.displayName = `LayoutWrapper(${WrappedComponent})`;
  return LayoutWrapper;
}

/*
const Layout = WrappedComponent => {
  const LayoutWrapper = () => (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.main}>
        <Sidebar />
        <div className={styles.container}>
          {
            // <div className={styles.breadcrumbs}>
            //    我是面包屑导航
            // </div>
            // <div id="content">
            // </div>
          }
          <WrappedComponent {...this.props} />
        </div>
      </div>
    </div>
  )
  LayoutWrapper.displayName = `LayoutWrapper(${WrappedComponent})`;
  return LayoutWrapper;
}
*/

export default layout;

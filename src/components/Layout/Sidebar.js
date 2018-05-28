import React from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router-dom';

// import iconSettings from 'SVGS/settings.svg';
import iconArrowsDown from 'SVGS/arrows-down.svg';
import iconArrowsRight from 'SVGS/arrows-right.svg';
import apiService, { permissionFilter } from 'SERVICE';
import DEFAULT, { NAVS } from 'CONSTANTS/default';
import store from 'store';
import settingIcon from 'SVGS/setting.svg';
import userPortraitIcon from 'SVGS/menu-portrayal.svg';
import partnerIcon from 'SVGS/partner.svg';
import webIcon from 'SVGS/web.svg';
import marketingIcon from 'SVGS/marketing.svg';
import menuFluxIcon from 'SVGS/menu-flux.svg';
import menuOrderIcon from 'SVGS/menu-order.svg';

import styles from './sidebar.local.less';

const ICON_OBJ = {
  settingIcon,
  userPortraitIcon,
  partnerIcon,
  webIcon,
  marketingIcon,
  menuFluxIcon,
  menuOrderIcon
};
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navs: store.get('navs') || [],
    }
    this.navs = NAVS;
    // this.hideMenuIds = store.get('hideMenuIds') || [];
		// 任何用户都具备权限的导航id
		// this.alwaysPermissions = ['700300'];

    const { match } = this.props;
    this.curUrl = match.path;

    this.toggleDown = this.toggleDown.bind(this);
  }

  componentDidMount() {
		// console.log('路由切换了');
    const { history } = this.props;
    const candidateNavs = this.navs;
    // candidateNavs.forEach(item => {
    //   item.showSub = !(this.hideMenuIds.indexOf(item.id) >= 0);
    // });
    apiService.getPermissions().then(data => {
      const permissionIds = data.permissionIds.concat(DEFAULT.alwaysPermissions);
      this.changeHomePage(permissionIds);

			// 存储用户具有权限的侧边导航
      const updatedNavs = [];
			// 是否允许用户进入当前页面标志
      let permitFlag = false;
      for (let i = 0; i < candidateNavs.length; i++) {
				// 临时存储本次匹配到的侧边导航
        let tmpNav = {}
        if (candidateNavs[i].subNavs) {
          let hasSubNavPermission = false;
          tmpNav = {
            name: candidateNavs[i].name,
            url: candidateNavs[i].url,
            id: candidateNavs[i].id,
            icon: candidateNavs[i].icon,
            showSub: candidateNavs[i].showSub,
            subNavs: []
          }
          for (let j = 0; j < candidateNavs[i].subNavs.length; j++) {
            for (let k = 0; k < permissionIds.length; k++) {
              const nav = candidateNavs[i].subNavs[j];
							// 如果权限列表中包含侧边二级导航的id
              if (String(permissionIds[k]) === nav.id) {
                hasSubNavPermission = true;
                tmpNav.subNavs.push(nav)
								// 判断当前页面路由是否在允许权限路由表中
                if (this.curUrl.slice(0, nav.url.length) === nav.url) {
                  permitFlag = true;
                }
                break;
              }
            }
          }
					// 在存在侧边子导航的情况下
					// 只有当前用户具有子级侧导航的权限的情况下,
					// 才允许父级侧导航存在
          if (hasSubNavPermission) {
            updatedNavs.push(tmpNav);
          }
        } else {
          for (let k = 0; k < permissionIds.length; k++) {
						// 如果权限列表中包含侧边大导航的id
            if (String(permissionIds[k]) === candidateNavs[i].id) {
              tmpNav = candidateNavs[i]
              updatedNavs.push(tmpNav);
							// 判断当前页面路由是否在允许权限路由表中
              if (this.curUrl.slice(0, candidateNavs[i].url.length) === candidateNavs[i].url) {
                permitFlag = true;
              }
              break;
            }
          }
        }
      }
			// if(!permitFlag){
			// 	store.clearAll();
			// 	history.push(PAGE_URL.SIGNIN);
			// }
      // store.set('navs', updatedNavs);
      this.setState({ navs: updatedNavs });
    }, err => {
      permissionFilter(err, history);
    })
  }
  componentWillUnmount() {
    // 组件卸载后，清除轮询
    // const hideMenuIds = this.state.navs.filter(item => !item.showSub).map(item => item.id);
    // store.set('hideMenuIds', hideMenuIds);
    store.set('navs', this.state.navs);
  }
  // 修改点击图标跳转页面
  changeHomePage(permissionIds) {
    const { changeHomePage } = this.props;
    let matchFlag = false;
    let homePage;
    for (let i = 0; i < NAVS.length; i++) {
      if (matchFlag) {
        break;
      }
      for (let k = 0; k < permissionIds.length; k++) {
        if (matchFlag) {
          break;
        }
        if (String(permissionIds[k]) === NAVS[i].id) {
          matchFlag = true;
          homePage = NAVS[i].url;
        }
      }
      if (NAVS[i].subNavs) {
        for (let j = 0; j < NAVS[i].subNavs.length; j++) {
          if (matchFlag) {
            break;
          }
          for (let k = 0; k < permissionIds.length; k++) {
            if (matchFlag) {
              break;
            }
            if (String(permissionIds[k]) === NAVS[i].subNavs[j].id) {
              matchFlag = true;
              homePage = NAVS[i].subNavs[j].url;
            }
          }
        }
      }
    }
    changeHomePage(homePage);
  }
  toggleDown(id) {
    const updatedNavs = Object.assign([], this.state.navs);
    for (let i = 0; i < updatedNavs.length; i++) {
      if (updatedNavs[i].id === id) {
        updatedNavs[i].showSub = !updatedNavs[i].showSub
      }
    }
    this.setState({ navs: updatedNavs })
  }

  render() {
    const { navs } = this.state;
    const navsList = navs.map(nav => {
      let subNavs = null;
      if (nav.subNavs) {
        const subNavsList = nav.subNavs.map(subNav => (
          <li key={subNav.id}>
            {/* <Link to={subNav.url} styleName="nav-item"> */}
            <Link
              to={subNav.url}
              styleName={this.curUrl.slice(0, subNav.url.length) === subNav.url
							? 'nav-item active'
							: 'nav-item'}
            >
              {subNav.name}
            </Link>
          </li>
				))
        subNavs = (
          <ul styleName={nav.showSub
						? 'sub-nav'
						: 'sub-nav hide'}
          >
            {subNavsList}
          </ul>
				)
      }
      return (
        <li key={nav.id}>
          {subNavs
						? <span
  styleName={this.curUrl.slice(0, nav.url.length) === nav.url
								? 'nav-item active-1'
								: 'nav-item'}
  className="clearfix"
  onClick={() => {
    this.toggleDown(nav.id);
  }}
						>
  <svg viewBox={ICON_OBJ[nav.icon].viewBox}>
    <use xlinkHref={`#${ICON_OBJ[nav.icon].id}`} />
  </svg>
  {nav.name}
  {nav.showSub && <span styleName="right">
    <svg viewBox={iconArrowsDown.viewBox}>
      <use xlinkHref={`#${iconArrowsDown.id}`} />
    </svg>
  </span>}
  {!nav.showSub && <span styleName="right">
    <svg viewBox={iconArrowsRight.viewBox}>
      <use xlinkHref={`#${iconArrowsRight.id}`} />
    </svg>
  </span>}
							</span>
						: <Link
  to={nav.url}
  styleName={this.curUrl.slice(0, nav.url.length) === nav.url
							? 'nav-item active'
							: 'nav-item'}
						>
  <svg viewBox={ICON_OBJ[nav.icon].viewBox}>
    <use xlinkHref={`#${ICON_OBJ[nav.icon].id}`} />
  </svg>
  {nav.name}

						</Link>
}
          {subNavs}
        </li>
      )
    })
    return (
      <div styleName="sidebar">
        <ul styleName="nav">
          {navsList}
        </ul>
      </div>
    )
  }
}

export default CSSModules(Sidebar, styles, { allowMultiple: true });

import React from 'react';
import {Component} from 'COMPONENTS/base';
import apiService from 'SERVICE';
import DEFAULT, { NAVS } from 'CONSTANTS/default';

const warnInfo = {
  noUser: '用户名不能为空',
  noPwd: '密码不能为空',
  noCode: '验证码不能为空',
  loginErr: '用户名或密码不正确',
  accountErr: '账号状态异常，请联系管理员',
  codeErr: '验证码错误',
  pwdOrAccountErr: '用户名或密码错误',
  userNotExist: '账号不存在'
};

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      code: '',
      key: '',
      verifyCode: '',
      errMsg: {
        username: '',
        password: '',
        code: ''
      }
    };
  }
  componentDidMount() {
    // this.getImgVerifyCode();
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  getImgVerifyCode = () => {
    apiService.getImgVerifyCode()
    .then(data => {
      this.setState({
        ...data
      });
    });
  }
  validate = () => {
    const { username, password, code } = this.state;
    ['username', 'password', 'code'].forEach(key => {
      this.setState({
        errMsg: {
          [key]: ''
        }
      })
    });
    if (!username.trim()) {
      this.errMsg('username', warnInfo.noUser);
      this.userInput.focus();
    } else if (!password.trim()) {
      this.errMsg('password', warnInfo.noPwd);
      this.pwdInput.focus();
    } else if (!code) {
      this.errMsg('code', warnInfo.noCode);
      this.codeInput.focus();
    } else {
      this.signin();
    }
  }
  enterLogin = e => {
    if (e.keyCode === 13) this.validate();
  }
  signin = () => {
    const { username, password, code, key } = this.state;
    const { history } = this.props;
    let matchFlag = false;
    apiService.signin({
      username,
      password: password,
      verifyCode: code,
      key
    }).then(data => {
      // store.set(STORE_KEY.LOGIN_USER, username);
      const permissionIds = data.permissionIds.concat(DEFAULT.alwaysPermissions);
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
            history.push(NAVS[i].url);
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
                history.push(NAVS[i].subNavs[j].url);
              }
            }
          }
        }
      }
    }, data => {
      this.getImgVerifyCode();
      // switch (data.code) {
      //   case ERROR_CODE.CODE_ERR:
      //     this.errMsg('code', warnInfo.codeErr);
      //     break;
      //   case ERROR_CODE.NO_USER:
      //     this.errMsg('password', warnInfo.loginErr);
      //     break;
      //   case ERROR_CODE.PWD_ERR:
      //     this.errMsg('password', warnInfo.pwdOrAccountErr);
      //     break;
      //   case ERROR_CODE.ACCOUNT_ERR:
      //     this.errMsg('username', warnInfo.accountErr);
      //     break;
      //   default:
      //     break;
      // }
    });
  }
  errMsg = (key, errMsg) => {
    this.setState({
      errMsg: {
        [key]: errMsg
      }
    });
  }
  render() {
    const { verifyCode, errMsg } = this.state;
    return (
      <div className="signin-contaner">
        <div className="signin-box">
          <div className="logo">
            {/* <img src={logoImg} alt="" /> */}
          </div>
          <ul>
            <li>
              <div className="item">
                {/* <svg viewBox={userIcon.viewBox}>
                  <use xlinkHref={`#${userIcon.id}`} />
                </svg> */}
                <input
                  type="text"
                  name="username"
                  ref={m => { this.userInput = m; }}
                  placeholder="请输入用户名"
                  onChange={e => this.onChange(e)}
                  onKeyDown={e => this.enterLogin(e)}
                />
              </div>
              <p className="err-msg">{errMsg.username}</p>
            </li>
            <li>
              <div className="item">
                {/* <svg viewBox={pwdIcon.viewBox}>
                  <use xlinkHref={`#${pwdIcon.id}`} />
                </svg> */}
                <input
                  type="password"
                  name="password"
                  ref={m => { this.pwdInput = m; }}
                  placeholder="请输入密码"
                  onChange={e => this.onChange(e)}
                  onKeyDown={e => this.enterLogin(e)}
                />
              </div>
              <p className="err-msg">{errMsg.password}</p>
            </li>
            <li className="code-li">
              <div className="item code-item">
                {/* <svg viewBox={codeIcon.viewBox}>
                  <use xlinkHref={`#${codeIcon.id}`} />
                </svg> */}
                <input
                  className="code-input"
                  type="text"
                  name="code"
                  placeholder="请输入验证码"
                  ref={m => { this.codeInput = m; }}
                  onChange={e => this.onChange(e)}
                  onKeyDown={e => this.enterLogin(e)}
                />
              </div>
              <span className="img-box">
                <img className="vertify-code" onClick={this.getImgVerifyCode} src={verifyCode} alt="" />
              </span>
              <p className="err-msg">{errMsg.code}</p>
            </li>
            <li>
              <button onClick={this.validate} >
                <span>登录少时诵诗书所</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

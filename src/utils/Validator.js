function checkID(ID) {
  if (typeof ID !== 'string') return false;
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  };
  const birthday = `${ID.substr(6, 4)}/${Number(ID.substr(10, 2))}/${Number(ID.substr(12, 2))}`;
  const d = new Date(birthday);
  if (d.getFullYear() < 1900) return false;
  const newBirthday = `${d.getFullYear()}/${Number(d.getMonth() + 1)}/${Number(d.getDate())}`;
  const currentTime = new Date().getTime();
  const time = d.getTime();
  const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  let sum = 0;
  let i;

  if (!/^\d{17}(\d|x)$/i.test(ID)) return false;
  if (city[ID.substr(0, 2)] === undefined) return false;
  if (time >= currentTime || birthday !== newBirthday) return false;
  for (i = 0; i < 17; i++) {
    sum += ID.substr(i, 1) * arrInt[i];
  }
  const residue = arrCh[sum % 11];
  if (residue !== ID.substr(17, 1)) return false;

  return true;
}

export const validmethods = {
    // '', undefined, null, NaN, 0, false
    /**
     * 验证是否为空
     * @param  {[type]}  val    待验证的值
     * @param  {[type]}  errMsg 错误信息
     * @return {Boolean}        [description]
     */
  isEmpty(value, errMsg) {
    let val = value;
    if (typeof val === 'string') val = val.trim();
    if ((typeof val === 'undefined') ||
          (val === null) ||
          (val === '') ||
          (parseInt(val, 10) === 0) ||
          (typeof val === 'number' && isNaN(val))) {
      return errMsg;
    }
    return false;
  },

    /**
     * 获取字符串长度，中文为２，英文和数字为１
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
  getLen(str) {
    if (str === null) return 0;
    // if (typeof str !== 'string') str = String(str);
    return String(str).replace(/[^\x00-\xff]/g, '01').length;
  },
    /**
     * 获取字符串长度，中文英文都为1
     */
  getRealLen(str) {
    if (str === null) return 0;
    // if (typeof str !== 'string') str += '';
    return String(str).length;
  },

    /**
     * 验证是否超过最大长度
     * @param  {[type]}  val    [description]
     * @param  {[type]}  errMsg 错误信息
     * @param  {[type]}  maxLength [description]
     * @return {Boolean}        [description]
     */
  isMaxLength(...args) {
    const value = args[0];
    const errMsg = args[1];
    const maxLength = args[2];
    const length = maxLength;
    const eErrMsg = this.isEmpty(value, errMsg);
    if (eErrMsg) return errMsg;
    const strLen = this.getLen(value);
    if (strLen > length) return errMsg;
    return false;
  },
    /**
     * 验证是否超过最大长度
     * @param  {[type]}  val    [description]
     * @param  {[type]}  errMsg 错误信息
     * @param  {[type]}  maxLength [description]
     * @return {Boolean}        [description]
     */
  isRealMaxLength(...args) {
    const value = args[0];
    const errMsg = args[1];
    const maxLength = args[2];
    const length = maxLength;
    const eErrMsg = this.isEmpty(value, errMsg);
    if (eErrMsg) return errMsg;
    const strLen = this.getRealLen(value);
    if (strLen > length) return errMsg;
    return false;
  },

    /**
     * 验证是否超过最小长度
     * @param  {[type]}  val    [description]
     * @param  {[type]}  errMsg 错误信息
     * @param  {[type]}  maxLength [description]
     * @return {Boolean}        [description]
     */
  isMinLength(...args) {
    const value = args[0];
    const errMsg = args[1];
    const minLength = args[2];
    const length = minLength;
    const eErrMsg = this.isEmpty(value, errMsg);
    if (eErrMsg) return errMsg;
    const strLen = this.getLen(value);
    if (strLen < length) return errMsg;
    return false;
  },

    /**
     * 验证是否为正整数
     * @param  {[type]}  val [description]
     * @return {Boolean}     [description]
     */
  isNumber(val, errMsg) {
        // if (this.isEmpty(val, errMsg)) return errMsg;
    if (!/^[0-9]+$/.test(val)) return errMsg;
    return false;
  },

    /**
     * 是否是正数
     * @param  {[type]}  val [description]
     * @return {Boolean}     [description]
     */
  isPositiveNum(val, errMsg) {
    if (!(!this.isNumber(val, errMsg) && Number(val) > 0)) return errMsg;
    return false;
  },

    /**
     * 是否是中文
     * @param  {[type]}  val [description]
     * @return {Boolean}     [description]
     */
  isChinese(val, errMsg) {
    if (!/^[\u4E00-\u9FA5]+$/.test(val)) return errMsg;
    return false;
  },
  /**
     * 是否是英文或数字
     * @param  {[type]}  val [description]
     * @return {Boolean}     [description]
     */
  isNumberOrLetter(val, errMsg) {
    if (!/[a-zA-Z0-9]/.test(val)) return errMsg;
    return false;
  },
  /**
     * 是否是英文和数字的组合
     * @param  {[type]}  val [description]
     * @return {Boolean}     [description]
     */
  isNumberAndLetter(val, errMsg) {
    if (!(/^[a-zA-Z0-9]+$/.test(val) && !/^[a-zA-Z]+$|^[0-9]+$/.test(val))) return errMsg;
    return false;
  },

    /**
     * 是否是和法的手机号
     * @param  {[type]}  val [description]
     * @return {Boolean}     [description]
     */
  isIegalPhone(val, errMsg) {
    if (!/^1[0123456789]\d{9}$/.test(val)) return errMsg;
    return false;
  },

    /**
     * 是否是合法的验证码（六位数字）
     * @param  {[type]}  val    [description]
     * @param  {[type]}  errMsg [description]
     * @return {Boolean}        [description]
     */
  isIegalCode(val, errMsg) {
    if (!/^[0-9]{6}$/.test(val)) return errMsg;
    return false;
  },

    /**
     * 是否是合法的身份证号
     * @param  {[type]}  val [description]
     * @return {Boolean}     [description]
     */
  isIegalID(val, errMsg) {
        // 验证号码是否合法，合法返回true，不合法返回false
    const res = checkID(val);
    if (!res) return errMsg;
    return false;
  },

    /**
     * 是否是合法的电子邮箱格式
     * @param  {[type]}  val [description]
     * @return {Boolean}     [description]
     */
  isIegalEmail(val, errMsg) {
    const res = /^[A-Z0-9a-z._%+-]{1,64}@[A-Za-z0-9.-]{1,200}\.[A-Za-z]{2,4}$/.test(val);
    if (!res) return errMsg;
    return false;
  },
    /*
     * 是否是合法的借款金额
     * @param {[mount]} {description}
     * @return {description} */
  isIegalLendMount(val, errMsg) {
    if (parseInt(val, 10) < 1000) {
      return errMsg;
    }
    return false;
  },
    /*
     * 是否为合法的银行卡号,银行卡号长度为16至19位
     * @param {[cardNum]} {description}
     * @return {description} */
  isIegalCardNum(num, errMsg) {
    if (num.length > 19 || num.length < 16) {
      return errMsg;
    }
    return false;
  },

    /*
     * 是否为合法的d登录密码，长度为6至18位
     * @param {[cardNum]} {description}
     * @return {description} */
  isPassword(num, errMsg) {
    if (num.length > 18 || num.length < 6) {
      return errMsg;
    }
    return false;
  },

};


/**
 * Simple Validator
 * @Usage:
 *  var validator = new Util.Validator;
    validator
        .addRule(item.title, [{rule: 'isNormalLength:50', errMsg: 'title不能为空或超过25个字符！'}])
        .addRule(item.id, [{rule: 'isnotEmpty', errMsg: 'id不能为空!'}])
    var validateResult = validator.startVal();  // true or false
 */
export default class Validator {
  constructor() {
    this.cache = [];
  }

  addRule(dom, ruleArr) {
    // var value = (dom instanceof Object) ? dom.value : dom;
    const value = dom;
    for (let i = 0, len = ruleArr.length; i < len; i++) {
      const rule = ruleArr[i].rule.split(':');
      const ruleObj = {
        value,
        rule,
        errMsg: ruleArr[i].errMsg
      };
      this.cache.push(ruleObj);
    }
    return this;
  }

  startVal(callback) {
    const cache = this.cache;
    for (let i = 0, len = cache.length; i < len; i++) {
      const methodName = cache[i].rule[0];
      const methodParam = cache[i].rule[1];
      const param = [cache[i].value, cache[i].errMsg, methodParam];
      const errMsg = validmethods[methodName](...param);
      if (errMsg) {
        /* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
        callback && callback(errMsg);
        return false;
      }
    }
    return true;
  }
}

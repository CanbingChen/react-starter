const ERROR_CODE = {
  SUCCESS: 10000,             // 成功
  PERMISSION_DENIED: 11000,   // 无权限
  USER_EXIST: 11100,          // 用户已存在
  USER_NOT_EXIST: 11200,      // 用户不存在
  PWD_ERR: 11300,             // 密码错误
  ROLE_DUPLICATE: 11400,      // 角色名重复
  ROLE_NOT_EXIST: 11500,      // 角色不存在
  PERMISSION_NOT_EXIST: 11600, // 权限不存在
  CODE_ERR: 11700,            // 验证码错误
  ACCOUNT_ERR: 11900,         // 账号异常
}

export default ERROR_CODE;

/**
 * ログインユーザー登録のモデル
 */
class UserRegisterForm {
  constructor(
    userName,
    emailAddress,
    password,
    confirmPassword,
    userNameError,
    emailError,
    passError,
    confirmPassError
  ) {
    this.userName = userName;
    this.emailAddress = emailAddress;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.userNameError = userNameError;
    this.emailError = emailError;
    this.passError = passError;
    this.confirmPassError = confirmPassError;
  }
}

module.exports = UserRegisterForm;

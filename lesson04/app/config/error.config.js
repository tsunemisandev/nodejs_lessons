const Errors = {
  get401Error: function () {
    const error = new Error();
    error.statusCode = 401;
    return error;
  },
  ERROR_USER_OR_PASS_WRONG: 'ユーザーまたは、パスワードが間違っています',
  ERROR_USER_NOT_REGISTERED: 'ユーザーの登録が存在しません',
  ERROR_USER_EXISTS: '指定されたユーザー名は利用できません',
  ERROR_EMAIL_EXISTS: '指定されたメールは利用できません',
};

module.exports = Errors;

export const corpMixin = {
  beforeRouteEnter(to, from, next) {
    // TODO 判断企业管理员
    console.log(sessionStorage.getItem('userToken'), sessionStorage.getItem('loginType'));
    if (sessionStorage.getItem('userToken') === null || sessionStorage.getItem('loginType') !== '2') {
      next(false);
    } else {
      next();
    }
  },
};

export const emplMixin = {
  beforeRouteEnter(to, from, next) {
    // TODO 判断猎头
    if (sessionStorage.getItem('userToken') === null || sessionStorage.getItem('loginType') !== 3) {
      next(false);
    } else {
      next();
    }
  },
};

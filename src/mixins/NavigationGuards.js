export const corpMixin = {
  beforeRouteEnter(to, from, next) {
    // TODO 判断企业管理员
    // console.log(sessionStorage.getItem('userToken'), sessionStorage.getItem('loginType'));
    if (sessionStorage.getItem('userToken') === null || sessionStorage.getItem('loginType') !== '3') {
      next(false);
    } else {
      next((vm) => {
        vm.$emit('route-switch', window.location.href.split('/').pop());
      });
    }
  },
};

export const emplMixin = {
  beforeRouteEnter(to, from, next) {
    // TODO 判断猎头
    if (sessionStorage.getItem('userToken') === null || sessionStorage.getItem('loginType') !== '3') {
      next(false);
    } else {
      next((vm) => {
        vm.$emit('route-switch', window.location.href.split('/').pop());
      });
    }
  },
};

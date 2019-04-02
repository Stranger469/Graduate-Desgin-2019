export default {
  beforeRouteEnter(to, from, next) {
    if (sessionStorage.getItem('userToken') === null) {
      next(false);
    }
  },
};

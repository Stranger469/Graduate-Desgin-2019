/* eslint-disable */
import valert from './install';

export default{
  install(Vue) {
    Vue.component(valert.name, valert);
    Vue.prototype.$alert = valert;
  },
};

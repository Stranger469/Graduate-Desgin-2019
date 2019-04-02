import vconform from './install';

export default{
  install(Vue) {
    Vue.component(vconform.name, vconform);
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$confirm = vconform;
  },
};


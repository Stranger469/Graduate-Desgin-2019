import vconform from './install';

export default{
  install(Vue) {
    Vue.component(vconform.name, vconform);
    Vue.prototype.$confirm = vconform;
  },
};


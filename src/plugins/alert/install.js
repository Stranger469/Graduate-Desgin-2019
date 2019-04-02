/* eslint-disable */
import vue from 'vue';
import valert from './index.vue';

const constructor = vue.extend(valert);
function init(op) {
  const option = Object.assign({
    el: document.createElement('div'),
  }, op);
  return new constructor(option);
}
function initOption(param) {
  param;
}
function Alert(msg, callback) {
  const op = {
    data: {
      msg,
    },
    methods: {},
  };
  if (callback) {
    op.data.type = 'confirm';
    op.methods.callback = callback;
  }
  const obj = init(op);
  document.body.appendChild(obj.$el);
  obj.$data.show = true;
}
export default Alert;

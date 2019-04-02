/* eslint-disable */
import vue from 'vue';
import vconfirm from './index.vue';

const constructor = vue.extend(vconfirm);
function init(op) {
  const option = Object.assign({
    el: document.createElement('div'),
  }, op);
  return new constructor(option);
}
function initOption(param) {
  param;
}
function Confirm(msg, callback) {
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
export default Confirm;

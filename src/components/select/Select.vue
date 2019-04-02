<template>
  <div class="select-box"
       :style="{ width: width }">
    <div class="select"
      :class="{
        multiple: multiple,
        disabled: disabled
      }"
      @click.stop="open($event)">
      <span
        class="chosen"
        :class="{ placeholder: values.length < 1 }"
        v-if="!multiple">{{ values.length > 0 ? values[0].label : placeholder }}</span>
      <span class="chosen" v-else>
        <div class="placeholder" v-if="values.length === 0">
          {{ placeholder }}
        </div>
        <ul v-else-if="values.length < 4">
          <li v-for="(element, index) of values" :key="index + 100">
            {{ element.label }}
            <span class="close" @click.stop="deleteTag(element)"></span>
          </li>
        </ul>
        <div v-else>
          {{ values.length + '个元素被选中' }}
        </div>
      </span>
      <i ref="icon">◣</i>
    </div>
    <ul ref="options" class="options-box">
      <functional
        :options="selectOptions"
        :slot-options="slotOptions"
        :slot-update-hook="updateSlotOptions">
      </functional>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import functional from './functional';

const optionRegexp = /^Option$/i;

const findOptionsInVNode = (node) => {
  const opts = node.componentOptions;
  if (opts && opts.tag.match(optionRegexp)) return [node];
  if (!node.children && (!opts || !opts.children)) return [];
  const children = [...(node.children || []), ...(opts && opts.children || [])];
  const options = children.reduce(
    (arr, el) => [...arr, ...findOptionsInVNode(el)], [],
  ).filter(Boolean);
  return options.length > 0 ? options : [];
};

const extractOptions = options => options.reduce((options, slotEntry) => options.concat(findOptionsInVNode(slotEntry)), []);

const getNestedProperty = (obj, path) => {
  const keys = path.split('.');
  return keys.reduce((o, key) => o && o[key] || null, obj);
};

const getOptionLabel = (option) => {
  if (option.componentOptions.propsData.label) return option.componentOptions.propsData.label;
  const textContent = (option.componentOptions.children || []).reduce((str, child) => str + (child.text || ''), '');
  const innerHTML = getNestedProperty(option, 'data.domProps.innerHTML');
  return textContent || (typeof innerHTML === 'string' ? innerHTML : '');
};

export default {
  name: 'Select',
  props: {
    value: {
      type: [String, Number, Array],
      default: '',
    },
    placeholder: String,
    // 自定义宽度
    width: {
      type: [String, Number],
      default: () => '100px',
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: () => false,
    },
    // 允许多选
    multiple: {
      type: Boolean,
      default: () => false,
    },

  },
  data() {
    return {
      isShow: false,
      slotOptions: this.$slots.default,
      values: [],
      visible: true,
    };
  },
  computed: {
    selectOptions() {
      const selectOptions = [];
      const slotOptions = (this.slotOptions || []);
      const selectedValues = this.values.filter(Boolean).map(({ value }) => value);
      for (const option of slotOptions) {
        const cOptions = option.componentOptions;
        if (!cOptions) continue;
        selectOptions.push(this.processOption(option, selectedValues));
      }
      return selectOptions;
    },
    flatOptions() {
      return extractOptions(this.selectOptions);
    },
    publicValue() {
      return this.multiple ? this.values.map(option => option.value) : (this.values[0] || {}).value;
    },
  },
  watch: {
    value(value) {
      const { getInitialValue, getOptionData } = this;
      if (value === '') this.values = [];
      // else if (checkValuesNotEqual(value,publicValue,values)) {
      //   this.$nextTick(() => this.values = getInitialValue().map(getOptionData).filter(Boolean));
      // }
      this.$nextTick(() => this.values = getInitialValue().map(getOptionData).filter(Boolean));
    },
    values(now, before) {
      const newValue = JSON.stringify(now);
      const oldValue = JSON.stringify(before);
      const vModelValue = this.publicValue;
      const shouldEmitInput = newValue !== oldValue && vModelValue !== this.value;
      if (shouldEmitInput) {
        this.$emit('input', vModelValue); // to update v-model
        this.$emit('on-change', this.publicValue);
      }
    },
  },
  methods: {
    // 箭头向上旋转
    rotateUp() {
      this.$refs.icon.style.transform = 'rotate(135deg)';
      this.$refs.icon.style.marginTop = '5px';
      this.$refs.options.style.display = 'block';
      setTimeout(() => {
        this.$refs.options.style.top = '30px';
        this.$refs.options.style.opacity = 1;
      });
    },
    // 箭头向下旋转
    rotateDown() {
      this.$refs.icon.style.transform = 'rotate(-45deg)';
      this.$refs.icon.style.marginTop = '-5px';
      this.$refs.options.style.top = '15px';
      this.$refs.options.style.opacity = 0;
      setTimeout(() => {
        this.$refs.options.style.display = 'none';
      }, 300);
    },
    open() {
      if (this.disabled) {
        return;
      }
      this.isShow = !this.isShow;
      if (this.isShow) {
        this.rotateUp();
      } else {
        this.rotateDown();
      }
    },
    selectChange(option) {
      if (this.multiple) {
        // keep the query for remote select
        const valueIsSelected = this.values.find(({ value }) => value === option.value);
        if (valueIsSelected) {
          this.values = this.values.filter(({ value }) => value !== option.value);
        } else {
          this.values = this.values.concat(option);
        }
      } else {
        this.values = [option];
        this.open();
      }
    },
    deleteTag(option) {
      // this.values.splice(this.values.findIndex(e => e.index === element.index), 1);
      this.values = this.values.filter(({ value }) => value !== option.value);
    },
    processOption(option, values) {
      if (!option.componentOptions) return option;
      const optionValue = option.componentOptions.propsData.value;
      const disabled = option.componentOptions.propsData.disabled;
      const isSelected = values.includes(optionValue);
      const propsData = {
        ...option.componentOptions.propsData,
        selected: isSelected,
        disabled: typeof disabled === 'undefined' ? false : disabled !== false,
      };
      return {
        ...option,
        componentOptions: {
          ...option.componentOptions,
          propsData,
        },
      };
    },
    updateSlotOptions() {
      this.slotOptions = this.$slots.default;
    },
    getInitialValue() {
      const { multiple, value } = this;
      let initialValue = Array.isArray(value) ? value : [value];
      if (!multiple && (typeof initialValue[0] === 'undefined' || (String(initialValue[0]).trim() === '' && !Number.isFinite(initialValue[0])))) initialValue = [];
      return initialValue.filter(item => Boolean(item) || item === 0);
    },
    getOptionData(value) {
      const option = this.flatOptions.find(({ componentOptions }) => componentOptions.propsData.value === value);
      if (!option) return null;
      const label = getOptionLabel(option);
      return {
        value,
        label,
      };
    },
  },
  mounted() {
    this.$on('item-selected', (item) => {
      this.selectChange(item);
    });

    // set the initial values if there are any
    if (!this.remote && this.selectOptions.length > 0) {
      this.values = this.getInitialValue().map((value) => {
        if (typeof value !== 'number' && !value) return null;
        return this.getOptionData(value);
      }).filter(Boolean);
    }
  },
  components: {
    functional,
  },
};
</script>

<style lang="less">
@import url(../../../static/style/site.vars.less);
.select-box {
  width: 100px;
  margin: 0 auto;
  position: relative;
  display: inline-block;
  .select {
    height: 30px;
    box-sizing: border-box;
    border: 0.1px solid #dbdbdb;
    background: #ffffff;
    padding: 10px;
    padding-left: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &.multiple {
      border: .5px solid #dbdbdb;
      border-radius: 3px;
      padding-left: 4px;
    }
    &.disabled {
      background: #EBEBE4;
      cursor: default;
      color: #ffffff;
    }
    .placeholder {
      color: #7c7c7c !important;
    }
    .chosen {
      flex: 1;
      font-size: 12px;
      color: #000;
      text-align: left;
      ul {
        width: 100%;
        list-style: none;
        li {
          float: left;
          width: 57px;
          height: 20px;
          padding: 2px 5px;
          box-sizing: border-box;
          border: 1px solid @site-main;
          text-align: center;
          border-radius: 2px;
          margin: 0 1px;
          background: @site-bg;
          color: #A0A0A0;
          .close {
            float: right;
            width: 12px;
            height: 12px;
            border-radius: 10px;
            background: rgba(0, 0, 0, 0.2);
            text-align: center;
            box-sizing: border-box;
            position: relative;
            top: 1.5px;
            cursor: pointer;
            &:before {
              content: 'x';
              position: absolute;
              color: @site-bg;
              left: 3.2px;
              top: -3px;
            }
            &:hover {
              background: rgba(0, 0, 0, 0.3);
            }
          }
        }
      }
    }
    i {
      user-select: none;
      transform: rotate(-45deg);
      transition: all 0.1s linear;
      margin-top: -5px;
      color: #b4b4b4;
      font-size: 10px;
    }
  }
  .options-box {
    position: absolute;
    z-index: 1000;
    width: 100%;
    // height: 155px;
    top: 15px;
    display: none;
    list-style: none;
    opacity: 0;
    background: #fff;
    transition: all 0.1s linear;
    overflow: auto;
    box-sizing: border-box;
    border: 1px rgba(0, 0, 0, 0.1) solid;
    &.show {
      display: block;
    }
    li {
      padding: 7px 5px;
      user-select: none;
      cursor: pointer;
      color: #A9A9A9;
      text-align: left;
      font-size: 12px;
      box-sizing: border-box;
      &:hover {
        background: @site-bg;
        color: rgb(0, 119, 255);
      }
      &.selected {
        background: @site-main;
        color: #fff;
      }
    }
  }
}
</style>

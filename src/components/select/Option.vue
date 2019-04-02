<template>
  <li
    :class="{ selected: selected }"
    @click="optionClick">
      <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'Option',
  props: {
    value: [Number, String, Boolean],
    label: String,
    focus: Boolean,
    selected: Boolean,
    selectedValue: [Number, String, Boolean],
  },
  methods: {
    optionClick() {
      this.$parent.$emit('item-selected', {
        value: this.value,
        label: this.label,
      });
    },
  },
};
</script>

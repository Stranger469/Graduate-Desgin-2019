<template>
  <div class="date">
    <div v-if="singleInput" class="input_group" @click="togglePicker">
      <input
        placeholder="选择日期范围"
        type="text"
        :class="{ disabled: disabled }"
        :value="formatDate('single')"
        :style="'width: ' + width"
        disabled>
    </div>
    <div v-else class="input_group" @click="togglePicker">
      <input
        type="text"
        :style="'width:' + width"
        :value="formatDate('start')"
        :class="{ disabled: disabled }"
        disabled>
      <input
        type="text"
        :style="'width:' + width"
        :value="formatDate('end')"
        :class="{ disabled: disabled }"
        disabled>
    </div>
    <transition name="fade">
      <div v-show="show" class="date_picker" :class="{ absolute: !alwaysShow }">
        <header>
          <div class="header_container" :class="{ single: singleInput }">
            <span class="switch_year first" @click="switchYear('before')"></span>
            <span class="switch_month first" @click="switchMonth('before')"></span>
            {{ dateBefore.year }} 年 {{ dateBefore.month }} 月
            <span v-if="singleInput" class="switch_year second" @click="switchYear('after')"></span>
            <span v-if="singleInput" class="switch_month second"
              @click="switchMonth('after')"></span>
          </div>
          <div class="header_container" v-if="!singleInput">
            {{ dateAfter.year }} 年 {{ dateAfter.month }} 月
            <span class="switch_year" @click="switchYear('after')"></span>
            <span class="switch_month" @click="switchMonth('after')"></span>
          </div>
        </header>
        <main>
          <div class="date_container" :class="{ single: singleInput }">
            <ul>
              <li>周日</li>
              <li>周一</li>
              <li>周二</li>
              <li>周三</li>
              <li>周四</li>
              <li>周五</li>
              <li>周六</li>
            </ul>
            <ul class="date_list">
              <li
                v-for="dateItem of dateBeforeList"
                @click="setChecked(dateItem)"
                @mouseover="drawLink(dateItem)"
                :key="dateItem.key"
                :class="{
                  linked: isLinked(dateItem),
                  checked: isChecked(dateItem),
                  unhoverable: calcUnhoverable(dateItem.date),
                  unselected: dateItem.date === ''
                }">
                {{ dateItem.date ? dateItem.date.getDate() : '' }}
              </li>
            </ul>
          </div>
          <div class="date_container" v-if="!singleInput">
            <ul>
              <li>周日</li>
              <li>周一</li>
              <li>周二</li>
              <li>周三</li>
              <li>周四</li>
              <li>周五</li>
              <li>周六</li>
            </ul>
            <ul class="date_list">
              <li
                v-for="dateItem of dateAfterList"
                @click="setChecked(dateItem)"
                @mouseover="drawLink(dateItem)"
                :key="dateItem.key"
                :class="{
                  linked: isLinked(dateItem),
                  checked: isChecked(dateItem),
                  unhoverable: calcUnhoverable(dateItem.date),
                  unselected: dateItem.date === ''
                }">
                {{ dateItem.date ? dateItem.date.getDate() : '' }}
              </li>
            </ul>
          </div>
        </main>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'Date',
  props: {
    value: {
      type: [Array, Date],
    },
    width: {
      type: String,
    },
    alwaysShow: {
      type: Boolean,
      default: false,
    },
    singleInput: {
      type: Boolean,
      default: false,
    },
    // 限制最大可选择日期区间
    max: {
      type: Number,
    },
    disabled: {
      type: Boolean,
    },
  },
  data() {
    return {
      dateBefore: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: 1,
      },
      dateAfter: {
        year: new Date(Date.now() + (31 * 24 * 60 * 60 * 1000)).getFullYear(),
        month: new Date(Date.now() + (31 * 24 * 60 * 60 * 1000)).getMonth() + 1,
        date: 1,
      },
      dateBeforeList: [],
      dateAfterList: [],
      dateSelected: {
        start: null,
        end: null,
      },
      dateHover: null,

      show: this.alwaysShow,
    };
  },
  methods: {
    getMonthDay(month, year) {
      switch (month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12: {
          return 31;
        }
        case 2: {
          if (this.isLeapYear(year)) {
            return 29;
          }
          return 28;
        }
        default: {
          return 30;
        }
      }
    },
    isLeapYear(year) {
      return year % 4 === 0 && year % 100 === 0 && year % 400 === 0;
    },
    setDateList(date, list) {
      const start = new Date(`${date.year}-${date.month}`).getDay();
      const end = this.getMonthDay(date.month, date.year);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 42; i++) {
        if (i < start || i >= end + start) {
          list.push({
            date: '',
            key: Math.random() * 10000,
          });
        } else {
          list.push({
            date: new Date(`${date.year}-${date.month}-${(i - start) + 1}`),
            key: Math.random() * 10000,
          });
        }
      }
    },
    drawLink(item) {
      if (this.singleInput) return;
      if (this.value[0] == null) return;
      this.dateHover = item;
    },
    isLinked(dateItem) {
      if (this.singleInput) return false;
      if (this.dateHover === null) return false;
      if (this.value[1] == null) {
        if (this.dateHover.date > this.value[0]) {
          if (dateItem.date > this.value[0]
          && dateItem.date < this.dateHover.date) {
            return true;
          }
          return false;
        }
        if (dateItem.date < this.value[0]
          && dateItem.date > this.dateHover.date) {
          return true;
        }
        return false;
      }
      if (this.value[0] < this.value[1]) {
        if (dateItem.date > this.value[0]
            && dateItem.date < this.value[1]) {
          return true;
        }
        return false;
      }
      if (dateItem.date < this.value[0]
            && dateItem.date > this.value[1]) {
        return true;
      }
      return false;
    },
    isChecked(dateItem) {
      if (dateItem.date === '') return false;
      if (this.singleInput) {
        // console.log(this.value === null);
        if (this.value === null || this.value === '') return false;
        return dateItem.date.getTime() === this.value.getTime();
      }
      const start = this.value[0] !== null ? this.value[0].getTime() : null;
      const end = this.value[1] !== null ? this.value[1].getTime() : null;
      return dateItem.date.getTime() === start
        || dateItem.date.getTime() === end;
    },
    setChecked(dateItem) {
      if (dateItem.date === '') return;
      if (this.calcUnhoverable(dateItem.date)) return;
      if (this.singleInput) {
        this.$emit('input', dateItem.date);
        this.togglePicker();
        return;
      }
      if (this.value[1] !== null) {
        this.$emit('input', [dateItem.date, null]);
        return;
      }
      if (this.value[0] !== null) {
        if (this.value[0] > dateItem.date) {
          this.$emit('change', [dateItem.date, this.value[0]]);
          this.$emit('input', [dateItem.date, this.value[0]]);
          this.togglePicker();
        } else {
          this.$emit('change', [this.value[0], dateItem.date]);
          this.$emit('input', [this.value[0], dateItem.date]);
          this.togglePicker();
        }
        return;
      }
      this.$emit('input', [dateItem.date, null]);
    },
    formatDate(type) {
      if (this.singleInput) {
        if (this.value === null) return null;
        return `${this.value.getFullYear()}-${this.value.getMonth() + 1}-${this.value.getDate()}`;
      }
      if (this.value[0] === null || this.value[1] === null) return null;
      const startDate = this.value[0];
      const endDate = this.value[1];
      let result = null;
      if (type === 'end') {
        result = startDate > endDate
          ? `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`
          : `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
      } else if (type === 'start') {
        result = startDate > endDate
          ? `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`
          : `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
      } else {
        const end = startDate > endDate
          ? `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`
          : `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
        // eslint-disable-next-line no-multi-assign
        const start = result = startDate > endDate
          ? `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`
          : `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
        result = `${start} -- ${end}`;
      }
      return result;
    },

    switchYear(type) {
      switch (type) {
        case 'before': {
          this.dateBefore.year -= 1;
          this.dateAfter.year -= 1;
          this.dateBeforeList = [];
          this.dateAfterList = [];
          this.setDateList(this.dateBefore, this.dateBeforeList);
          this.setDateList(this.dateAfter, this.dateAfterList);
          break;
        }
        case 'after': {
          this.dateBefore.year += 1;
          this.dateAfter.year += 1;
          this.dateBeforeList = [];
          this.dateAfterList = [];
          this.setDateList(this.dateBefore, this.dateBeforeList);
          this.setDateList(this.dateAfter, this.dateAfterList);
          break;
        }
        default:
          break;
      }
    },
    switchMonth(type) {
      switch (type) {
        case 'before': {
          if (this.dateBefore.month === 1) {
            this.dateBefore.month = 12;
            this.dateBefore.year -= 1;
          } else {
            this.dateBefore.month -= 1;
          }
          if (this.dateAfter.month === 1) {
            this.dateAfter.month = 12;
            this.dateAfter.year -= 1;
          } else {
            this.dateAfter.month -= 1;
          }
          this.dateBeforeList = [];
          this.dateAfterList = [];
          this.setDateList(this.dateBefore, this.dateBeforeList);
          this.setDateList(this.dateAfter, this.dateAfterList);
          break;
        }
        case 'after': {
          if (this.dateBefore.month === 12) {
            this.dateBefore.month = 1;
            this.dateBefore.year += 1;
          } else {
            this.dateBefore.month += 1;
          }
          if (this.dateAfter.month === 12) {
            this.dateAfter.month = 1;
            this.dateAfter.year += 1;
          } else {
            this.dateAfter.month += 1;
          }
          this.dateBeforeList = [];
          this.dateAfterList = [];
          this.setDateList(this.dateBefore, this.dateBeforeList);
          this.setDateList(this.dateAfter, this.dateAfterList);
          break;
        }
        default:
          break;
      }
    },

    togglePicker() {
      if (this.disabled) return;
      if (!this.alwaysShow) {
        this.show = !this.show;
      }
    },
    // 计算不能被点击的元素
    calcUnhoverable(dateItem) {
      if (dateItem === '') return false;
      if (this.singleInput) return false;
      if (this.max !== 0 && this.value[0] !== null) {
        // 计算时间戳
        if (Math.abs(this.value[0].getTime() - dateItem.getTime()) > this.max * this.dayTimeStamp) {
          return true;
        }
      }
      return false;
    },
  },
  computed: {
    dayTimeStamp() {
      return 24 * 60 * 60 * 1000;
    },
  },
  mounted() {
    this.setDateList(this.dateBefore, this.dateBeforeList);
    this.setDateList(this.dateAfter, this.dateAfterList);
  },
};
</script>

<style lang="less">
@import url(../../../static/style/site.vars.less);
.date {
  display: inline-block;
  background: #fff;
  .input_group {
    font-size: 0;
    input {
      font-size: 10px;
      padding: 10px 7px;
      height: 30px;
      box-sizing: border-box;
      cursor: pointer;
      &[disabled] {
        background: #fff;
      }
      &.disabled {
        background: #EBEBE4;
        cursor: default;
      }
    }
  }
  .date_picker {
    background: #fff;
    z-index: 10000;
    &.absolute {
      position: absolute;
    }
    &.fade-enter-active, &.fade-leave-active {
      transition: all .3s;
    }
    &.fade-enter, &.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
      // height: 0 !important;
    }
    header {
      height: 36px;
      background: @site-bg;
      font-size: 0;
      .header_container {
        box-sizing: border-box;
        width: 235px;
        height: 36px;
        display: inline-block;
        border: 1px solid #dbdbdb;
        border-top: 0;
        font-size: 14px;
        padding-top: 7px;
        position: relative;
        text-align: center;
        &.single {
          border: 1px solid #dbdbdb !important;
        }
        &:nth-of-type(1) {
          border-right: 0;
        }
        .switch_year {
          width: 10px;
          height: 10px;
          float: left;
          top: 6px;
          position: relative;
          margin: 0 10px;
          cursor: pointer;
          background: url(../../assets/img/u4208.png) center center;
          &.second {
            transform: rotate(-180deg);
            float: right;
          }
        }
        .switch_month {
          width: 6px;
          height: 10px;
          float: left;
          position: relative;
          top: 6px;
          cursor: pointer;
          background: url(../../assets/img/u4210.png) center center;
          &.second {
            transform: rotate(-180deg);
            float: right;
          }
        }
      }
    }
    main {
      display: flex;
      .date_container {
        height: 205px;
        width: 235px;
        display: inline-block;
        box-sizing: border-box;
        border: 1px solid #dbdbdb;
        border-top: 0;
        &.single {
          border-right: 1px solid #dbdbdb !important;
        }
        ul {
          list-style: none;
          width: 235px;
          font-size: 12px;
          margin: 0 auto;
          margin-left: 2px;
          li {
            width: 29px;
            height: 17px;
            float: left;
            padding: 2px;
            color: rgb(0, 119, 255);
            user-select: none;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          &.date_list {
            li {
              height: 25px;
              cursor: pointer;
              padding-top: 3px;
              &:hover {
                color: #fff;
                background: @site-main;
              }
              &.linked {
                background: rgb(126, 186, 255);
                &:hover {
                  color: rgb(0, 119, 255);
                }
              }
              &.checked {
                color: #fff;
                background: @site-main;
              }
              &.unhoverable {
                cursor: default;
                background: rgb(231, 231, 231);
                &:hover {
                  color: rgb(0, 119, 255);
                  background: rgb(231, 231, 231);
                }
              }
              &.unselected {
                cursor: default;
                &:hover {
                  background: #fff;
                }
              }
            }
          }
        }
        &:nth-of-type(1) {
          border-right: 0;
        }
      }
    }
  }
}
</style>


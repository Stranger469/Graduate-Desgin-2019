<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/';
export default {
  name: 'App',
};
</script>

<style lang="less">
@import url(../static/style/site.comm.less);
#app {
  height: 100%;
  font-family: 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: rgb(240, 247, 255);
}
</style>

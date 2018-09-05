<template>
  <div id="app">
   <HeaderItems></HeaderItems>
   <router-view/>
  </div>
</template>

<script>
  import HeaderItems from '@/components/Header/HeaderItems'
export default {
  name: 'App',
  components: {
    HeaderItems
  },
  data () {
    return {}
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  margin: 0;
  padding: 0;
  background: #000000;
  min-width: 340px;
  height: 100vh;
}
@media screen and (max-width: 1680px) {
  html {
    font-size: 3.7em;
  }
}

@media screen and (max-width: 1280px) {
  html {
    font-size: 3em;
  }
}

@media screen and (max-width: 736px) {
  html {
    font-size: 1em;
  }
}

@media screen and (max-width: 360px) {
  html {
    font-size: 0.5em;
  }
}
</style>

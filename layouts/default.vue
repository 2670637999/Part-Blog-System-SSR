<template>
  <div id="App">
    <headers></headers>
    <!-- <transition mode="out-in" enter-active-class="part-enter-2" leave-active-class="part-leave-1"> -->
        <nuxt/>
    <!-- </transition> -->
    <footers></footers>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
#App { 
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: rgb(247, 247, 247);
}
</style>
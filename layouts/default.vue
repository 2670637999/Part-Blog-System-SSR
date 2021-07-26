<template>
  <div id="App">
    <headers></headers>
    <!-- <transition mode="out-in" enter-active-class="part-enter-2" leave-active-class="part-leave-2"> -->
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
.page-enter-active {
  animation: part-enter-2 1s;
}
.page-leave-active {
  animation: part-leave-1 0.71s;
}
#App { 
  transition: 1s;
    width: 100%;
    // height: 1000px;
    margin: 0;
    padding: 0;
    background-color: rgb(247, 247, 247);
}
</style>
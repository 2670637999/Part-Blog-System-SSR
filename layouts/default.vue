<template>
  <div id="App">
    <headers></headers>
    <!-- <transition mode="out-in" enter-active-class="part-enter-2" leave-active-class="part-leave-2"> -->
     <main>
        <nuxt/>
      </main>   
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
  animation: part-leave-1 0.51s cubic-bezier(0.1, 1, 1, 1);
}
#App { 
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: rgb(247, 247, 247);
  main {
    margin: 10px 0px;
  }
}
</style>
<template>
  <div v-show="loading" class="loading-page">
    <div class="loading"></div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      loading: false,
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      },
    },
  }
</script>
<style scoped>
  .loading-page {
    position: fixed;
    right: 15px;
    bottom: 0;
    z-index: 1000;
    padding: 1rem;
    text-align: center;
    font-size: 3rem;
    font-family: sans-serif;
  }
  .loading {
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    border: 4px solid rgba(221, 233, 255, 0.692);
    border-radius: 70%;
    border-top-color: cornflowerblue;
    animation: spin 1s infinite;

  }
  @keyframes spin {
    0%{
    }50%{

    }
    100%{
      -webkit-transform: rotate(360deg);
    }
  }
</style>

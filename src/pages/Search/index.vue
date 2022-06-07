<template>
  <div>
    <h1>params参数----{{$route.params.keywords}}==========={{keywords}}=={{a}}==={{b}}</h1>
    <h1>query参数----{{$route.query.k}}</h1>
  </div>
</template>


<script>
export default {
  name: '',
  props: ['keywords','a','b']
}
</script>


<style lang="less" scoped>

</style>

<template>
  <div>
    <!-- 三级联动全局组件!三级联动已经注册为全局组件，因此不需要再引入 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor></Floor>
    <Floor></Floor>
    <Brand></Brand>
    <!-- <button @click="add">点我加1</button>
    <span>仓库的数据{{count}}</span>
    <button>点我减1</button> -->
  </div>
</template>


<script>
import TypeNav from '@/components/TypeNav/index.vue';
// 引入其余的组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from './Recommend/index.vue';
import Rank from './Rank/index.vue';
import Like from '@/pages/Home/Like'
import Floor from './Floor/index.vue';
import Brand from './Brand/index.vue';

// import {mapState} from 'vuex'

export default {
    name: "",
    components: { TypeNav, ListContainer, Recommend, Rank, Like, Floor, Brand },
    /* computed: {
      ...mapState(['count'])
    },
    methods: {
      add() {
        // 派发action
        this.$store.dispatch('add')
      }
    } */
}
</script>


<style lang="less" scoped>

</style>

<template>
  <div class="app-container">
      <navs :datanav="navs"></navs>
  </div>
</template>

<script>
import navs from '@/components/nav'
export default {
  data () {
    return {
      //  id: 0,
       navs: { 'navs': [
         {
           'name': '推荐',
           'id':1,
           'link': '',
           'navlist': [{
             'name': '推荐',
             'id': 1,
             'link': '/'
           }
          ]
         },
         {
           'name': '推荐',
           'id':2,
           'link': '',
           'navlist': [{
             'name': '推荐',
             'id': 1,
             'link': '/'
           }
          ]
         },
         {
           'name': '推荐',
           'id':3,
           'link': '',
           'navlist': [{
             'name': '推荐',
             'id': 1,
             'link': '/'
           }
          ]
         }
       ]
       }
    }
  },
  components: {
      navs
  },
  methods: {
   
  },
}
</script>

<style scoped lang="less" type="text/less">

 
</style>

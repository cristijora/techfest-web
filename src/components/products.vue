<template>
  <div>
    <div v-for="product in products">
      <!--{{product.name}}-->
      <img src="produt.image">
    </div>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
    export default{
    computed:{
    ...mapGetters(['payments'])
    },
    methods:{
    ...mapActions(['getPayments'])
    },
    mounted(){
    this.getPayments();
    }
    }

</script>

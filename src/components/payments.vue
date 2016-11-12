<template>
  <div>
    <transition-group name="list" tag="div">
      <div v-for="payment in payments" :key="payment">
        <div class="card card-user col-xs-11" style="margin-left:20px;">
          <div class="image">
          </div>
          <div class="content">
            <div class="author col-xs-4">
              <img class="avatar border-white" :src="payment.sender.image" alt="...">
              <h4 class="title">{{payment.sender.firstName}} {{payment.sender.lastName}}<br>
                <a href="#">
                  <small>{{payment.sender.email}}</small>
                </a>
              </h4>
            </div>

            <div v-if="payment.products" class="col-xs-7 col-md-offset-1">
              <transition-group name="list" tag="div">
                <div v-for="product in payment.products" :key="product">
                    <div class="row">
                      <div class="col-xs-3">
                        <div class="avatar">
                          <img :src="product.image" alt="Circle Image" class="img-circle img-no-padding img-responsive">
                        </div>
                      </div>
                      <div class="col-xs-6">
                        {{product.name}}
                        <br>
                        <span class="text-success"><small>Paid</small> {{product.price}} Lei</span>
                      </div>
                      <div class="col-xs-3 text-right">
                        <button class="btn btn-sm btn-success btn-icon"><i class="fa fa-envelope"></i></button>
                      </div>
                    </div>
                </div>
              </transition-group>
            </div>
            </div>
          </div>
          <hr>
          <div class="text-center row" data-background="color" data-color="green">
            <div class="row">
              <div class="col-md-5 col-md-offset-1">
                <h5>
                  <small>Paid</small>
                  <br>  <i class="ti-time"></i> {{getPrettyDate(payment.date)}}<br></h5>
              </div>
              <div class="col-md-5">
                <h5>
                  <small>Spent</small>
                  <br>{{payment.amount}} Lei
                </h5>
              </div>
            </div>
          </div>
        </div>
        <!-- <img :src="payment.sender.image" width="30" height="30">
         <div>
           {{payment.sender.firstName}} {{payment.sender.lastName}}
         </div>
         <div>
           {{payment.amount}}
         </div>-->
    </transition-group>

  </div>
</template>
<script>
  import {mapActions,mapGetters} from 'vuex'
  import prettyDate from 'pretty-date'
  export default{

    computed:{
    ...mapGetters(['payments','user']),
    },
    methods:{
     ...mapActions(['getPayments','addPayment']),
     getPrettyDate(stringDate){
        var date=new Date(stringDate)
        return prettyDate.format(date);
     }
    },
    mounted(){
      this.getPayments()
      var socket=io("https://techfest.herokuapp.com");
      socket.on("payment",(data)=>{
        this.addPayment(data);
      })
    }
  }

</script>

<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-active {
  opacity: 0;
  transform: translateY(30px);
}

</style>

<template>
  <div id="app">
    {{payments | json}}
  </div>
</template>

<script>
import Hello from './components/Hello'
export default {
  name: 'app',
  components: {
    Hello
  },
  data(){
  return {
    payments:["test"]
  }

  },
  mounted(){
  var socket = io('http://localhost:3000');
  var self=this;
  socket.on('payment', function (data) {
    self.payments.push(data);
    console.log(data);
  });
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>

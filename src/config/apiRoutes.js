/**
 * Created by cristian.jora on 12.10.2016.
 */
var base_url='http://localhost:3000/api/';
export default {
  routes:{
    login:base_url+'customers/login',
    payments: base_url +'payments?filter[where][userId]=',
  },
  base_url:base_url
}

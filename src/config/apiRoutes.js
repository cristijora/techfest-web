/**
 * Created by cristian.jora on 12.10.2016.
 */
var base_url='https://techfest.herokuapp.com/api/';
export default {
  routes:{
    login:base_url+'customers/login?include=user',
    payments: base_url +'payments/',
  },
  base_url:base_url
}

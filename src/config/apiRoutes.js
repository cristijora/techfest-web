/**
 * Created by cristian.jora on 12.10.2016.
 */
var base_url='http://kairyapi.corebuild.eu/api/';
export default {
  routes:{
    login:base_url+'customers/login',
    register:base_url+'customers',
    fitbit:base_url+'/fitbit/data',
    get_settings:base_url+'customers/',
    get_mood:base_url+'/mood',
    get_behaviour:base_url+'behaviour',
    events: base_url+'events/',
    getEvents: base_url +'events?filter[where][customerId]='
  },
  base_url:base_url
}

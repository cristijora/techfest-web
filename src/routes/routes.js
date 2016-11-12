
// import NotFound from './../components/dashboard/components/404_Page.vue'
//user settings related

/*const Dashboard = resolve => { //Lazy load the dashboard
  require.ensure(['./../components/admin.vue'], () => {
    resolve(require('./../components/admin.vue'))
  })
}*/
import Dash from './../components/admin.vue'
const routes = [
  {
    path: '/admin',
    component: Dash
  },
]

export default routes;

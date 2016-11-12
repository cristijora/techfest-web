
// import NotFound from './../components/dashboard/components/404_Page.vue'
//user settings related

/*const Dashboard = resolve => { //Lazy load the dashboard
  require.ensure(['./../components/admin.vue'], () => {
    resolve(require('./../components/admin.vue'))
  })
}*/
import Dash from './../components/admin.vue'
import Products from './../components/products.vue'
import Payments from './../components/payments.vue'
const routes = [
  {
    path: '/admin',
    component: Dash,
    children:[
      {
      path: 'products',
        name:'products',
      component:Products
      },
      {
        path: 'payments',
        name:'payments',
        component:Payments
      }
    ]
  },
]

export default routes;

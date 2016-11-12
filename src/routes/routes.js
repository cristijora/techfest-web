/**
 * Created by cristian.jora on 30.10.2016.
 */
import Register from './../components/Register'
import Login from './../components/Login'
import Authentication from './../components/Authentication'
import DashboardMain from './../components/dashboard/components/DashboardContent.vue'
import FormLayouts from './../components/dashboard/components/FormLayouts.vue'
import Calendar from './../components/dashboard/components/Calendar.vue'
import ForgotPassword from './../components/ForgotPassword.vue'
import SetData from './../components/dashboard/components/UserSettings.vue'
import NotFound from './../components/dashboard/components/404_Page.vue'
//user settings related
import Mood from './../components/dashboard/components/data-tracking/Mood.vue'
import Behavior from './../components/dashboard/components/data-tracking/Behavior.vue'
import Fluids from './../components/dashboard/components/data-tracking/Fluids.vue'
import Food from './../components/dashboard/components/data-tracking/Food.vue'
import Health from './../components/dashboard/components/data-tracking/Health.vue'
import Medication from './../components/dashboard/components/data-tracking/Medication.vue'
import PottyTraining from './../components/dashboard/components/data-tracking/PottyTraining.vue'
import Sensory from './../components/dashboard/components/data-tracking/Sensory.vue'
import Socialization from './../components/dashboard/components/data-tracking/Socialization.vue'
import Supplements from './../components/dashboard/components/data-tracking/Supplements.vue'
import Weather from './../components/dashboard/components/data-tracking/Weather.vue'
import Wristband from './../components/dashboard/components/data-tracking/Wristband.vue'
import DataTracking from './../components/dashboard/components/data-tracking/DataTracking.vue'

const Dashboard = resolve => { //Lazy load the dashboard
  require.ensure(['./../components/Dashboard.vue'], () => {
    resolve(require('./../components/Dashboard.vue'))
  })
}
const routes = [
  {
    path: '/',
    component: Authentication,
    redirect: '/login',
    children: [
      {path: '/login', name: 'login', component: Login},
      {path: 'register', name: 'register', component: Register},
      {path: 'forgot', name: 'forgotpassword', component: ForgotPassword},

    ]
  },
  {
    path: '/admin',
    component: Dashboard,
    auth: true,
    redirect: '/admin/main-dashboard',
    children: [
      {
        path: 'main-dashboard',
        name: 'main-dashboard',
        component: Calendar
      },
      {
        path: 'form-layouts',
        name: 'form-layouts',
        component: FormLayouts
      },
      {
        path: 'calendar',
        name: 'calendar',
        component: Calendar
      },
      {
        path: 'set-data',
        name: 'set-data',
        component: SetData
      },
      {
        path: 'settings',
        name: 'settings',
        component: DataTracking,
        children: [
          {
            path: 'mood',
            name: 'mood',
            component: Mood
          },
          {
            path: 'behavior',
            name: 'behavior',
            component: Behavior
          },
        ]
      },
      {
        path: '*',
        name: '*',
        component: NotFound
      },
    ]
  },
  {
    path: '*',
    name: '*',
    component: NotFound
  },

]

export default routes;

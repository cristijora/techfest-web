<template>
  <div class="wrapper">
    <div class="sidebar" data-background-color="brown" data-active-color="danger">
      <!--
            Tip 1: you can change the color of the sidebar's background using: data-background-color="white | brown"
            Tip 2: you can change the color of the active button using the data-active-color="primary | info | success | warning | danger"
        -->
      <div class="logo">
        <a href="http://www.creative-tim.com" class="simple-text">
          {{user.firstName}}
        </a>
      </div>
      <div class="logo logo-mini">
        <a href="http://www.techfest.ro" class="simple-text">
          TF
        </a>
      </div>
      <div class="sidebar-wrapper">
        <div class="user">
          <div class="photo">
            <img :src="user.image">
          </div>
          <div class="info">
            <a data-toggle="collapse" href="#collapseExample" class="collapsed">
              {{user.firstName}} {{user.lastName}}
              <b class="caret"></b>
            </a>
            <div class="collapse" id="collapseExample">
              <ul class="nav">
                <li><a href="#profile">My Profile</a></li>
                <li><a href="#edit">Edit Profile</a></li>
                <li><a href="#settings">Settings</a></li>
              </ul>
            </div>
          </div>
        </div>
        <ul class="nav">
         <!-- <li>
            <a data-toggle="collapse" href="#dashboardOverview">
              <i class="ti-panel"></i>
              <p>Collapse
                <b class="caret"></b>
              </p>
            </a>
            <div class="collapse" id="dashboardOverview">
              <ul class="nav">
                <li><a href="#panda">Collapse 1</a></li>
                <li><a href="#panda">Collapse2</a></li>
              </ul>
            </div>
          </li>-->

          <li>
            <router-link :to="{name:'payments'}">
              <i class="ti-calendar"></i>
              <p>Payments</p>
            </router-link>
          </li>

        </ul>
      </div>
    </div>

    <div class="main-panel">
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-minimize">
            <button id="minimizeSidebar" class="btn btn-fill btn-icon"><i class="ti-more-alt"></i></button>
          </div>
          <div class="navbar-header">
            <button type="button" class="navbar-toggle">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar bar1"></span>
              <span class="icon-bar bar2"></span>
              <span class="icon-bar bar3"></span>
            </button>
            <a class="navbar-brand" href="#charts">Template</a>
          </div>
          <div class="collapse navbar-collapse">
            <form class="navbar-form navbar-left navbar-search-form" role="search">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-search"></i></span>
                <input type="text" value="" class="form-control" placeholder="Search...">
              </div>
            </form>
            <ul class="nav navbar-nav navbar-right">
              <li>
                <a href="#stats" class="dropdown-toggle btn-magnify" data-toggle="dropdown">
                  <i class="ti-panel"></i>
                  <p>Stats</p>
                </a>
              </li>
              <li class="dropdown">
                <a href="#notifications" class="dropdown-toggle btn-rotate" data-toggle="dropdown">
                  <i class="ti-bell"></i>
                  <span class="notification">5</span>
                  <p class="hidden-md hidden-lg">
                    Notifications
                    <b class="caret"></b>
                  </p>
                </a>
                <ul class="dropdown-menu">
                  <li><a href="#not1">Notification 1</a></li>
                  <li><a href="#not2">Notification 2</a></li>
                  <li><a href="#not3">Notification 3</a></li>
                  <li><a href="#not4">Notification 4</a></li>
                  <li><a href="#another">Another notification</a></li>
                </ul>
              </li>
              <li>
                <a href="#settings" class="btn-rotate">
                  <i class="ti-settings"></i>
                  <p class="hidden-md hidden-lg">
                    Settings
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <router-view></router-view>
            <!-- your content here -->

          </div>
        </div>
      </div>

      <footer class="footer">
        <div class="container-fluid">
          <nav class="pull-left">
            <ul>
              <li>
                <a href="http://www.techfest.ro">
                  {{user.firstName}}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  </div>
</template>
<style lang="scss">
  @import './../assets/sass/paper-dashboard.scss';
</style>
<script>
  import {mapActions,mapGetters} from 'vuex'
  export default{
    computed:{
    ...mapGetters(['user'])
    },
    methods:{
     ...mapActions(['login']),
    },
    mounted(){
        var user={
          username:'techfest',
          password:'techfest'
        }
        this.login(user)
    }

  }
</script>

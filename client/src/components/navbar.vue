<template>
<!-- Navbar  -->
    <v-layout>
        <v-toolbar dark class='indigo darken-4' fixed >
            <v-toolbar-side-icon  @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
            <a href="/" style="color:white; hover:none"><v-toolbar-title ><v-icon>bug_report</v-icon> Bug's point</v-toolbar-title></a>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat class='text-none' to='/' router>Home</v-btn>
            <v-btn class='text-none' to='/about' router flat>About Us</v-btn>
            <v-btn class='text-none' to='/login'  v-if='login' router flat> Login / Signup</v-btn>
            <v-btn class='text-none' to='/contact' router flat>Contact us</v-btn>
            <v-btn fab dark color="teal" small to='/addbug' router>
             <v-icon dark>add</v-icon>    
            </v-btn>
            <v-menu offset-y v-if="logout">
      <template v-slot:activator="{ on }">
        <v-btn
          color="cyan lighten-1"
          dark
          small
          v-on="on"
           fab
           >
           <v-icon>face</v-icon>          
        </v-btn>
      </template>
      <v-list>
        <v-list-tile @click="profile">
           <v-list-tile-action><v-icon>face</v-icon></v-list-tile-action>
          <v-list-tile-title >Profile</v-list-tile-title>
        </v-list-tile>
                <v-list-tile @click="profile"> <v-list-tile-action><v-icon>bug_report</v-icon></v-list-tile-action>
          <v-list-tile-title>My Bugs</v-list-tile-title>
        </v-list-tile>
                <v-list-tile @click="logout_function">
                   <v-list-tile-action><v-icon>account_box</v-icon></v-list-tile-action>
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
            
        </v-toolbar-items>
        </v-toolbar>
        
        <!-- Drawer for mobile size user -->
        <v-navigation-drawer
            v-model="drawer"
            v-bind:stateless='logout'
            value='false'
            absolute
            temporary
           :width="250"
            >
            <v-toolbar flat>
            <v-list>
                <v-list-tile>
                <v-list-tile-action><v-icon>bug_report</v-icon></v-list-tile-action>              
                <v-list-tile-title class="title">
                    Bug's point
                </v-list-tile-title>

                </v-list-tile>
            </v-list>
            </v-toolbar>
            <v-list dense class="pt-0">
            <v-list-tile
                v-for="item in items"
                :key="item.title"
                router
                :to="item.route"
            >
                <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            </v-list>
            
    </v-navigation-drawer>
    <v-navigation-drawer v-if="logout"
            v-model="drawer"
            absolute
            temporary
           :width="250"
            >
            <v-toolbar flat>
            <v-list>
                <v-list-tile>
                <v-list-tile-action><v-icon>bug_report</v-icon></v-list-tile-action>              
                <v-list-tile-title class="title">
                    Bug's point
                </v-list-tile-title>
                </v-list-tile>
            </v-list>
            </v-toolbar>

            <v-list dense class="pt-0">
            <v-list-tile
                v-for="item2 in items2"
                :key="item2.title"
                router
                :to="item2.route"
            >
                <v-list-tile-action>
                <v-icon>{{ item2.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                <v-list-tile-title>{{ item2.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            </v-list>
            <v-list>               
  <v-list-group
       no-action
      prepend-icon="account_circle"
     value="true">
          <template v-slot:activator>
            <v-list-tile >
            <v-list-tile-title>User</v-list-tile-title>
            </v-list-tile>
            </template>

          <v-list-tile to="/profile" route>
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>My Bugs</v-list-tile-title>
          </v-list-tile>
            <v-list-tile>
            <v-list-tile-title @click="logout_function" > <v-icon small>account_circle</v-icon>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list-group>
        </v-list>
    </v-navigation-drawer>
    <!--     ----------------------------------------------------------------- -->
  </v-layout>

</template>
<script>
import { mapState , mapActions } from 'vuex' ;
import store from "../store"
export default {
  
  data () {
    return {
      bugd:true,
      drawer: false,
       items: [
          { title: 'Home', icon: 'home' , route:'/' },
          { title: 'About', icon: 'info' , route:'/about' },
          { title: 'Contact US', icon: 'contact_mail' , route:'' },
          { title: 'Login / Signup', icon: 'account_box' , route:'/login' },
           
        ],
        items2: [
          { title: 'Home', icon: 'home' , route:'/' },
          { title: 'Add Bug', icon: 'bug_report' , route:'/addbug' },
          { title: 'About', icon: 'info' , route:'/about' },
          { title: 'Contact US', icon: 'contact_mail' , route:'' },
           
        ],
        users: [{ title: 'Profile', icon: 'face', click:'profile' },
                 { title: 'My Bugs', icon: 'bug_report', click:'profile' },
                 { title: 'logout', icon: 'account_circle', click:'logout_function' },],
        right: null,
      }
    },
    created() {
          store.dispatch('login_logout')  
    }, 
    computed: {
      ...mapState([
        'login','logout'
      ]),
      ...mapActions([
        'login_logout'
      ])
    },
    methods: {
      profile(){
         this.$router.push({name:'profile' })
      },

      logout_function(){
        localStorage.removeItem('token');
        store.dispatch('login_logout')
        this.$router.push({name:'home'})
      }
    },
}
</script>

<template>
    <v-app>
        <v-app-bar
        app
        color="primary"
        dark
        >
            <v-toolbar-title>Trello Clone</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items v-if="!user">
                <v-btn text :to="{ name: 'Login' }">Login</v-btn>
                <v-btn text :to="{ name: 'SignUp' }">SignUp</v-btn>
            </v-toolbar-items>
            <v-toolbar-items v-if="user">
                <v-btn text @click="logout">Logout</v-btn>
            </v-toolbar-items>

        </v-app-bar>

        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>


<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: 'App',
        data()  {
           return {
               fixed: false
           }
       },
       computed: {
            ...mapState('auth', { user: 'payload' })
        },
       methods: {
           ...mapActions('auth', { authLogout: 'logout' } ),
           logout() {
               this.authLogout().then( () => this.$router.push('/login')  )
           }
       }
    }
</script>

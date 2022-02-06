<template>
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <v-layout row align-center>
                <v-progress-circular
                  v-if="loading"
                  :size="70"
                  :width="7"
                  indetermine
                  color="primary">
                </v-progress-circular>
                <h2 v-if="board">{{ board.name }}</h2>
                <v-flex
                    v-if="!loading" sm3 pa-2
                    v-for="list in lists"
                    :key="list._id"
                >
                    <v-card>
                        <v-card-title primary>
                            <div class="headline">{{ list.name }}</div>
                        </v-card-title>
                    </v-card>
                </v-flex>
                <!-- <v-flex sm4 pa-2 >
                   <v-card-title primary-title style="flex-direction: column">
                       <div class="headline">Create List</div>
                       <div>
                           <v-form
                               v-if="!creatingList"
                               v-model="validList"
                               @submit.prevent="createList"
                               @keydown.prevent.enter
                             >
                               <v-text-field
                                 v-model="list.name"
                                 :rules="notEmptyRules"
                                 label="Name"
                                 required
                               ></v-text-field>

                               <v-btn type="submit" :disabled="!validList">Create List</v-btn>
                           </v-form>
                           <v-progress-circular
                             v-if="creatingList"
                             :size="70"
                             :width="7"
                             indetermine
                             color="primary">
                           </v-progress-circular>
                       </div>
                   </v-card-title>
               </v-flex> -->
            </v-layout>
        </v-slide-y-transition>
    </v-container>
</template>

<script>
    import { mapState, mapActions, mapGetters } from 'vuex'
    export default {
        name: 'board',
        data: () => ({
            board: {},
            validList: false,
            list: {
                name: ''
            },
            notEmptyRules: [ (value) => !!value || 'cannot be empty']
        }),
        mounted() {
            this.getBoard( this.$route.params.id )
            .then( response => {
                 this.board = response.data || response
            })
        },
        methods: {
            ...mapActions('boards',  { getBoard: 'get' }),
            createList() {
                if (this.valid) {
                    const { List } = this.$FeathersVuex
                    const list = new List(this.list)
                    list.save()
                        .then( () => {
                            this.list = {
                                name: ''
                            }
                    })
                }
            }
        },
        computed: {
            ...mapState('boards ', {
                loading: 'isGetPending'
            })
        }
    }
</script>

<style scope></style>

<template>
    <div class="text-center">
        <button @click="opendialog()">Info</button>
        <v-dialog
            v-model="dialog"
            width="500"
        >
            <v-card>
                <v-card-title
                    class="headline"
                    primary-title
                >                
                    {{ name }} 
                </v-card-title>
                <v-card-text>
                    <b>Description</b><br>
                    {{ description }}<br>
                </v-card-text>
                <v-divider/>
                <v-card-actions>
                    <v-spacer/>
                    <button @click="dialog = false"> Ok </button>
                    <v-spacer/>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import ActivityService from "../services/activityService";
import ClubService from "../services/clubService";
import User from "../models/User";
import alerter from '../utils/alerter';

export default {
    data () {
        return {
            user: new User(),
            dialog: false,
        }
    },
    props: {
        name: { type: String },
        description: { type: String },
    },
    computed: {
        getCurrentUser() {
            return this.$store.state.auth.status.loggedIn &&
                   this.$store.state.auth.user.user; 
        }
    },
    methods: {
        opendialog() {
            this.dialog = true;
        },
    },
    mounted() {
        this.user = this.getCurrentUser;
    }
}
</script>

<style scoped lang="scss">
#info-btn {
    position: relative;
}
.text-center {
    z-index: 9999;
}
#greenbtn {
    border: 2px solid #67C23A;
    color: #67C23A;
}
#greenbtn:hover {
    background-color: #67C23A;
    color: white;
}

button{
    padding: 5px 30px;
    border-radius: 50px;
    outline: none;
    border: 2px solid #4285F4;
    box-shadow:  0px 3px silver;
    color: #4285F4;
    cursor: pointer;
    transition: .1s;
}
button:hover {
    background-color: #4285F4;
    color: #fff;
}
button:active {
    box-shadow: 0 1px silver;
    transform: translateY(3px);
}
</style>
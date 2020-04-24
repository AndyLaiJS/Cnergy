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
                    <button
                        @click="handleMembers">
                        <i class="el-icon-user"/> 
                    </button>
                    <v-spacer/>
                    <!-- Who is member -->
                    <v-dialog
                        v-model="memberDialog"
                        width="500"
                    >
                        <v-card>
                            <v-card-title
                                class="headline"
                                primary-title
                            > 
                                Current Members
                            </v-card-title>
                            <v-card-text 
                                class="v-card-text-content"
                            >   
                                <!-- show the name of the member -->
                                <div
                                    v-for="(member, index) in clubMembers"
                                    :key="index"
                                > 
                                    <span> {{ getFormattedName(member.user.firstName, member.user.lastName) }} </span>
                                    <i
                                        class="el-icon-info"
                                        @click="setSelectedMember(member.user)"
                                    />
                                    <!-- show more info of that member -->
                                     <v-dialog
                                        v-model="memberInfoDialog"
                                        width="500"
                                    >
                                        <v-card>
                                            <v-card-title
                                                class="headline"
                                                primary-title
                                            > 
                                                {{ getFormattedName(selectedUser.firstName, selectedUser.lastName) }}
                                            </v-card-title>
                                            <v-card-text>
                                                <b>College</b>: {{ selectedUser.college }}<br>
                                                <b>Major</b>: {{ selectedUser.major }}<br>
                                                <b>Email</b>: {{ selectedUser.email }}<br>
                                            </v-card-text>
                                            <v-divider/>
                                            <v-card-actions>
                                                <v-spacer/>
                                                <button
                                                    @click="memberInfoDialog = false"
                                                >
                                                    Ok 
                                                </button>
                                                <v-spacer/>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                    <!-- show more info of that member/ -->
                                </div>
                            </v-card-text>
                            <v-divider/>
                            <v-card-actions>
                                <v-spacer/>
                                <button @click="memberInfoDialog = false"> Back </button>
                                <v-spacer/>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <!-- who is member/ -->
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
import formatter from "../utils/formatter";

export default {
    data () {
        return {
            user: new User(),
            selectedUser: new User(),
            clubMembers: [],

            dialog: false,
            memberDialog: false,
            memberInfoDialog: false,
        }
    },
    props: {
        id: { type: Number },
        name: { type: String },
        description: { type: String },
    },
    computed: {
        getCurrentUser() {
            return this.$store.state.auth.status.loggedIn &&
                   this.$store.state.auth.user.user; 
        },
    },
    methods: {
        getFormattedName: (firstName, lastName) => formatter.getFormattedName(firstName, lastName),
        opendialog() {
            this.dialog = true;
        },
        setSelectedMember(user) {
            this.selectedUser = user;
            this.memberInfoDialog = true;
        },
        async handleMembers() {
            let response =
                await ClubService
                    .getClubMembers(this.id)
                    .then(response => this.clubMembers = response.data);

            this.memberDialog = true
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
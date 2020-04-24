<template>
    <!-- For ProfileHome.vue -->
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
                    Description: {{ description }}<br>
                    Minimum Participants: {{ minParticipants }}<br>
                    Maximum Participants: {{ maxParticipants }}<br>
                    Activity Type: {{ type }}<br>
                </v-card-text>
                <v-divider/>
                <v-card-actions>
                    <v-spacer/>
                    <button
                        @click="dialogMember = true">
                            <i class="el-icon-user"></i> 
                    </button>
                    <!-- Who is member -->
                    <v-dialog
                        v-model="dialogMember"
                        width="500"
                    >
                        <v-card>
                            <v-card-title
                                class="headline"
                                primary-title
                            > 
                                Current members
                            </v-card-title>
                            <v-card-text 
                                class="v-card-text-content"
                            >   
                                <!-- show the name of the member -->
                                <div
                                    v-for="(member, index) in this.activityMembers"
                                    :key="index"
                                > 
                                    <span> {{ getFormattedName(member.firstName, member.lastName) }} </span>
                                    <i
                                        class="el-icon-info"
                                        @click="setSelectedUser(member)"
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
                                                    @click="dialogMember = false"
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
                                <button @click="dialogMember = false"> Back </button>
                                <v-spacer/>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <!-- who is member/ -->
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
            dialogMember: false,
            activityMembers: []
        }
    },
    props: {
        name: { type: String },
        description: { type: String },
        minParticipants: { type: Number },
        maxParticipants: { type: Number },
        type: { type: String }
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
        handleJoinClub() {
            // TODO: Create another pop up to allow user to fill the required fields:
            // Reason: Why the user want to join the club
        },
        async handleJoinActivity() {
            let response = 
                await ActivityService
                    .joinActivity(this.user.id, this.data.id)
                    .then(response => response.status == 200
                        ?   this.$fire(alerter.successAlert(
                                "Signed Up Success",
                                response.data.message
                            ))
                        :   this.$fire(alerter.errorAlert(
                                "Signed Up Failed",
                                response.data.message
                        )));
        },
        handleJoin() {
            if (this.context == "club") {
                this.handleJoinClub();
                return;
            }
            this.handleJoinActivity();
        }
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
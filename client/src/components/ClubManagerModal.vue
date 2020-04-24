<template>
    <div class="text-center">
        <button @click="openDialog()">Edit</button>
        <v-dialog
            v-model="dialog"
            width="500"
            scrollable
        >
            <v-card>
                <v-card-title
                    class="headline"
                    primary-title
                > 
                    {{ this.clubName }}
                </v-card-title>       
                <textarea 
                    rows="6"
                    v-model="updatedDescription"
                    placeholder="Enter your updated description here" 
                />
                <v-divider/>
                <v-card-actions>
                    <v-spacer/>
                    <button
                        @click="handleMembers"
                    >
                        <i class="el-icon-user"></i>
                    </button>
                    <v-spacer/>
                    <button
                        id="greenbtn"
                        @click="handleEdit"
                    >
                        <i class="el-icon-edit"></i>
                    </button>
                    <v-spacer/>
                    <button
                        @click="handleRequest"
                    >
                        <i class="el-icon-info"></i>
                    </button>
                    <!-- Render join request users -->
                    <v-dialog
                        v-model="joinRequestDialog"
                        width="500"
                    >
                        <v-card>
                            <v-card-title
                                class="headline"
                                primary-title
                            > 
                                Join Requests
                            </v-card-title>
                            <v-card-text 
                                class="v-card-text-content"
                            >   
                                <div
                                    v-for="(user, index) in this.joinRequestUsers"
                                    :key="index"
                                > 
                                    <span> {{ getFormattedName(user.firstName, user.lastName) }} </span>
                                    <i
                                        class="el-icon-info"
                                        @click="setSelectedUserRequest(user)">
                                    </i>
                                    <v-dialog
                                        v-model="decisionDialog"
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
                                                <b>Reason</b>: {{ selectedUser.reason }}<br>
                                            </v-card-text>
                                            <v-divider/>
                                            <v-card-actions>
                                                <v-spacer/>
                                                <button
                                                    id="greenbtn"
                                                    @click="handleAcceptRequest(selectedUser.id)"
                                                >
                                                    Accept
                                                </button>
                                                <v-spacer/>
                                                <button
                                                    id="redbtn"
                                                    @click="handleRejectRequest(selectedUser.id)"
                                                >
                                                    Reject
                                                </button>
                                                <v-spacer/>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </div>
                            </v-card-text>
                            <v-divider/>
                            <v-card-actions>
                                <v-spacer/>
                                <button @click="joinRequestDialog = false"> Back </button>
                                <v-spacer/>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <!-- Render club members / -->
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
                                <div
                                    v-for="(member, index) in clubMembers"
                                    :key="index"
                                > 
                                    <span> {{ getFormattedName(member.user.firstName, member.user.lastName) }} </span>
                                    <i
                                        class="el-icon-info"
                                        @click="setSelectedMember(member.user)"
                                    />
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
                                </div>
                            </v-card-text>
                            <v-divider/>
                            <v-card-actions>
                                <v-spacer/>
                                <button @click="memberDialog = false"> Back </button>
                                <v-spacer/>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import User from "../models/User";
import ClubService from '../services/clubService';
import alerter from '../utils/alerter';
import formatter from "../utils/formatter";
import validator from '../utils/validator';

export default {
    data () {
        return {
            user: new User(),
            selectedUser: new User(),
            joinRequestUsers: [],
            clubMembers: [],

            updatedDescription: "",
            
            dialog: false,
            joinRequestDialog: false,
            memberDialog: false,
            memberInfoDialog: false,
            decisionDialog: false,
        }
    },
    props: {
        clubId: { type: Number },
        clubName: { type: String },
    },
    computed: {
        getCurrentUser() {
            return this.$store.state.auth.status.loggedIn &&
                   this.$store.state.auth.user.user;
        }
    },
    methods: {
        getFormattedName: (firstName, lastName) => formatter.getFormattedName(firstName, lastName),
        setSelectedUserRequest(user) {
            this.selectedUser = user;
            this.decisionDialog = true
        },
        setSelectedMember(user) {
            this.selectedUser = user;
            this.memberInfoDialog = true;
        },
        openDialog() {
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
        },
        async handleEdit() {
            let err = validator.updateActivityClubChecker(this.updatedDescription);
            if (err.length != 0) {
                this.$fire(alerter.errorAlert(
                    "Update Description Failed", err
                ));
                return;
            }
            let response =
                await clubService
                    .updateClub(
                        this.user.id,
                        this.clubId,
                        this.updatedDescription
                    )
                    .then(response => response.status == 200
                        ?   this.$fire(alerter.successAlert(
                                "Update Description Success",
                                response.data.message
                            ))
                        :   this.$fire(alerter.errorAlert(
                                "Update Description Failed",
                                response.data.message
                            )));
            this.closeDialog();
        },
        async handleRequest() {
            let response =
                await ClubService
                    .getPendingClubRequest(
                        this.user.id,
                        this.clubId
                    )
                    .then(response => this.joinRequestUsers = response.data);
            this.joinRequestDialog = true;
        },
        async handleAcceptRequest(requestUserId) {
            let response = 
                await ClubService
                    .acceptClubRequest(
                        this.user.id,
                        requestUserId,
                        this.clubId
                    )
                    .then(response => response.status == 200
                        ?   this.$fire(alerter.successAlert(
                                "Accept Request Success",
                                response.data.message
                            ))
                        :   this.$fire(alerter.errorAlert(
                                "Accept Request Failed",
                                response.data.message
                            )));
            this.decisionDialog = false;
        },
        async handleRejectRequest(requestUserId) {
            let response = 
                await ClubService
                    .rejectClubRequest(
                        this.user.id,
                        requestUserId,
                        this.clubId
                    )
                    .then(response => response.status == 200
                        ?   this.$fire(alerter.successAlert(
                                "Reject Request Success",
                                response.data.message
                            ))
                        :   this.$fire(alerter.errorAlert(
                                "Reject Request Failed",
                                response.data.message
                            )));
            
            this.decisionDialog = false
        },
        async handleMembers() {
            let response =
                await ClubService
                    .getClubMembers(this.clubId)
                    .then(response => this.clubMembers = response.data);

            this.memberDialog = true
        }
    },
    mounted() {
        this.user = this.getCurrentUser;
        if (!this.user) {
            this.$router.push("/");
            return;
        }
    }
}
</script>

<style scoped lang="scss">
.headline {
    textarea {
        resize: none;
    }
}
#info-btn {
    position: relative;
}
.text-center {
    z-index: 9999;
}
#redbtn {
    border: 2px solid rgb(255, 75, 75);
    color: rgb(255, 75, 75);
}
#redbtn:hover {
    background-color: rgb(255, 75, 75);
    color: white;
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
.v-card-text-content {
    height: 200px;
    overflow: auto;
    div {
        padding: 10px;
        display: flex;
        span {
            flex: 2;
        }
        i {
            font-size: 17px;
            flex: 1;
        } 
    }
}
</style>
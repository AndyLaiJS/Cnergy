<template>
    <!-- For Activity Owner manage -->
    <div class="text-center">
        <button @click="openDialog()">Edit</button>
        <v-dialog
            v-model="dialog"
            width="500"
        >
            <v-card>
                <v-card-title
                    class="headline"
                    primary-title
                    > 
                    <textarea 
                        rows="0" 
                        placeholder="Title, editable" 
                    />
                </v-card-title>
                
                <textarea 
                    rows="6"
                    v-model="updatedDescription"
                    placeholder="Enter your updated description here"
                >
                </textarea>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <button @click="dialog = false" id="redbtn"> <i class="el-icon-delete"></i> </button>
                    <v-spacer></v-spacer>
                    <button @click="dialog = false" id="greenbtn"> <i class="el-icon-edit"></i> </button>
                    <v-spacer></v-spacer>
                    <button @click="dialogP = true"> <i class="el-icon-info"></i> </button>
                    <!-- See who joined the activity -->
                    <v-dialog
                        v-model="dialogP"
                        width="500"
                    >
                        <v-card>
                            <v-card-title
                                class="headline"
                                primary-title
                            > 
                                Who has joined?
                            </v-card-title>

                            <v-card-text v-for="(participant, index) in participants" :key="index">
                                {{ participant }}
                            </v-card-text>

                            <v-divider/>
                            <v-card-actions>
                                <v-spacer/>
                                <button @click="dialogP = false"> Back </button>
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
import ActivityService from "../services/activityService";
import User from "../models/User";
import alerter from '../utils/alerter';
import validator from '../utils/validator';

export default {
    data () {
        return {
            user: new User(),
            updatedDescription: "",
            dialog: false,
            dialog: false,
            dialogP: false,
            participants: ["Andrew Fanggara", "Lai Jian Shin", "Wei Xuan Phor", "Nicholas Tanryo", "Aaron", "afijaofkaf", " asfijasifjaifjiasjfisa "],
        }
    },
    props: {
        activityId: { type: Number },
        activityName: { type: String },
    },
    computed: {
        getCurrentUser() {
            return this.$store.state.auth.status.loggedIn &&
                   this.$store.state.auth.user.user; 
        }
    },
    methods: {
        openDialog() {
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
        },
        async handleEdit() {
            let err = validator.updateActivityChecker(this.updatedDescription);
            if (err.length != 0) {
                this.$fire(alerter.errorAlert(
                    "Update Description Failed", err
                ));
                return;
            }
            let response =
                await ActivityService
                    .updateActivity(
                        this.user.id,
                        this.activityId,
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
</style>
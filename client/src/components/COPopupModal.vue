<template>
    <!-- For Club Owner manage -->
    <div class="text-center">
        <button @click="opendialog()">Edit</button>
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
                    <textarea 
                        rows="0" 
                        placeholder="Title, editable" 
                    />
                </v-card-title>
                
                <textarea 
                    rows="6" 
                    placeholder="Whatever the previous description was" 
                />

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <button @click="dialog = false" id="redbtn"> <i class="el-icon-delete"></i> </button>
                    <v-spacer></v-spacer>
                    <button @click="dialog = false" id="greenbtn"> <i class="el-icon-edit"></i> </button>
                    <v-spacer></v-spacer>
                    <button @click="dialogP = true"> <i class="el-icon-info"></i> </button>
                    <!-- See who joined the club -->
                    <v-dialog
                        v-model="dialogP"
                        width="500"
                    >
                        <v-card>
                            <v-card-title
                                class="headline"
                                primary-title
                            > 
                                Join requests
                            </v-card-title>

                            <v-card-text 
                                class="v-card-text-content"
                                
                            >   
                                <div v-for="(participant, index) in participants" :key="index"> 
                                    <span> {{ participant }} </span>
                                    <i class="el-icon-info" @click="dialogDecision = true"></i>
                                </div>
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
        <v-dialog
            v-model="dialogDecision"
            width="500"
        >
            <v-card>
                <v-card-title
                    class="headline"
                    primary-title
                > 
                    The participant's name (no idea how to do that here :( )
                </v-card-title>
                <v-card-text>
                    His/Her reason to joining
                </v-card-text>
                <v-divider/>
                <v-card-actions>
                    <v-spacer/>
                    <button @click="dialogDecision = false" id="greenbtn"> Accept </button>
                    <v-spacer/>
                    <button @click="dialogDecision = false" id="redbtn"> Reject </button>
                    <v-spacer/>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data () {
      return {
        dialog: false,
        dialogP: false,
        dialogDecision: false,
        participants: ["Andrew Fanggara", "Lai Jian Shin", "Wei Xuan Phor", "Nicholas Tanryo", "Aaron", "afijaofkaf", " asfijasifjaifjiasjfisa "],
      }
    },
    methods: {
        opendialog() {
            this.dialog = true;
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
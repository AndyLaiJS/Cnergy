<template>
    <!-- For Club Owner manage -->
    <div class="text-center">
        <button @click="opendialog()">Edit</button>
        <v-dialog
            v-model="dialog"
            width="500"
        >

            <v-card>
                <v-card-title
                    class="headline"
                    primary-title
                > Title
                </v-card-title>
                
                <textarea 
                            rows="6" 
                            placeholder="Whatever the previous description was" 
                />

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <button @click="dialog = false" id="redbtn"> Delete </button>
                    <v-spacer></v-spacer>
                    <button @click="dialog = false" id="greenbtn"> Edit </button>
                    <v-spacer></v-spacer>
                    <button @click="dialog = false"> Ok </button>
                    <v-spacer></v-spacer>
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
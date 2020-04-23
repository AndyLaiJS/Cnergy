<template>
    <div class="bg">
        <NavBar/>
        <div class="create-box">
            <div class="doodle">
                CREATE. <br>
                <b>SHARE YOUR PASSION.</b> <br>
                OFFICIALLY.
            </div>
            <div class="create-content">
                <form class="create-form">
                    <div class="wording-title">
                        <h1> Create a new club! </h1>
                        <p> It's quick and easy to share your passion </p>
                    </div>
                    <div class="form-group">
                        <input 
                            class="form-control"
                            type="text"
                            v-model="club.name"
                            placeholder="Name of Club"
                            />
                    </div>
                    <div class="form-group">
                        <textarea 
                            rows="6" 
                            placeholder="Club Description" 
                            v-model="club.description">
                        </textarea>
                    </div>
                    <router-link to="/create-club">
                        <button
                            class="create-button"
                            @click="createClub"    
                        >Create</button>
                    </router-link>
                </form>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
import NavBar from "../NavBar";
import Footer from "../Footer";
import Club from "../../models/Club";
import User from "../../models/User";
import validator from '../../utils/validator';
import alerter from '../../utils/alerter';

export default {
    components: {
        NavBar,
        Footer
    },
    data () {
        return {
            club: new Club(),
            user: new User(),
        }
    },
    computed: {
        getCurrentUser() {
            return this.$store.state.auth.status.loggedIn &&
                   this.$store.state.auth.user.user; 
        }
    },
    methods: {
        createClub() {
            let err = validator.createClubChecker(this.club);
            if (err.length != 0) {
                this.$fire(alerter.errorAlert(
                    "Create Club Failed", err
                ));
                return;
            }

            this.$store
                .dispatch(
                    "club/createClub",
                    [ this.user, this.club ],
                )
                .then(
                    response => response.status == 200
                        ?   this.$fire(alerter.successAlert(
                                "Create Club Success"
                            ))
                        :   this.$fire(alerter.errorAlert(
                                "Create Club Failed"
                            )),
                )
        }
    },
    mounted () {
        this.user = this.getCurrentUser;
        if (!this.user) {
            this.$router.push("/");
            return;
        }
        // const inpLogo = document.getElementById("logo");
        // const displayContainer = document.getElementById("display-logo");
        // const displayImage = displayContainer.querySelector(".display-logo-img");
        // const displayDefaultText = displayContainer.querySelector(".display-logo-default");
        // const resetLogoButton = document.getElementById("reset");

        // inpLogo.addEventListener("change", function () {
        //     const file = this.files[0];
            
        //     if (file) {
        //         const reader = new FileReader();

        //         displayDefaultText.style.display = "none";
        //         displayImage.style.display = "block";

        //         reader.addEventListener("load", function() {
        //             displayImage.setAttribute("src", this.result);
        //             displayContainer.style.border = "none";
        //         });

        //         reader.readAsDataURL(file);
        //     } 
        // // else {
        // //     displayDefaultText.style.display = null;
        // //     displayImage.style.display = null;
        // //     displayContainer.style = null;
        // //     displayImage.setAttribute("src", "");
        // // }
        // });

        // resetLogoButton.addEventListener("click", function () {
        //     displayDefaultText.style.display = null;
        //     displayImage.style.display = null;
        //     displayContainer.style = null;
        //     displayImage.setAttribute("src", "");
        // });
    }
}
</script>

<style scoped>
.bg {
    background-color: rgb(247, 247, 247);
    background-image: url("../../assets/confirmation_page_design.png");
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;

}
.logo-container > input {
    margin-top: 20px;
}
.logo-container {
    display: flex;
    flex-wrap: wrap;
}
.upload-reset {
    margin-top: 15px;
    margin-right: 40px;
    display: flex;
    flex-direction: column;
    align-content: space-between;
}
.upload-reset label {
    width: 100px;
    text-align: center;
    margin: 20px;
}
.display-logo {
    border: 3px dashed gray;
    height: 100px;
    width: 100px;
    overflow: hidden;
    /* default text */
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #888;
}
.display-logo-img {
    display: none;
    height: 100px;
    background-position: center;
    background-size: cover;
}
.form-group {
    margin-top: 15px;
}
</style>



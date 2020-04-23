<template>
    <div class="bg">
        <NavBar/>
        <div class="create-box">
            <div class="doodle">
                CREATE. <br>
                <b>SHARE YOUR PASSION.</b> <br>
                PLAY.
            </div>
            <div class="create-content">
                <form class="create-form">
                    <div class="wording-title">
                        <h1> Create a new activity! </h1>
                        <p> It's quick and easy to share your passion </p>
                    </div>
                    <div class="form-group">
                        <input
                            class="form-control"
                            v-model="activity.name"
                            type="text"
                            placeholder="Name of Activity"
                        />
                    </div>
                    <div class="form-group">
                        <textarea 
                            v-model="activity.description"
                            rows="6" 
                            placeholder="Event Description" 
                        />
                    </div>
                    <div class="form-group">
                        <select
                            v-model="activity.type"
                        >
                            <option value="" disabled selected hidden> Private/Public Activity </option>
                            <option v-for="option in options" :key="option">
                                {{ option }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <input
                            class="form-control"
                            v-model="activity.activityDate"
                            type="date"
                            max="9999-12-31"
                        />
                    </div>
                    <div class="compress-form">
                        <input 
                            id="first-box"
                            class="form-control"
                            v-model="activity.minParticipants"
                            type="text"
                            placeholder="Minimum participants"
                        />
                        <input
                            id="second-box"
                            class="form-control"
                            v-model="activity.maxParticipants"
                            type="text"
                            placeholder="Maximum participants"
                        />
                    </div>
                    <router-link to="/create-activities">
                        <button 
                            class="create-button" 
                            @click="createActivity"
                        > Create
                        </button>
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
import Activity from "../../models/Activity";
import User from "../../models/User";
import alerter from "../../utils/alerter";
import validator from "../../utils/validator";

export default {
    components: {
        NavBar,
        Footer
    },
    data () {
        return {
            activity: new Activity(),
            user: new User(),
            options: ["Private", "Public"],
        }
    },
    computed: {
        getCurrentUser() {
            return this.$store.state.auth.status.loggedIn &&
                   this.$store.state.auth.user.user; 
        }
    },
    methods: {
        createActivity() {
            let err = validator.createActivityChecker(this.activity);
            if (err.length != 0) {
                this.$fire(alerter.errorAlert(
                    "Create Activity Failed", err,
                ));
                return;
            }

            this.$store
                .dispatch(
                    "activity/createActivity", 
                    [ this.user, this.activity ],
                )
                .then(
                    response => response.status == 200
                        ?   this.$fire(alerter.successAlert(
                                "Create Activity Success"
                            ))
                        :   this.$fire(alerter.errorAlert(
                                "Create Activity Failed"
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
    }
}
</script>

<style lang="scss">
.doodle {
  flex: 1;
  padding: 13% 0;
  margin-left: 100px;
  font-size: 50px;
  text-align: left; 
}
.create-box {
  display: flex;
  margin: 70px 200px;
  background-color: rgb(247, 247, 247);
  border-radius: 10px;
  margin-bottom: 90px;
}
.wording-title {
  margin-bottom: 30px;
}
.create-content {
  flex: 2;
}
.create-form {
  padding: 45px;
  padding-right: 80px;
  text-align: left;
}
.compress-form {
  width: 100%;
  display: flex;
}
#first-box {
  flex: 1;
}
#second-box {
  flex: 1;
  margin-right: 0;
}
input, textarea, select {
  background-color: white !important;
  padding: 10px;
  margin: 20px;
  margin-left: 0;
  margin-top: 0;
  width: 100%;
  border-radius: 10px !important;
  outline: none;
}
textarea {
    margin-bottom: 10px !important;
}
.compress-form {
  input {
    width: 200px;
  }
}
.create-button{
  margin-top: 20px;
  padding: 5px 30px;
	border-radius: 50px;
	outline: none;
  border: 2px solid #4285F4;
  box-shadow:  0px 3px silver;
	color: #4285F4;
	cursor: pointer;
	transition: .1s;
}
.create-button:hover {
  background-color: #4285F4;
  color: #fff;
}
.create-button:active {
  box-shadow: 0 1px silver;
  transform: translateY(3px);
}
@media screen and (max-width: 1400px) {
  .doodle {
    font-size: 40px;
  }
}
</style>
<style scoped>
.bg {
    background-color: rgb(247, 247, 247);
    background-image: url("../../assets/activity_club_page_background.png");
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
}
</style>
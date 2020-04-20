<template>
    <div>
        <Navi/>
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
                            type="text"
                            name="event-name"
                            placeholder="Name of Activity"
                            />
                    </div>
                    <div class="form-group">
                        <textarea 
                            required name="eventDescription" 
                            rows="6" placeholder="Event Description" 
                            v-model="eventDescription">
                        </textarea>
                    </div>
                    <div class="compress-form">
                    <input 
                        id="first-box"
                        class="form-control"
                        type="text"
                        name="creator-name"
                        placeholder="Your name"
                        />
                    <input 
                        id="second-box"
                        class="form-control"
                        type="text"
                        name="sid"
                        placeholder="Your SID"
                        />
                    </div>
                    <div class="form-group">
                    <input 
                        class="form-control"
                        type="date"
                        name="date"
                        placeholder="YYYY-MM-DD"
                        />
                    </div>
                    <div class="compress-form">
                    <input 
                        id="first-box"
                        class="form-control"
                        type="text"
                        name="min"
                        placeholder="Minimum participants"
                        />
                    <input 
                        id="second-box"
                        class="form-control"
                        type="text"
                        name="max"
                        placeholder="Maximum participants"
                        />
                    </div>

                    <router-link to="/create-activities"><button class="create-button">Create</button></router-link>

                </form>

            </div>
        </div>
         
        <Footer/>
    </div>
</template>

<script>
import Navi from "../NavBar";
import Footer from "../Footer";
export default {
    components: {
    Navi,
    Footer
  },
  data () {
    return {
        eventName: "",
        eventDate: "",
        eventDescription: "",
        creatorName: "",
        creatorSID: "",
        minParticipant: "",
        maxParticipant: ""
    }
  },
  mounted () {
    const inpLogo = document.getElementById("logo");
    const displayContainer = document.getElementById("display-logo");
    const displayImage = displayContainer.querySelector(".display-logo-img");
    const displayDefaultText = displayContainer.querySelector(".display-logo-default");

    inpLogo.addEventListener("change", function () {
        const file = this.files[0];
        
        if (file) {
            const reader = new FileReader();

            displayDefaultText.style.display = "none";
            displayImage.style.display = "block";

            reader.addEventListener("load", function() {
                displayImage.setAttribute("src", this.result);
                displayContainer.style.border = "none";
            });

            reader.readAsDataURL(file);
        } else {
            displayDefaultText.style.display = null;
            displayImage.style.display = null;
            displayContainer.style = null;
            displayImage.setAttribute("src", "");
        }
    });
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
input, textarea {
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
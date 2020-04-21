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
                    <div class="input-logo">
                        <div class="logo-container">
                            <div class="preview">
                                <div id="display-logo" class="display-logo">
                                    <img src="" alt="LOGO" class="display-logo-img">
                                    <span class="display-logo-default">LOGO</span>
                                </div>
                            </div>
                            <div class="upload-reset">
                                <div class="upload">
                                    <label for="logo" class="create-button">⬆︎ Upload Club Logo</label>
                                </div>
                                <br>
                                <div class="reset">
                                    <label id="reset" for="reset" class="reset create-button">Reset Club Logo</label>
                                </div>
                            </div>
                            <input id="logo" type="file" name="clubLogo"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <input 
                            class="form-control"
                            type="text"
                            name="club-name"
                            placeholder="Name of Club"
                            />
                    </div>
                    <div class="form-group">
                        <textarea 
                            required name="club" 
                            rows="6" placeholder="Club Description" 
                            v-model="eventDescription">
                        </textarea>
                    </div>
                    <!-- <div class="compress-form">
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
                    </div> -->
                    <router-link to="/create-activities"><button class="create-button">Create</button></router-link>
                </form>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
import NavBar from "../NavBar";
import Footer from "../Footer";
export default {
  components: {
    NavBar,
    Footer
  },
  data () {
    return {
        clubName: "",
        clubLogo: "",
        clubDescription: "",
        creatorName: "",
        creatorSID: ""
    }
  },
  mounted () {
    const inpLogo = document.getElementById("logo");
    const displayContainer = document.getElementById("display-logo");
    const displayImage = displayContainer.querySelector(".display-logo-img");
    const displayDefaultText = displayContainer.querySelector(".display-logo-default");
    const resetLogoButton = document.getElementById("reset");

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
        } 
    // else {
    //     displayDefaultText.style.display = null;
    //     displayImage.style.display = null;
    //     displayContainer.style = null;
    //     displayImage.setAttribute("src", "");
    // }
    });

    resetLogoButton.addEventListener("click", function () {
        displayDefaultText.style.display = null;
        displayImage.style.display = null;
        displayContainer.style = null;
        displayImage.setAttribute("src", "");
    });
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
</style>



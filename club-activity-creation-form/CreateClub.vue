<template>
<div>
    <Navi/>
    <div class="form">
        <h1>CLUB CREATION FORM</h1>
        <form class="" action="/create-activity" method="POST">
            <div class="inputs">
                <div class="first-row">
                    <div class="club-name">
                        <label>Club Name</label><br>
                        <input type="text" required name="clubName" placeholder="Club Name" autocomplete="off" v-model="clubName"><br>
                    </div>

                    <div class="input-logo">
                        <label style="color: white">margin</label><br>
                        <div class="logo-container">
                            <div class="upload-reset">
                                <div class="upload">
                                    <label for="logo" class="logo">⬆︎ Upload Club Logo</label>
                                    <input id="logo" type="file" name="clubLogo" />
                                </div>
                                <div class="reset">
                                    <label id="reset" for="reset" class="reset logo">Reset Club Logo</label>
                                </div>
                            </div>
                            <div class="preview">
                                <div id="display-logo" class="display-logo">
                                    <img src="" alt="LOGO" class="display-logo-img">
                                    <span class="display-logo-default">LOGO</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

                
                <div class="second-row">
                    <div class="club-description">
                        <label>Club Description</label><br>
                        <textarea required name="clubDescription" rows="6" cols="80" placeholder="Club Description" v-model="clubDescription"></textarea><br>
                    </div>
                </div>

                <div class="cabinet">
                    <div class="member-info">
                        <div class="name">
                            <label>Creator Name</label><br>
                            <input type="text" required name="creatorName" placeholder="Creator Name" autocomplete="off" v-model="creatorName"><br>
                        </div>
                
                        <div class="sid">
                            <label>Creator SID</label><br>
                            <input type="text" required name="creatorSID" placeholder="Creator SID" autocomplete="off" v-model="creatorSID"><br>
                        </div>
                    </div>
                </div>
            </div>

            <button type="submit" name="button">Submit</button>
        </form>
        </div>
        <thefooter/>
</div>
</template>

<script>
/* eslint-disable */
import Navi from "./Navi";
import thefooter from "./Footer";
export default {
    name: 'createclub',
  components: {
    Navi,
    thefooter
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
body {
    font-size: 1rem;
    font-family: 'Noto Sans JP', sans-serif;
    margin: 0;
    padding: 0;
}

nav {
    background-color: black;
    color: white;
    text-align: center;
    padding: 25px;
}

h1 {
    text-align: center;
    margin: 30px auto;
    font-weight: lighter;
}

form {
    position: relative;
}

.form {
    margin: 1% 10%;
}

input, textarea {
    margin: 5px auto 60px auto;
    padding: 10px;
    outline: none;
    font-size: 1.1rem;
    width: 80%;
}

input[type="file"] {
    display: none;
}

.logo-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

.upload-reset {
    margin-right: 40px;
    display: flex;
    flex-direction: column;
    align-content: space-between;
}
.upload-reset label {
    width: 90%;
    text-align: center;
    margin-bottom: 10px;
}

.logo {
    border: 1px solid #888;
    display: inline-block;
    padding: 10px 10px;
    cursor: pointer;
    border-radius: 5px;
    margin: 0;
    transition: 0.2s ease-in-out;
}
.logo:hover {
    color: white;
    background-color: black;
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

.first-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.club-name {
    width: 50%;
}

.input-logo {
    width: 50%;
}

.club-description textarea {
    width: 100%;
}

.cabinet {
    display: flex;
    flex-direction: column;
}

.cabinet input {
    margin-bottom: 30px;
}

.member-info {
    display: flex;
    flex-direction: row;
}

.member-info div {
    width: 300px;
}

.name, .sid {
    margin: auto 100px auto 0;
}


button {
    padding: 10px 40px;
    margin: 20px auto 5px auto;
    background-color: #fefefe;

    outline: 2px solid rgb(9, 126, 221);

	height: 40px;
	font-size: 1rem;
    cursor: pointer;
    transition: background-color .2s ease-in-out;
}

button:hover {
    background-color: rgb(9, 126, 221);
    color: white;
}

footer {
    margin-top: 60px;
    padding: 25px;
    background-color: black;
    color: white;
    text-align: center;
}

@media screen and (max-width: 790px) {
    .first-row {
        flex-direction: column;
    }

    .name, .sid {
        margin: auto 10px auto 0;
    }

    .club-name {
        width: 100%;
    }

    .club-name input {
        margin-bottom: 30px;
    }

    .input-logo {
        width: 100%;
    }
}
</style>



<template>
    <div>
        <Navi/>
        <div class="form">
            <h1>EVENT CREATION FORM</h1>
                <form class="" action="/create-activity" method="POST">
                    <div class="inputs">
                    <div class="event-name">
                        <label>Event Name</label><br>
                        <input type="text" required name="eventName" placeholder="Event Name" autocomplete="off" v-model="eventName"><br>
                    </div>
                
                    <div class="event-description">
                        <label>Event Description</label><br>
                        <textarea required name="eventDescription" rows="6" placeholder="Event Description" v-model="eventDescription"></textarea><br>
                    </div>
                
                    <div class="date">
                        <label>Event Date</label><br>
                        <input type="date" required name="eventDate" placeholder="YYYY-MM-DD" v-model="eventDate"><br>
                    </div>
                
                    <div class="creator-name">
                        <label>Creator Name</label><br>
                        <input type="text" required name="creatorName" placeholder="Creator Name" autocomplete="off" v-model="creatorName"><br>
                    </div>
                
                    <div class="creator-sid">
                        <label>SID</label><br>
                        <input type="text" required name="creatorSID" placeholder="SID" autocomplete="off" v-model="creatorSID"><br>
                    </div>

                    <div class="min-participants">
                        <label>Min. Participants</label><br>
                        <input type="text" required name="minParticipants" placeholder="Min Participants" autocomplete="off" v-model="minParticipants"><br>
                    </div>

                    <div class="max-participants">
                        <label>Max. Participants</label><br>
                        <input type="text" required name="maxParticipants" placeholder="Max Participants" autocomplete="off" v-model="maxParticipants"><br>
                    </div>
                </div>

                <button type="submit" name="button">Submit</button>
            </form>
        </div>
        <thefooter/>
    </div>
</template>

<script>
import Navi from "./Navi";
import thefooter from "./Footer";
export default {
    name: "createactivity",
    components: {
    Navi,
    thefooter
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

<style>
* {
    margin: 0;
    padding: 0;
}

body {
    /* background-image: url("bubble.png"); */
    background-repeat: no-repeat;
    background-size: cover;
    font-size: 1rem;
    font-family: 'Noto Sans JP', sans-serif;
    --pad-size: 10px;
}

nav {
    background-color: black;
    color: white;
    text-align: center;
    padding: 25px;
}

form {
    position: relative;
}

.form {
    margin: 1% 10%;
}

h1 {
    text-align: center;
    margin: 30px auto;
    font-weight: lighter;
}

label {
    margin: 30px auto 5px auto;
}

input, textarea {
    margin: 5px auto 60px auto;
    padding: 10px;
    outline: none;
    font-size: 1.1rem;
    width: 100%;
}

input[type="file"] {
    display: none;
}

.logo {
    border: 1px solid #888;
    display: inline-block;
    padding: 10px 10px;
    cursor: pointer;
    border-radius: 5px;

    transition: 0.2s ease-in-out;
}

.logo:hover {
    color: white;
    background-color: black;
}

.display-logo {
    border: 3px dashed gray;
    position: absolute;
    top: 30px;
    right: -20px;
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
    width: 100px;
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

@media screen and (min-width: 720px) {
    .event-name {
        grid-area: event-name;
    }

    .input-logo {
        grid-area: input-logo;
    }

    .event-description {
        grid-area: description;
    }

    .date {
        grid-area: date;
    }

    .creator-name {
        grid-area: creator-name;
    }

    .creator-sid {
        grid-area: creator-sid;
    }

    .min-participants {
        grid-area: min-p;
    }

    .max-participants {
        grid-area: max-p;
    }

    .inputs {
        display: grid;
        grid-template-areas: 
            "event-name event-name event-name event-name date date"
            "description description description description description description"
            "creator-name creator-name creator-sid creator-sid min-p max-p";
        grid-column-gap: 60px;
    }
}
</style>
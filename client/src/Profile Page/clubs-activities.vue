<template>
    <div class="wrapper">
        <header>
            <div id="nav">
                <router-link to="/home">
                    <div class="navLogo">
                        <img src="../assets/CUHK.png">
                        <b>CUHK</b> MeePo
                    </div>
                </router-link>
                <a href="#" class="profile-link">Profile</a>
            </div>
        </header>
        <main class="main">
            <div class="options">
                <ul class="options-links">
                    <li class="active"><router-link to="/profile" class="options-link">Profile Settings</router-link></li>
                    <li><router-link to="/clubsactivities" class=" active options-link">Clubs & Activities</router-link></li>
                    <li><router-link to="/security" class="options-link">Security</router-link></li>
                    <li><router-link to="/hfaq" class="options-link">Help & FAQ</router-link></li>
                </ul>
            </div>
            <div class="club-activity settings-display">
                <div class="main-area">
                    <h5 class="title">List of Clubs</h5>
                    <div class="search-bar">
                        <form>
                            <input type="text" placeholder="Search for clubs..." class="club-search-input">
                            <button class="club-search-btn" type="submit">
                                <i class="fa fa-search"></i>
                            </button>
                        </form>
                        
                    </div>
                    <div class="clubs-container">
                        <ul class="clubs-list">

                        </ul>
                    </div>
                </div>
                <div class="main-area">
                    <h5 class="title">List of Activities</h5>
                    <div class="search-bar">
                        <form>
                            <input type="text" placeholder="Search for activities..." class="activity-search-input">
                            <button class="activity-search-btn" type="submit">
                                <i class="fa fa-search"></i>
                            </button>
                        </form>
                        
                    </div>
                    <div class="activities-container">
                        <ul class="activities-list">

                        </ul>
                    </div>
                </div>
            </div>
        </main>
        <div class="push"></div>
    </div>
</template>

<script>
    export default {
        mounted() {
            //Selectors a for activity, c for club
            const cSearchButton = document.querySelector(".club-search-btn");
            const clubsList = document.querySelector(".clubs-list");
            const cSearchInput = document.querySelector(".club-search-input");

            const aSearchButton = document.querySelector(".activity-search-btn");
            const activitiesList = document.querySelector(".activities-list");
            const aSearchInput = document.querySelector(".activity-search-input");

            //Event Listeners
            cSearchButton.addEventListener('click', addClubList);
            clubsList.addEventListener('click', deleteCheck);

            aSearchButton.addEventListener('click', addActivityList);
            activitiesList.addEventListener('click', deleteCheck);

            //Functions
            function addClubList(event){
                // Prevent for submitting
                event.preventDefault();
                if(cSearchInput.value != ""){
                    // Clubs DIV
                    const clubsDiv = document.createElement('div');
                    clubsDiv.classList.add("club");
                    // Create LI
                    const newClub = document.createElement('li');
                    newClub.innerText = cSearchInput.value;
                    newClub.classList.add('club-item');
                    clubsDiv.appendChild(newClub);
                    // Mark Button
                    const markButton = document.createElement('button');
                    markButton.innerHTML = '<i class="fa fa-star"></i>';
                    markButton.classList.add("mark-btn");
                    clubsDiv.appendChild(markButton);
                    // Delete Button
                    const deleteButton = document.createElement('button');
                    deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
                    deleteButton.classList.add("delete-btn");
                    clubsDiv.appendChild(deleteButton);
                    // Append To List
                    clubsList.appendChild(clubsDiv);
                    // Clear Search Value
                    cSearchInput.value="";
                }
                
            }
            function addActivityList(event){
                // Prevent for submitting
                event.preventDefault();
                if(aSearchInput.value != ""){
                    // Activity DIV
                    const activityDiv = document.createElement('div');
                    activityDiv.classList.add("club");
                    // Create LI
                    const newActivity = document.createElement('li');
                    newActivity.innerText = aSearchInput.value;
                    newActivity.classList.add('activity-item');
                    activityDiv.appendChild(newActivity);
                    // Mark Button
                    const markButton = document.createElement('button');
                    markButton.innerHTML = '<i class="fa fa-star"></i>';
                    markButton.classList.add("mark-btn");
                    activityDiv.appendChild(markButton);
                    // Delete Button
                    const deleteButton = document.createElement('button');
                    deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
                    deleteButton.classList.add("delete-btn");
                    activityDiv.appendChild(deleteButton);
                    // Append To List
                    activitiesList.appendChild(activityDiv);
                    // Clear Search Value
                    aSearchInput.value="";
                }
                
            }

            function deleteCheck(e){
                const item = e.target;
                //Delete Club - Activity
                if(item.classList[0] === "delete-btn"){
                    if(confirm("Are you sure you want to exit the club/activity? You have to rejoin if you want to participate")){
                        const club = item.parentElement;
                        // Animation
                        club.classList.add("fall-animation");
                        club.addEventListener('transitionend', function(){
                            club.remove();
                        });
                        
                    }
                }

                // Favorite Button
                if(item.classList[0] === "mark-btn"){
                    const club = item.parentElement;
                    club.classList.toggle("favorite");
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import './css/style.css';
    @import './css/content-style.css';
    @import './css/clubs-activities.css';
</style>
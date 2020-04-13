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
                    <li><router-link to="/clubsactivities" class="options-link">Clubs & Activities</router-link></li>
                    <li><router-link to="/security" class="active options-link">Security</router-link></li>
                    <li><router-link to="/hfaq" class="options-link">Help & FAQ</router-link></li>
                </ul>
            </div>
            <div class="settings-display">
                <div class="content">
                    <ul class="content-list">
                        <li class="content-lists">
                            <label for="old-pw">Old Password</label>
                            <input type="text" class="old-pw" name="old-pw">
                        </li>
                        <li class="content-lists">
                            <label for="new-pw">New Password</label>
                            <input type="text" class="new-pw" name="new-pw">
                        </li>
                        <li class="content-lists">
                            <label for="renew-pw">Reenter New Password</label>
                            <input type="text" class="renew-pw" name="renew-pw">
                        </li>
                        <li class="content-lists"><button class="btn2" id="pw-btn">Change Password</button></li>
                    </ul>
                </div>
            </div>
        </main>
        <div class="push"></div>
    </div>
</template>

<style scoped lang="scss">
    @import './css/style.css';
    @import './css/content-style.css';
input {
    background-color: white;
}
.content-list {
    margin-top: 16%;
}
</style>
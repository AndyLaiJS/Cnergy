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
                    <li><router-link to="/security" class="options-link">Security</router-link></li>
                    <li><router-link to="/hfaq" class="active options-link">Help & FAQ</router-link></li>
                </ul>
            </div>
            <div class="settings-display">

            </div>
        </main>
        <div class="push"></div>
    </div>
</template>

<style scoped lang="scss">
@import './css/style.css';
</style>
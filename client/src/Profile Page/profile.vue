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
                    <li class="active"><router-link to="/profile" class="active options-link">Profile Settings</router-link></li>
                    <li><router-link to="/clubsactivities" class="options-link">Clubs & Activities</router-link></li>
                    <li><router-link to="/security" class="options-link">Security</router-link></li>
                    <li><router-link to="/hfaq" class="options-link">Help & FAQ</router-link></li>
                </ul>
            </div>
            <div class="settings-display">
                <div class="content">
                    <ul class="content-list">
                        <!-- First Name -->
                        <li class="content-lists">
                            <label for="fname">First Name</label>
                            <input type="text" name="fname" class="input-box" placeholder="Andrew">
                            <button type="button" class="btn">Edit</button>
                        </li>
                        <!-- Last Name -->
                        <li class="content-lists">
                            <label for="fname">Last Name</label>
                            <input type="text" name="fname" class="input-box" placeholder="Homo">
                            <button type="button" class="btn">Edit</button>
                        </li>
                        <!-- SID -->
                        <li class="content-lists">
                            <label for="fname">SID</label>
                            <input type="text" name="fname" class="input-box" placeholder="1155111122">
                            <button type="button" class="btn">Edit</button>
                        </li>
                        <!-- Email -->
                        <li class="content-lists">
                            <label for="fname">Email</label>
                            <input type="text" name="fname" class="input-box" placeholder="andrew@link.cuhk.edu.hk">
                            <button type="button" class="btn">Edit</button>
                        </li>
                    </ul>
                </div>
                <div class="image-content">
                    <div class="image-container">
                        <img src="./images/avatar.webp" alt="avatar" class="img">
                    </div>
                    <button class="btn2">Change Picture</button>
                    <button class="btn2">Delete Picture</button>
                </div>
            </div>
        </main>
        <div class="push"></div>
    </div>
</template>

<style scoped lang="scss">
@import './css/style.css';
@import './css/content-style.css';
</style>
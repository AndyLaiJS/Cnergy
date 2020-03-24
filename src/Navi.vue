<template>
    <v-app>
        <div id="nav">
            <div class="navLogo">
                <img src="./assets/CUHK.png">
                <b>CUHK</b> MeePo
            </div>
            <div class="navLink">
                <router-link to="/">Clubs</router-link> 
                <router-link to="/">Activities</router-link> <span style="color: rgb(211, 211, 211);">|</span>
                <router-link to="/">Profile</router-link>
            </div>
        </div>
            <router-view/>
    </v-app>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>
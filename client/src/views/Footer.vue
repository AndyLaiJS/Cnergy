<template>
    <div class="footerBody">
        <span id="left">
            <h1>CUHK Cnergy</h1>
            <p>Copyright © 2020 | All rights reserved.</p>            
        </span>
        <span id="right">
            <h1>#find.ur.passion</h1>
            Email: <a target="_blank" href="mailto:sdrs@cuhk.edu.hk">sdrs@link.cuhk.edu.hk</a>
        </span>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
* {
    color: black;
}
/* temporary h2 */
h1 {
    margin: 0;
    margin-top: -3px;
}
h2 {
    margin: 0;
    margin-bottom: 5px;
}
#right {
    text-align: right;
    a {
        display: inline-block;
        text-decoration: none;
        color: black;
        font-weight: bolder;
    }
    a:hover {
        color: #4285F4 !important;
    }
}
.footerBody {
    display: flex;
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
    background-color: rgb(247, 247, 247);
    padding: 50px 200px 30px 200px;
}
.socialIcon {
    display: grid;
    grid-template-columns: 60px 30px;
    justify-content: end;
    justify-items: center;
}
#right img {
    filter: invert(100%);
}
</style>
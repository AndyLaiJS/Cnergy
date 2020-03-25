<template>
    <div class="footerBody">
        <span id="left">
            <h1>CUHK MeePo</h1>
            <p>Copyright © 2020 | All rights reserved.</p>
            
        </span>

        <span id="right">
            <h1>#find.ur.passion</h1>
                <!-- <div class="socialIcon">
                    <a target="_blank" href="https://www.facebook.com/dsc.cuhk" rel="noreferrer"><img style="height: 28px" src="../assets/f_logo.png"></a>
                    <a target="_blank" href="https://www.instagram.com/dsc.cuhk/" rel="noreferrer"><img style="height: 27px" src="../assets/ig.png"></a>
                </div> -->
                Email: <a target="_blank" href="mailto:dsc.cuhk@gmail.com">cuhkSAoffice@link.cuhk.edu.hk</a>
        </span>
        
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
* {
    color: white;
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
        color: white;
        font-weight: bolder;
    }
    a:hover {
        color: #dffb4d;
    }
}
.footerBody {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    text-align: left;
    justify-content: space-between;
    background-color: black;
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
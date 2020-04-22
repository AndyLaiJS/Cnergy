<template>
<div>
    <div class="search-container">
            <i class="el-icon-search"></i>
            <input 
                v-model="search"
                placeholder="Search"
                class="search-bar"
                type="text"
                name="search bar"
            >
            <div 
                v-if="viewType == true"
                class="view-icon" 
            >
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="Club view"
                    placement="bottom-start"
                    open-delay=450
                    hide-after=1650
                >
                    <i class="el-icon-sort" @click="viewClick()"></i>
                </el-tooltip>
            </div>
            <div
                v-else
                class="view-icon"
            >
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="Activity view"
                    placement="bottom-start"
                    open-delay=450
                    hide-after=1650
                >
                    <i class="el-icon-sort" @click="viewClick()"></i>
                </el-tooltip>
            </div>
        </div>
    <div class="main-container">
            <span
                v-if="viewType == true"
                class="cna-view"
            >
                <div
                    class="card"
                    v-for="(club, index) in clubs"
                    v-bind:key="index"
                >
                    <!--<el-button type="danger" circle icon="el-icon-minus" id="min" @click="remove(index)"></el-button>--> 
                    <div class="card-content">
                        <b>{{ club.name }}</b>
                        <!-- <div class="description">
                            {{ club.description }}
                        </div> -->
                        <PopupModal 
                            v-bind:data="club"
                            v-bind:context="`club`"
                        />
                    </div>
                </div>
            </span>
            <span
                v-else
                class="cna-view"
            >
                <div
                    class="card"
                    v-for="(activity, index) in activities"
                    v-bind:key="index"
                >
                <!--<el-button type="danger" circle icon="el-icon-minus" id="min" @click="remove(index)"></el-button>--> 
                    <div class="card-content">
                        <b>{{ activity.name }}</b>
                        <!-- <div class="description">
                            {{ activity.description }}
                        </div> -->
                        <PopupModal
                            v-bind:data="activity"
                            v-bind:context="`activity`"
                        />
                    </div>
                </div>
            </span>
            <!--<el-button type="success" circle icon="el-icon-plus" id="add" @click="addList"></el-button>-->
    </div>
</div>
</template>

<script>
import PopupModal from "../components/PopupModal";
import Activity from "../models/Activity";
import ActivityService from "../services/activityService";
import ClubService from "../services/clubService";
export default {
    data() {
        return {
            search: '',
            viewType: true,
            activities: [],
            clubs: [],
        };
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    components: {
        PopupModal,
    },
    methods: {
        viewClick() {
            this.viewType = !this.viewType;
        }
    },
    async mounted() {
        if (!this.isLoggedIn) {
            this.$router.push("/");
            return;
        }
        this.activities = 
            await ActivityService.getOngoingActivities();
        this.clubs = 
            await ClubService.getClubs();
    }
}
</script>

<style lang="scss">
.main-container {
    border-radius: 0 0 10px 10px;
    min-height: 330px;
    max-height: 530px;
    overflow: auto;
    position:relative;
    margin-bottom: 50px;
}
.search-container {
    border-radius: 10px 10px 0 0;
    display: flex;
    height: auto;
    width: 100%;    
    padding-top: 25px;
    padding-bottom: 25px;
    z-index: 999;
    background-color: white;
    padding-left: 50px;
}
.search-container i {
    position: absolute;
    margin: auto;
    padding: 13px;
}
.cna-view {
    text-align: center;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    background-color: white;
    padding-right: 10px;
    padding-left: 10px;
}
.search-bar {
    width: 90%;
    border-radius: 100px !important;
    outline:none;
    border:none; 
    margin-bottom: 0; 
    padding: 10px 15px 10px;
    padding-left: 45px;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
    transition: linear 0.1s;
    display: inline-block;
}
.view-icon i {
    font-size: 30px;
    padding: 0;
    margin-top: 10px;
    margin: 10px auto 0 auto;
    outline:none;
    border:none; 
    transition: linear 0.1s;
    transform: rotate(90deg);
}
.view-icon i:active {
    transform: scale(1.5);
}
.search-bar:focus {
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
    transition: 0.1s;
}
.card {
    border-radius: 10px;
    min-width: 50px;
    margin-top: 0px;
    margin-bottom: 25px;
    padding: 20px;
    width: 320px;
    height: 300px;
    box-shadow: 0 1px 3px 0 rgba(186,188,217, 0.4);
    transition: box-shadow .1s ease-in-out, transform .1s ease-in-out;
    position: relative;
    background-color: white;
}
.card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 10px 0 rgba(186,188,217, 0.25), 0 6px 6px 0 rgba(186,188,217, 0.5);
    transition: box-shadow .2s ease-in-out, transform .2s ease-in-out;
}

.card-content {
    text-align: left;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
};
.card-content a {
    text-decoration: none;
    color: inherit;
}
.card-content a:hover {
    color:#F2F6FC;
}
.description {
    margin: 10px 0;
    padding: 10px 0;
}

</style>
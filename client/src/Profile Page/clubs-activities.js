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
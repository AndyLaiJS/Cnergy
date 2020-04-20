export default class Activity {
     constructor(
          id = "",
          name = "", 
          description = "", 
          activityDate = "", 
          minParticipants = "", 
          maxParticipants = "",
          type = "Public"
     ) {
          this.id = id;
          this.name = name;
          this.description = description;
          this.activityDate = activityDate;
          this.minParticipants = minParticipants;
          this.maxParticipants = maxParticipants;
          this.type = type;
     }
}
export default class User {
     constructor(
          id, 
          name, 
          description, 
          activityDate, 
          minParticipants, 
          maxParticipants,
          type
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
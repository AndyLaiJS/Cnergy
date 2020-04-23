export default interface User {
     id: string;
     firstName: string;
     lastName: string;
     email: string;
     password: string;
     college: string;
     major: string;
     about: string;
     activities?: Array<{
          id: number;
          name: string;
          description: string;
          activityDate: Date;
          maxParticipants: number;
          minParticipants: number;
          createdAt: Date;
          updatedAt: Date;
          deletedAt: Date;
     }>,
     clubs?: Array<{
          id: number;
          name: string;
          description: Text;
          createdAt: Date;
          updatedAt: Date;
     }>
}
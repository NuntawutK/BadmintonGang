import { GroupMemberInterface } from "./IGroupMember";
import { MembersInterface } from "./IUser";

export interface GroupInterface {
    
    ID: number;

    NameGroup: string;
	CodeGroup: string;

    CreatedMemberID: number;
    CreatedMember: MembersInterface;

    Members: MembersInterface[];    

}

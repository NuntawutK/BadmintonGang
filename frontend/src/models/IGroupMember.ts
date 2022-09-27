import { GroupInterface } from "./IGroup";
import { MembersInterface } from "./IUser";

export interface GroupMemberInterface {
    
    ID: number;
	
    GroupID:number;
    Group: GroupInterface;


    MemberID:number;
    Member: MembersInterface;
}

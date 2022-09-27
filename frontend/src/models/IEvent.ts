import { GroupInterface } from "./IGroup";
import { GroupMemberInterface } from "./IGroupMember";
import { ShuttleCockInterface } from "./IShuttleCock";

export interface EventShuttInterface{
    ID: number;

    EventGroupMemberID:number;
    EventGroupMember: GroupMemberInterface;

    ShuttleCockID: number;
    ShuttleCock: ShuttleCockInterface;

    Place: string;
    TimeStart: Date;
    TimeStop: Date;


}
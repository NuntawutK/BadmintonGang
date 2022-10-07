import { EventGroupMemberInterface } from "./IEventGroupMember";
import { GroupInterface } from "./IGroup";
import { GroupMemberInterface } from "./IGroupMember";
import { ShuttleCockInterface } from "./IShuttleCock";


export interface EventShuttInterface{
    ID: number;

  
    EventGroupMember: EventGroupMemberInterface[];
    ShuttleCock: ShuttleCockInterface[];

    Place: string;
    TimeStart: Date;
    TimeStop: Date;

    GroupID: number;
    Group: GroupInterface;


}
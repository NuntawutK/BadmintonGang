import { GroupMemberInterface } from "./IGroupMember";
import { EventShuttInterface } from "./IEvent";
import { EventGroupmemberShuttlecockInterface } from "./IEventGroupMemberShuttlecock";

export interface EventGroupMemberInterface {
    
    ID: number;
	
    GroupMemberID:number;
    GroupMember: GroupMemberInterface;

    EventShuttID:number;
    EventShutt: EventShuttInterface;

    EventGroupMemberShuttlecock: EventGroupmemberShuttlecockInterface[];
}

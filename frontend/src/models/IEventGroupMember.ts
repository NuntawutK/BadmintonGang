import { GroupMemberInterface } from "./IGroupMember";
import { EventShuttInterface } from "./IEvent";

export interface EventGroupMemberInterface {
    
    ID: number;
	
    GroupMemberID:number;
    GroupMember: GroupMemberInterface;

    EventShuttID:number;
    EventShutt: EventShuttInterface;
}

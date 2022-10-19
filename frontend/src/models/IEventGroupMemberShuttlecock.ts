import { EventGroupMemberInterface } from "./IEventGroupMember";
import { ShuttleCockInterface } from "./IShuttleCock";

export interface EventGroupmemberShuttlecockInterface {
    
    ID: number;


    ShuttleCockID: number;
    ShuttleCock: ShuttleCockInterface;

    EventGroupMemberID: number;
    EventGroupMember: EventGroupMemberInterface;

}

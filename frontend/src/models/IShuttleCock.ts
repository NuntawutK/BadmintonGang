import { EventShuttInterface } from "./IEvent";
import { MembersInterface } from "./IUser";

export interface ShuttleCockInterface {
    
    ID: number;
	Code: string;

    EventShuttID: number;
    EventShutt: EventShuttInterface;

    MemberID: number;
    Member: MembersInterface;

}

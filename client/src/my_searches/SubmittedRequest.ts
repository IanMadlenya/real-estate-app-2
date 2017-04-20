import {Property} from "../find_an_owner/Property";

/**
 * Created by hartex
 */

export class SubmittedRequest {

    constructor(public requestID: number,
                public uid: number,
                public requestDate: Date,
                public status: RequestStatus,
                public property: Property) {
    }

}

type RequestStatus = "Pending" | "In Progress" | "Done";
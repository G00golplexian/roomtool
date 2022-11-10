export interface RoomPosition {
    x: number;
    y: number;
}

export enum RoomType {
    "pc_circle",
    "pc_sixtable",
    "omnibus",
    "u_big",
    "u_small"
}

export class Report {
    id: number;
    room: string;
    category: string;
    roomType: RoomType;
    position: RoomPosition;
    description: string;

    status?: string = "offen";
    dateTime?: string;
    reportedBy?: number;

    constructor(data?: { id?: number; room?: string; category?: string; roomType?: RoomType; position?: RoomPosition; description?: string;}) {

        this.id = data?.id ?? -1;
        this.room = data?.room ?? "";
        this.category = data?.category ?? "";
        this.roomType = data?.roomType ?? RoomType.omnibus;
        this.position = data?.position ?? { x: 0, y: 0};
        this.description = data?.description ?? "";
    }

}

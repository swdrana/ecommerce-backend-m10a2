//  src/modules/facility/facility.interface.ts
export type TFacility = {
    name: string;
    description: string;
    pricePerHour: number;
    location: string;
    isDeleted?:boolean
};
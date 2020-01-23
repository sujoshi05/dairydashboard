export interface RateData {
    _id: string;
    animal: string;
    rate: number;
}


export interface ServerResponse {
    count: number;
    data: RateData[];
}


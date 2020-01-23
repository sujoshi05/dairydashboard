
export interface ReportData {
    _id: {
        name: string,
        adhaarNo: string,
        customerId: string
    };
    amount: number;
}

export interface DetailReportData {
    '_id': string;
    'date': string;
    'quantity': number;
    'quality': number;
    'animal': string;
    'rate': number;
}

export interface DetailServerResponse {
    data: DetailReportData[];
    count: number;
}

export interface ServerResponse {
    data: ReportData[];
    count: number;
}


export interface Month {
    value: number;
    viewValue: string;
}

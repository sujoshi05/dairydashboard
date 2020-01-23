import { Injectable } from '@angular/core';


@Injectable()
export class UtilityService {
    monthRef = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sept',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
    };
    constructor() {

    }
    getMonth(key) {
        key = Number(key);
        return this.monthRef[key];
    }

    getYears() {
        return [2019, 2020];
    }

}

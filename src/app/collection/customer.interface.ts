import { RateData } from '../setting/setting.model';

export interface Customer {
  name: string;
  _id: string;
}

export interface SettingResponse {
  count: number;
  data: RateData[];
}

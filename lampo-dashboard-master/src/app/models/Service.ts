export interface Service {
  enable: boolean;
  _id: string;
  params?: any;
  name: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
  viewType: number;
  id: string;
}

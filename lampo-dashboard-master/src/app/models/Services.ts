import {ServiceImage} from "./Service-Image";

export interface Services {
  id: number;
  name: string;
  desc: string;
  enable: boolean;
  created_at: Date;
  updated_at: Date;
  type: number;
  image: ServiceImage;
  checked: boolean;
}

import { Category } from './../category/Category.model';

export interface UFO_sighting {
  id?: number;
  categoryID: number;
  category?: Category;
  ufO_title: string;
  longitude: number;
  latitude: number;
  observation_date: Date;
  description: string;
}

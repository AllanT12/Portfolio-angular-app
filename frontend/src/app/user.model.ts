import {Work} from "./work.model";

export class User {
  id: number = 1;
  name: string = 'Alin';
  description: string = 'Web Dev';
  pfpUrl: string = '/assets/photo/default-avatar.jpg';
  works: Work[] = [];
}

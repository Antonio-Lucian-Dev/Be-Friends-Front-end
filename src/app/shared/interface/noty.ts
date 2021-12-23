export interface Noty {
  uuid: string;
  read: boolean;
  new: boolean;
  prefData: {
    date: string;
    type: string;
    title: string;
    description: string;
  }
  userId: string;
  createdAt: Date;
}

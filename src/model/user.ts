import { ObjectId } from "mongodb";

export default class User {
  constructor(
    public name: string,
    public email: string,
    public phone: number,
    public profile_img: string,
    public id?: ObjectId
  ) {}
}

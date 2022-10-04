import { ObjectId } from "mongodb";

export default class Game {
  constructor(
    public name: string,
    public email: string,
    public phone: number,
    public id?: ObjectId
  ) {}
}

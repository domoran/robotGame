export default class Robot {
  public x;
  public y;
  public direction;

  constructor (x,y,direction) {
    if (typeof x === "object") {
      this.x = x.x;
      this.y = x.y;
      this.direction = x.direction;
    } else {
      this.x = x;
      this.y = y;
      this.direction = direction;
    }
  }

}

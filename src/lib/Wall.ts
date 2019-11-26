export default class Wall {
  private x;
  private y;
  private isHorizontal;

  constructor (x,y,isHorizontal) {
    if (typeof x === "object") {
      this.x = x.x;
      this.y = x.y;
      this.isHorizontal = x.isHorizontal;
    } else {
      this.x = x;
      this.y = y;
      this.isHorizontal = isHorizontal;
    }
  }

}

export default class Wall {
  private x;
  private y;
  private isHorizontal;

  constructor (x,y,isHorizontal) {
    this.x = x;
    this.y = y;
    this.isHorizontal = isHorizontal;
  }
}

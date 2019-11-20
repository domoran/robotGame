export default class GameConfig {
  public walls;
  public robots;
  public fields;

  constructor () {
    this.fields = [];
    this.walls = [];
    this.robots = [];
  }

  public field(field) { this.fields.push(field); }
  public wall(field) { this.walls.push(field); }
  public robot(field) { this.robots.push(field); }

  public clear() { this.fields = []; this.walls = []; this.robots = [] }
}

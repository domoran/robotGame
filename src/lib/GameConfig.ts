import Field from '@/lib/Field'
import Wall from '@/lib/Wall'
import Robot from '@/lib/Robot'

export default class GameConfig {
  public walls;
  public robots;
  public fields;

  constructor (data) {
    this.fields = [];
    this.walls = [];
    this.robots = [];

    if (data) {
      this.fields = data.fields.map(i=>new Field(i));
      this.walls = data.walls.map(i=>new Wall(i));
      this.robots = data.robots.map(i=>new Robot(i));
    }
  }

  public field(field) { this.fields.push(field); }
  public wall(field) { this.walls.push(field); }
  public robot(field) { this.robots.push(field); }

  public clear() { this.fields = []; this.walls = []; this.robots = [] }

  public getData() {
    return this;
  }
}

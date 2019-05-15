import * as BABYLON from 'babylonjs'
import Lantern from './lantern'

const EventBus = require('js-event-bus')(),
      STOPPED = 0,
      RUNNING_NORTH = 1,
      RUNNING_SOUTH = 2,
      RUNNING_WEST = 3,
      RUNNING_EAST = 4,
      RUNNING_NORTH_WEST = 5,
      RUNNING_NORTH_EAST = 6,
      RUNNING_SOUTH_WEST = 7,
      RUNNING_SOUTH_EAST = 8,
      SPEED = 0.1,
      controls = ['w', 'a', 's', 'd'];

class Player {
  constructor(scene, properties) {
    this.scene = scene
    this.properties = properties
    this.mesh = null
    this.lantern = null
    this.state = STOPPED
    this.inputs = {}
    EventBus.on('keydown', (key) => {
      if (controls.includes(key)) {
        this.inputs[key] = true
        this.updateState()
      }
    });
    EventBus.on('keyup', (key) => {
      if (controls.includes(key)) {
        this.inputs[key] = false
        this.updateState()
      }
    });
  }

  create() {
    this.mesh = BABYLON.MeshBuilder.CreateBox("myBox", {height: 2, width: 1, depth: 1}, this.scene);
    this.mesh.position = new BABYLON.Vector3(0, 1, 0);
    this.lantern = new Lantern(this.scene, this)
    this.lantern.create()
  }

  update() {
    let diagonalSpeed = Math.sqrt(SPEED * SPEED / 2)
    switch(this.state) {
      case RUNNING_NORTH:
        this.mesh.position.z -= SPEED
      break;
      case RUNNING_SOUTH:
        this.mesh.position.z += SPEED
      break;
      case RUNNING_WEST:
        this.mesh.position.x += SPEED
      break;
      case RUNNING_EAST:
        this.mesh.position.x -= SPEED
      break;
      case RUNNING_NORTH_WEST:
        this.mesh.position.z -= diagonalSpeed
        this.mesh.position.x += diagonalSpeed
      break;
      case RUNNING_NORTH_EAST:
        this.mesh.position.z -= diagonalSpeed
        this.mesh.position.x -= diagonalSpeed
      break;
      case RUNNING_SOUTH_WEST:
        this.mesh.position.z += diagonalSpeed
        this.mesh.position.x += diagonalSpeed
      break;
      case RUNNING_SOUTH_EAST:
        this.mesh.position.z += diagonalSpeed
        this.mesh.position.x -= diagonalSpeed
      break;
      default:
      break;
    }
  }

  updateState() {
    if(this.inputs["w"] && this.inputs["a"]) {
      this.state = RUNNING_NORTH_WEST
      return
    }
    if(this.inputs["w"] && this.inputs["d"]) {
      this.state = RUNNING_NORTH_EAST
      return
    }
    if(this.inputs["s"] && this.inputs["a"]) {
      this.state = RUNNING_SOUTH_WEST
      return
    }
    if(this.inputs["s"] && this.inputs["d"]) {
      this.state = RUNNING_SOUTH_EAST
      return
    }
    if(this.inputs["w"]) {
      this.state = RUNNING_NORTH
      return
    }
    if(this.inputs["s"]) {
      this.state = RUNNING_SOUTH
      return
    }
    if(this.inputs["a"]) {
      this.state = RUNNING_WEST
      return
    }
    if(this.inputs["d"]) {
      this.state = RUNNING_EAST
      return
    }
    this.state = STOPPED
  }
}

export default Player;
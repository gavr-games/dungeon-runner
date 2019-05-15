import * as BABYLON from 'babylonjs'

class Lantern {
  constructor(scene, player) {
    this.scene = scene
    this.player = player
    this.light = null
  }

  create() {
    this.light = new BABYLON.SpotLight("lanternLight", new BABYLON.Vector3(0, 12, 0), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 50, this.scene);
	  this.light.diffuse = new BABYLON.Color3(0, 1, 0);
    this.light.specular = new BABYLON.Color3(0, 1, 0);
    this.light.parent = this.player.mesh
  }
}

export default Lantern;
import * as BABYLON from 'babylonjs'

class Dungeon {
  constructor(scene) {
    this.scene = scene
    this.ground = null
  }

  create() {
    this.ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 10, width: 10, subdivisions: 10}, this.scene)
    let groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this.scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("/assets/textures/floor/Stone_Floor_003_DISP.png", this.scene);
    this.ground.material = groundMaterial
  }
}

export default Dungeon;
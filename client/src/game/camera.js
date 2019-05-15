import * as BABYLON from 'babylonjs'

class Camera {
  constructor(scene, target) {
    this.scene = scene
    this.target = target
  }

  create() {
    let camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 10, -10), this.scene)
    camera.radius = 20
    camera.heightOffset = 20
    camera.rotationOffset = -10
    camera.cameraAcceleration = 0.1
    camera.maxCameraSpeed = 10
    camera.lockedTarget = this.target
  }
}

export default Camera;
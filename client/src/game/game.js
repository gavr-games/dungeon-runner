import * as BABYLON from 'babylonjs'
import Player from './player/player'
import Camera from './camera'
import Dungeon from './dungeon'

const EventBus = require('js-event-bus')();

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas')
    this.engine = new BABYLON.Engine(this.canvas, true, {preserveDrawingBuffer: true, stencil: true})
    this.scene = null
    this.player = null
    this.camera = null
    this.dungeon = null
  }

  createScene() {
    let scene = new BABYLON.Scene(this.engine);
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    this.registerActions(scene)
    
    this.player = new Player(scene, {})
    this.player.create()

    this.camera = new Camera(scene, this.player.mesh)
    this.camera.create()

    this.dungeon = new Dungeon(scene)
    this.dungeon.create()

    return scene
  }

  registerActions(scene) {
    scene.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt) => {
        EventBus.emit('keydown', null, evt.sourceEvent.key)
      }
    ));
    scene.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, (evt) => {
        EventBus.emit('keyup', null, evt.sourceEvent.key);
      }
    ));
  }

  run() {
    this.scene = this.createScene();
    this.engine.runRenderLoop(() => {
      this.player.update()
      this.scene.render()
    })
    window.addEventListener('resize', () => {
      this.engine.resize();
    });
  }
}

export default Game;

import { Scene, WebGLRenderer, PerspectiveCamera } from "three";
import { Entity } from "./Entity";
import { GameEntity } from "./GameEntity";

import { EffectComposer } from './vendor/threejs/EffectComposer';
import { RenderPass } from './vendor/threejs/RenderPass';

export class Engine {
    private _entites = new Array<Entity>();
    get entities() : Array<Entity>{ return this._entites };
    get scene() : Scene{ return this._scene };

    private _scene = new Scene();

    public renderer = new WebGLRenderer();
    private composer: EffectComposer;

    public camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1);

    public constructor(){
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this._scene, this.camera));
         
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        this.camera.position.z = 11.125;
    }

    public addEntity(entity: Entity){
        this.entities.push(entity);
    }
    
    public addGameEntity(entity: GameEntity){
        this.addEntity(entity);
    }

    public start(): void {
        this.update();
    }

    public update() : void {
        this._entites.forEach(entity => entity.update());
        this.composer.render();
        
        requestAnimationFrame(() => this.update());
    }
}
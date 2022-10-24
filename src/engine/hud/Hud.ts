import { Raycaster } from "three";
import { BaseActionObject, Interpreter, ResolveTypegenMeta, ServiceMap, TypegenDisabled } from "xstate";
import { Entity } from "../Entity";
import machine, { EngineContext, EngineEvent, EngineState } from "../StateMachines/EngineStateMachine";

export class Hud{
    private _engineService: Interpreter<EngineContext, any, EngineEvent, EngineState, ResolveTypegenMeta<TypegenDisabled, EngineEvent, BaseActionObject, ServiceMap>> ;
    private _rootDom = document.getElementById("hud")
    private _raycaster: Raycaster;
    public constructor(private _engineEntities : Array<Entity>){
        
    }

    public update(){
    }

    public createDomElement(tagType: string, uuid: string){
      const tag = document.createElement(tagType)
      tag.id = uuid;
      tag.innerHTML = `<b>uuid:</b> <i>${uuid}</i>`;
      return tag;
    }

    public addGameEntity(){
      this._engineService.send("ADD_GAME_ENTITY")
      this.refresh()
    }

    public init(context: EngineContext){
        this._engineService = machine;
        const addButton = document.createElement('button');
        const refreshButton = document.createElement('button');
        refreshButton.textContent = "Refresh";
        addButton.textContent = "Add";
        const controls = document.getElementById("controls");
        controls.appendChild(addButton);
        controls.appendChild(refreshButton);
        addButton.addEventListener("click", () => { this.addGameEntity()});
        refreshButton.addEventListener("click", () => { this.refresh()});
    }

    private refresh(){
      this._engineEntities.forEach(entity =>{ 
          
        const domEntity = document.getElementById(entity.uuid);
        if (!domEntity){
          const entitySection  = this.createDomElement("section", entity.uuid);
          entitySection.className = "entity";
          document.getElementById("entityList").appendChild(entitySection);
          entity.components.forEach(component => {
            const componentArticle = document.createElement("article");
            componentArticle.id = component.uuid;
            componentArticle.innerHTML = `<b>${component.name}</b>`;
            componentArticle.className = "component";

            Array.from(component.properties.keys()).forEach(propertyKey => {
              const d = document.createElement('div');
              d.innerHTML = `${propertyKey}: ${component.properties.get(propertyKey).toString()}`
              componentArticle.appendChild(d);
            })
            entitySection.appendChild(componentArticle)
          })
          const addComponentButton = document.createElement("button");
          addComponentButton.textContent = "Add component";
          addComponentButton.disabled = true;
          entitySection.appendChild(addComponentButton);
        }
       
      })
    }
}
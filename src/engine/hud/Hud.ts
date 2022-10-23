import { BaseActionObject, Interpreter, ResolveTypegenMeta, ServiceMap, TypegenDisabled } from "xstate";
import { Entity } from "../Entity";
import machine, { EngineContext, EngineEvent, EngineState } from "../StateMachines/EngineStateMachine";

export class Hud{
    private _engineService: Interpreter<EngineContext, any, EngineEvent, EngineState, ResolveTypegenMeta<TypegenDisabled, EngineEvent, BaseActionObject, ServiceMap>> ;
    private _rootDom = document.getElementById("hud")
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

    public init(){
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
          const section  = this.createDomElement("section", entity.uuid);
          section.className = "entity";
          document.getElementById("entityList").appendChild(section);
          entity.components.forEach(component => {
            const componentArticle = document.createElement("article");
            componentArticle.id = component.uuid;
            componentArticle.innerHTML = `<b>${component.name}</b>`;
            componentArticle.className = "component"
            const properties = Object.keys(component)
                              .filter(propertyKey => propertyKey !== "_uuid" && propertyKey !== "_name")
                              .map(propertyKey => `${propertyKey.split("_")[1]} ${component[propertyKey]}`);
                              
            properties.forEach(entry => {
              const d = document.createElement('div')
              d.innerHTML = entry;
              componentArticle.appendChild(d);
              section.appendChild(componentArticle)
            });
          })
          const addComponentButton = document.createElement("button");
          addComponentButton.textContent = "+"
          section.appendChild(addComponentButton);
        }
       
      })
    }
}
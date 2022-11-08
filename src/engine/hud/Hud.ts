import { Raycaster } from "three";
import { BaseActionObject, Interpreter, ResolveTypegenMeta, ServiceMap, TypegenDisabled } from "xstate";
import { Transform } from "../components/Transform";
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
              const propertyValue = component.properties.get(propertyKey);
              d.innerHTML = `${propertyKey}: `;
              componentArticle.appendChild(d);
              
              if (propertyValue.value instanceof Array<number>){
                d.className = "inputBox";
                propertyValue.value.forEach((v,i) => {
                  const input = document.createElement('input');
                  input.type = "number";
                  input.style.width = "50px";
                  input.value = v.toString();
                  d.appendChild(input);
                  d.addEventListener("change", function(i){
                    return function (e : InputEvent){
                      const transform = component as Transform;
                      const properties = Array.from(d.children).map(v => v as HTMLInputElement)
                      transform.updateProperty(propertyKey, properties.map(p => p.value));
                    }
                  }(i))
                })
              } else if (typeof(propertyValue.value) === "string" || typeof(propertyValue.value) === "number" ){
                const input = document.createElement('input');
                  if (typeof(propertyValue.value) === "string"){
                    input.value = propertyValue.value;
                  }
                  else  if (typeof(propertyValue.value) === "number"){
                    input.value = propertyValue.value.toString();
                    input.type = "number";
                    input.style.width = "50px";
                  }
                  d.appendChild(input);
                  d.onchange = (e : InputEvent) => {
                    component.updateProperty(propertyKey,Number((e.target as HTMLInputElement).value))
                  }
              }
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
import { BaseActionObject, interpret, Interpreter, ResolveTypegenMeta, ServiceMap, TypegenDisabled } from "xstate";
import { Entity } from "../Entity";
import machine, { EngineContext, EngineEvent, EngineState } from "../StateMachines/EngineStateMachine";

export class Hud{
    private _engineService: Interpreter<EngineContext, any, EngineEvent, EngineState, ResolveTypegenMeta<TypegenDisabled, EngineEvent, BaseActionObject, ServiceMap>> ;
    public constructor(private _engineEntities : Array<Entity>){
        
    }
    public update(){
    }
    public addGameEntity(){
      this._engineService.send("ADD_GAME_ENTITY")
      this.refresh()
    }
    public init(){
        this._engineService = machine;
        const addItem = document.createElement('button');
        addItem.textContent = "+";
        document.getElementById("hud").appendChild(addItem);
        addItem.addEventListener("click", () => { this.addGameEntity()});

        
    }
    private refresh(){
      this._engineEntities.forEach(entity =>{ 
          
        const domEntity = document.getElementById(entity.uuid);
        
        if (!domEntity){
          const section  = document.createElement("section");
          section.id = entity.uuid;
          section.innerHTML = entity.uuid;
          document.getElementById("hud").appendChild(section)
          entity.components.forEach(entry => {
            const section  = document.createElement("article");
            section.id = entry.uuid;
            const entries = Object.keys(entry)
                              .filter(key => key !== "uuid")
                              .map(key => `${key.split("_")[1]} ${entry[key]}`);
                              
            entries.forEach(entry => {
              const d = document.createElement('div')
              d.innerHTML = entry;
              section.appendChild(d);
            })
            document.getElementById("hud").appendChild(section)
          })
  
        }
       
      })
    }
}
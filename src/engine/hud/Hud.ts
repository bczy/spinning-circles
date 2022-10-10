import { Entity } from "../Entity";

export class Hud{
    public constructor(private _engineEntities : Array<Entity>){
        this.init();
    }
    public update(){
    }
    private init(){
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
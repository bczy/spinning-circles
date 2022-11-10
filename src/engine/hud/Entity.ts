import { Entity } from "../entities/Entity";
import { createDomElement } from "./utils";

export function createEntity(entity: Entity){
    const entityArticle = createDomElement('article', entity.uuid,'entity');
    entity.components.forEach((component) => {
      const componentArticle = createDomElement('article', component.name, 'component');
      componentArticle.id = component.uuid;
      componentArticle.innerHTML = `<b>${component.name}</b>`;

      Array.from(component.properties.keys()).forEach((propertyKey,i) => {
        const d = createDomElement('div', '', 'inputBox');
        const propertyValue = component.properties.get(propertyKey);
        d.innerHTML = `${propertyKey}: `;
        componentArticle.appendChild(d);

        if (propertyValue.value instanceof Array<number>) {
          propertyValue.value.forEach((v,j) => {
            const input = createDomElement('input',`${entity.uuid}${j}`,'input') as HTMLInputElement;
            input.value = v.toString();
            input.type = 'number';
            input.addEventListener('input', () => {
              const properties = Array.from(d.children);
              component.updateProperty(
                propertyKey,
                properties.map((p: HTMLInputElement) => p.value)
              );
            });
            d.appendChild(input);
          });
        } else if (typeof propertyValue.value === 'number') {
          const input = createDomElement('input','','input') as HTMLInputElement;
          input.type = "number";
          input.value = propertyValue.value.toString();
          d.appendChild(input);
          d.addEventListener('input', () => {
            component.updateProperty(
              propertyKey,
              input.value
            );
          });
        }
      });
      entityArticle.appendChild(componentArticle);
    });
    return entityArticle;
  }
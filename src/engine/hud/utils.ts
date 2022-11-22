import { Euler, Vector3 } from "three";

export function createDomElement(
  tagType: string,
  uuid: string,
  className?: string,
): HTMLElement {
  const tag = document.createElement(tagType);
  tag.id = uuid;
  tag.innerHTML = `<b>uuid:</b> <i>${uuid}</i>`;
  if (className) {
    tag.className = className;
  }
  return tag;
}

export function updateInputs(inputs: Array<HTMLInputElement>, values : Vector3 | Euler ){
  inputs[0].value = values.x.toString();
  inputs[1].value = values.y.toString();
  inputs[2].value = values.z.toString();
}
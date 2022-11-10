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

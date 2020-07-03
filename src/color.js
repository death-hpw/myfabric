// 颜色选择器

const template = document.createElement("template");

template.innerHTML = `



`;
class ColorPicker extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.colors = ["red", "green", "blue", "yellow"];
  }
}

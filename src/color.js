// 颜色选择器

const colorPickerTemplate = document.createElement("template");

colorPickerTemplate.innerHTML = `

  <style>
    .active-color-picker-icon {
      display: none;
    }
  </style>

  <div id="color-picker">
    <div class="color-picker-icon">${ICONS_SVG.color}</div>
    <div class="active-color-picker-icon">${ICONS_SVG.colorActive}</div>

    <div class="color-picker-box">

    </div>
  </div>


`;
class ColorPicker extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(colorPickerTemplate.content.cloneNode(true));

    // this.colors = ["red", "green", "blue", "yellow"];

    this.$colorPicker = this._shadowRoot.querySelector("#color-picker");
    this.$pickerIcon = this._shadowRoot.querySelector(".color-picker-icon");
    this.$actviePickerICon = this._shadowRoot.querySelector(
      ".active-color-picker-icon"
    );

    this.$colorBox = this._shadowRoot.querySelector(".color-picker-box");
    // this.$colorPicker = this._shadowRoot.querySelector("#color-picker");

    this.$pickerIcon.addEventListener("click", () => {
      this.$actviePickerICon.style.display = "block";
      this.$pickerIcon.style.display = "none";
      this.changeMode("color");
    });

    this.$actviePickerICon.addEventListener("click", () => {
      this.$actviePickerICon.style.display = "none";
      this.$pickerIcon.style.display = "block";
      this.changeMode("");
    });
  }

  // static get observedAttributes() {
  //   return ["colorlist"];
  // }

  // get colorlist() {
  //   return JSON.parse(this.getAttribute("colorlist"));
  // }

  // set colorlist(value) {
  //   return this.setAttribute("colorlist", JSON.stringify(value));
  // }

  // static get observedAttributes() {
  //   return ["colorlist"];
  // }

  // attributeChangedCallback(name, oldVal, newVal) {
  //   console.log("----", name, newVal);
  //   // this[name] = newVal;
  //   // this.render();
  // }

  static get observedAttributes() {
    return ["colorlist"];
  }

  get colorlist() {
    return JSON.parse(this.getAttribute("colorlist"));
  }

  set colorlist(value) {
    return this.setAttribute("colorlist", JSON.stringify(value));
  }

  static get observedAttributes() {
    return ["colorlist"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log("----", name, newVal);
    // this[name] = newVal;
    if (newVal) {
      this.renderColorList(newVal);
    }
    // this.render();
  }

  renderColorList(list) {
    let colorhtml = "";
    let listArr = JSON.parse(list);
    for (let i = 0; i < listArr[i]; i++) {
      colorhtml += `
        <div style="backgroundColor:${listArr[i]}">111</div>
      `;
    }
    // this.$colorBox.innerHTML(colorhtml);
  }
}

window.customElements.define("color-picker", ColorPicker);

const template = document.createElement("template");

// let pencils = ["", "circle", "spray"];
let pencilArrs = ["Pencil", "Circle", "Spray"];

let brushArrs = pencilArrs.map((d) => {
  return `${d.replace(d[0], d[0].toLowerCase())}`;
});

let pencils = "";

for (let i = 0; i < pencilArrs.length; i++) {
  pencils += `
    <div class='pencil-item' data-brush=${pencilArrs[i]}>${
    ICONS_SVG[brushArrs[i]]
  }</div>
  `;
}

template.innerHTML = `

    <style>
      #my-pencil {
        position:relative;
      }

      .pencil-box {
        display:flex;
        position:absolute;
        left:-5px;
        padding:5px;
        border-radius: 3px;
        top: 45px; 
        // border:1px solid red;
        display:none;
         background: #666;
      }
      .pencil-box::after {
        content: "";
        position:absolute;
        top:-10px;
        left: 8px;
        width:0;
        height:0;
        border-right:10px solid transparent;
        border-left:10px solid transparent;
        border-bottom:10px solid #666;
        // border-color:#fff;
      }
      .pencil-item {
        display:block;
        width:20px;
        height:20px;
        // border:1px solid red;
        padding:5px;
        // box-sizing: border-box;
        border:1px solid red;
      }
      .pencil-item::hover {
        background-color: #fff !important;
        cursor:pointer;
      }

      #my-pencil::after {
        position: absolute;
        background:red;
        left: 0px;
      }
    </style>

    <div id="my-pencil">
      <div class="pencil">${ICONS_SVG.pencil}</div>
      <div class="active-pencil">${ICONS_SVG.pencilActive}</div>

      <div class="pencil-box">${pencils}</div>
    </div>
  
  `;
// <div class="pencil">${ICONS_SVG.pencil}</div>

class MyPencil extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$myPencil = this._shadowRoot.querySelector("#my-pencil");
    this.$pencilBox = this._shadowRoot.querySelector(".pencil-box");
    this.$pencil = this._shadowRoot.querySelector(".pencil");
    this.$activePencil = this._shadowRoot.querySelector(".active-pencil");

    // this.$pencilItem = this._shadowRoot.querySelectorAll(".pencil-item");

    this.init();

    // 定义点击事件
    this.$pencil.addEventListener(
      "click",
      () => {
        this.$activePencil.style.display = "block";
        this.$pencil.style.display = "none";
        // this.onClick(true);
        this.changeMode("pencil");
        this.$pencilBox.style.display = "flex";
      },
      false
    );

    this.$activePencil.addEventListener(
      "click",
      () => {
        console.log("tjo...", this);
        this.$activePencil.style.display = "none";
        this.$pencil.style.display = "block";
        this.$pencilBox.style.display = "none";
        // 通知父级页面
        // this.onClick(false);
        this.changeMode("");
      },
      false
    );

    this.$pencilBox.addEventListener("click", (e) => {
      let div = e.target;
      while (div.nodeName !== "DIV") {
        div = div.parentNode;
      }
      if (div.className === "pencil-item") {
        this.changePencil(div.getAttribute("data-brush"));
        this.$pencilBox.style.display = "none";
      }
    });

    // this.onClick = this.onClick.bind(this);
  }

  static get observedAttributes() {
    return ["config"];
  }

  get config() {
    return JSON.parse(this.getAttribute("config"));
  }

  set config(value) {
    return this.setAttribute("config", JSON.stringify(value));
  }

  static get observedAttributes() {
    return ["config"];
  }

  attributeChangedCallback(name, oldVal, newVal) {}

  init() {
    this.$activePencil.style.display = "none";

    // this.$myPencil;
  }

  render() {
    // this.$myPencil.setAttribute("config", JSON.)
  }

  changeMode(mode) {
    console.log("mode", mode);
    mode === "pencil"
      ? this.dispatchEvent(
          new CustomEvent("onClick", {
            detail: {
              mode: "pencil"
            }
          })
        )
      : this.dispatchEvent(
          new CustomEvent("onClick", {
            // detail: false,
            detail: {
              mode: ""
            }
            // mode: ""
          })
        );
  }
}
window.customElements.define("my-pencil", MyPencil);

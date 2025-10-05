/**
 * Copyright 2025 Jericho P. Reyes
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/multiple-choice/lib/confetti-container.js";

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */
export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.count = 0;
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      count: { type: Number, reflect: true },
    };
  }
  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    if (changedProperties.has('count')) {
      if (this.count === 21) {
        this.makeItRain();
      }
    }
}


  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-default-coalyGray);
        font-family: var(--ddd-font-navigation);
      }
      :host([count="18"]) {
        color: var(--ddd-theme-default-opportunityGreen);
      }
      :host([count="21"]) {
        color: var(--ddd-theme-default-opportunityGreen);
      }
      :host([count="25"]) .counter{
        color: var(--ddd-theme-default-error);
      }
      :host([count="-10"]) .counter{
        color: var(--ddd-theme-default-error);
      }
      counter-app {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        flex-direction: column;
        align-items: center;
        position: relative;
        display: flex;
        margin: 16px;
        padding: 16px;

      }
      .counter {
        font-size: 40px;
        font-weight: var(--ddd-font-weight-bold);
        transition: color 0.3s ease;
        color: var(--ddd-theme-primary);
      }

      button {
        font-size: 18px;
        gap: 8px;
        

      }
      button:focus {
        outline: 2px solid var(--ddd-theme-default-potential50);
        box-shadow: 0 0 0 2px var(--ddd-theme-default-potential50);
        outline-offset: 2px;
      }
      button:hover{
        background-color: #14216b;
        transition: background-color 0.3s ease;
        transform: scale(0.83);
      }
      button:disabled {
        background-color: var(--ddd-theme-default-disabled, #ff1900);
        border-color: var(--ddd-theme-default-disabled, #ff1900);
      }
    `];
  }

  makeItRain() {
    
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        const globalConfetti = window.document.querySelector('#confetti');
        if (globalConfetti) {
          globalConfetti.setAttribute('popped', '');
        }

        setTimeout(() => {
          const confetti = this.shadowRoot && this.shadowRoot.querySelector("#confetti");
          if (confetti) {
            confetti.setAttribute("popped", "");
          } else {
            console.warn("Confetti container not found in shadowRoot!");
          }
        }, 0);
      }
    );
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <confetti-container id="confetti" style="position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;"></confetti-container>
        <div class="counter">${this.count}</div>
        <div class="buttons">
          <button @click="${this.increase}" ?disabled="${this.count === 25}">+</button>
          <button @click="${this.decrease}" ?disabled="${this.count === -10}">-</button>
          <button @click="${this.reset}">Reset</button>
        </div>
      </div>
    `;
  }
  increase() {
    if (this.count < 25) {
      this.count++;
    }
  }
  decrease() {
    if (this.count > -10) {
      this.count--;
    }
  }
  reset() {
    this.count = 0;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }   
}

globalThis.customElements.define(CounterApp.tag, CounterApp);

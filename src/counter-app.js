import { LitElement, html, css } from 'lit';
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class CounterApp extends LitElement {
  static get properties() {
    return {
      count: { type: Number, reflect: true },
      step: { type: Number, reflect: true },
      min: { type: Number, reflect: true },
      max: { type: Number, reflect: true },
    };
  }

  constructor() {
    super();
    this.count = 0;
    this.step = 1;
    this.min = 0;
    this.max = 100;
  }

  static get styles() {
    return css`
      :host {
        /* Define theme variables within the shadow DOM */
        --ddd-theme-default: black;
        --ddd-theme-error: red;
        --ddd-theme-info: blue;
        --ddd-theme-warning: orange;
        --ddd-theme-success: green;
        /* Add more if needed, e.g., for buttons */
        --ddd-theme-primary: #007bff;
        --ddd-theme-accent: #0056d2;
        --ddd-theme-disabled: gray;
      }
      .wrapper {
        padding: var(--ddd-spacing-4);
        text-align: center;
      }
      .counter {
        font-size: var(--ddd-font-size-xxl);
        margin-bottom: var(--ddd-spacing-4);
        color: var(--ddd-theme-default);
      }
      .counter-min {
        color: var(--ddd-theme-error);
      }
      .counter-max {
        color: var(--ddd-theme-info);
      }
      .counter-eighteen {
        color: var(--ddd-theme-warning);
      }
      .counter-twentyone {
        color: var(--ddd-theme-success);
      }
      .buttons {
        display: flex;
        justify-content: center;
        gap: var(--ddd-spacing-2);
      }
      button {
        font-size: var(--ddd-font-size-m);
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        border: var(--ddd-border-sm);
        border-radius: var(--ddd-radius-sm);
        background-color: var(--ddd-theme-primary);
        color: white;
        cursor: pointer;
      }
      button:hover {
        background-color: var(--ddd-theme-accent);
      }
      button:disabled {
        background-color: var(--ddd-theme-disabled);
        cursor: not-allowed;
      }
    `;
  }

  render() {
    return html`
      <confetti-container id="confetti">
        <div class="wrapper">
          <div class="${this._getCounterClass()}">${this.count}</div>
          <div class="buttons">
            <button @click="${this._decrement}" ?disabled="${this.count === this.min}">-</button>
            <button @click="${this._increment}" ?disabled="${this.count === this.max}">+</button>
          </div>
        </div>
      </confetti-container>
    `;
  }

  _getCounterClass() {
    if (this.count === 18) return 'counter counter-eighteen';
    if (this.count === 21) return 'counter counter-twentyone';
    if (this.count === this.min) return 'counter counter-min';
    if (this.count === this.max) return 'counter counter-max';
    return 'counter';
  }

  _increment() {
    if (this.count + this.step <= this.max) {
      this.count += this.step;
    } else {
      this.count = this.max;
    }
  }

  _decrement() {
    if (this.count - this.step >= this.min) {
      this.count -= this.step;
    } else {
      this.count = this.min;
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('count') && this.count === 21) {
      this.makeItRain();
    }
  }

  makeItRain() {
    import('@haxtheweb/multiple-choice/lib/confetti-container.js').then(() => {
      setTimeout(() => {
        this.shadowRoot.querySelector('#confetti').setAttribute('popped', '');
      }, 0);
    });
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

customElements.define('counter-app', CounterApp);

class Particle extends window.HTMLElement{
  constructor() {
    super()
  }
  set htmlTemplate(value) {
    this.phtmlTemplate = value;
  }
  set attrsObj(value) {
    this.pattrsObj = value;
  }
  static get observedAttributes() { return ["name", "other"]; }

  connectedCallback() {
    this._updateRendering();
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (this.pattrsObj[attrName]) {
      this.pattrsObj[attrName] = newValue;
      this._updateRendering();
    }
  }
  _updateRendering() {
    this.innerHTML = this.phtmlTemplate;
  }
}

function createParticle (customElementName, config) {
  Particle.prototype.attrsObj = config.attrs;
  Particle.prototype.htmlTemplate = config.htmlTemplate(config.attrs);
  const NBParticle = Particle;
  window.customElements.define(customElementName, NBParticle);
}

export default createParticle;
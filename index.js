/* eslint-disable no-underscore-dangle */
module.exports = {
  // By default global.driver is used, set altDriver to mock or be more explicit
  altDriver: null,

  driver: this.altDriver || global.driver,

  /**
   * Full response from the last succesful find* call
   * Cleared out on unsuccessful or empty result
   */
  findResponse: null,

  /**
   * ID/RuntimeId of the last succesful find* call
   * Cleared out on unsuccessful or empty result
   */
  ELEMENT: null,

  /**
   * Clears out the stored result for find* calls
   * @returns {void}
   */
  _clearFind() {
    this.ELEMENT = null;
    this.runtimeId = null;
  },

  /**
   * Internal method to process the response from find* calls
   * @param {String} el
   * @returns {Object} this
   */
  _processFind(el) {
    if (typeof el.ELEMENT === 'undefined') {
      this._clearFind();
      return this;
    }

    this.findResponse = el;
    this.ELEMENT = el.ELEMENT;

    return this;
  },

  /**
   * Find element by accessability id
   * AutomationId attribute in Windows
   * @param {String} id
   * @returns {Object} this
   */
  atmtn(id) {
    const el = driver.findElement('accessibility id', id);
    return this._processFind(el);
  },

  // Alias
  access: this.atmtn,

  /**
   * Find element by class name
   * ClassName attribute in Windows
   * @param {String} name
   * @returns {Object} this
   */
  class(className) {
    const el = this.driver.findElement('class name', className);
    return this._processFind(el);
  },

  /**
   * Find element by id
   * RuntimeId attribute in Windows
   * @param {String} id
   * @returns {Object} this
   */
  run(id) {
    const el = this.driver.findElement('id', id);
    return this._processFind(el);
  },

  // Alias
  id: this.run,

  /**
   * Find element by name
   * Name attribute in Windows
   * @param {String} name
   * @returns {Object} this
   */
  name(name) {
    const el = this.driver.findElement('name', name);
    return this._processFind(el);
  },

  /**
   * Find element by tag name
   * LocalizedControlType attribute in Windows
   * @param {String} tagName
   * @returns {Object} this
   */
  type(tagName) {
    const el = this.driver.findElement('tag name', tagName);
    return this._processFind(el);
  },

  // Alias
  tag: this.type,

  /**
   * Returns the value for the specified attribute
   * @param {String} attr
   * @returns {any} The attribute value
   */
  getAttribute(attr) {
    if (this.ELEMENT === null) {
      return null;
    }
    return this.driver.getElementAttribute(this.ELEMENT, attr);
  },

  /**
   * If a single element has been located, click it
   * @returns {Object} this
   */
  click() {
    if (!this.ELEMENT) {
      return null;
    }
    this.driver.elementClick(this.ELEMENT);
    return this;
  },
};

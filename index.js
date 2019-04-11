module.exports = fastDriver = {
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
  _clearFind: function () {
    this.ELEMENT = null;
    this.runtimeId = null;
  },

  /**
   * Internal method to process the response from find* calls
   * @param {String} el 
   * @returns {Object} this
   */
  _processFind: function (el) {
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
  auto: function (id) {
    const el = driver.findElement('accessibility id', id);
    return this._processFind(el);
  },

  /**
   * Find element by class name
   * ClassName attribute in Windows
   * @param {String} name
   * @returns {Object} this
   */
  class: function (className) {
    const el = this.driver.findElement('class name', className);
    return this._processFind(el);
  },

  /**
    * Find element by id
    * RuntimeId attribute in Windows
    * @param {String} id
    * @returns {Object} this
  */
  run: function (id) {
    const el = this.driver.findElement('id', id);
    return this._processFind(el);
  },

  /**
   * Find element by name
   * Name attribute in Windows
   * @param {String} name
   * @returns {Object} this
   */
  name: function (name) {
    const el = this.driver.findElement('name', name);
    return this._processFind(el);
  },

  /**
   * Find element by tag name
   * LocalizedControlType attribute in Windows
   * @param {String} tagName
   * @returns {Object} this
   */
  type: function (tagName) {
    const el = this.driver.findElement('tag name', tagName);
    return this._processFind(el);
  },

  /**
   * Returns the value for the specified attribute
   * @param {String} attr 
   * @returns {any} The attribute value
   */
  getAttribute: function (attr) {
    if (this.ELEMENT === null) { return; }
    return v = this.driver.getElementAttribute(this.ELEMENT);
  },

  /**
   * If a single element has been located, click it
   * @returns {Object} this
   */
  click: function () {
    if (!this.ELEMENT) { return; }
    this.driver.elementClick(this.ELEMENT);
    return this;
  },

};

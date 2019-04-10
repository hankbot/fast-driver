module.exports = {
  /**
   * Full response from the last succesful find* call
   * Cleared out on unsuccessful result
   */
  findResponse: null,

  /**
   * RuntimeId of the last succesful find* call
   * Cleared out on unsuccessful result
   */
  ELEMENT: null,

  clearElement: function () {
    this.ELEMENT = null;
    this.runtimeId = null;
  },

  /**
   * Internal method to process the response from find* calls
   * @param {String} el 
   */
  _processFind: function (el) {
    if (typeof el.ELEMENT === 'undefined') {
      this.clearElement();
      return this;
    }

    this.findResponse = el;
    this.ELEMENT = el.ELEMENT;

    return this;
  },

  /**
   * Find element by accessability id 
   * AutomationId attribute in Windows
   * @param {String} s 
   */
  auto: function (s) {
    const el = driver.findElement('accessibility id', s);
    return this._processFind(el);
  },

  // ClassName
  class: function (s) {
    driver.findElement('class name', s);
  },

  // RuntimeId
  run: function (s) {
    driver.findElement('id', s);
  },

  /**
   * Find element by name
   * Name attribute in Windows
   * @param {String} s
   */
  name: function (s) {
    const el = driver.findElement('name', s);
    return this._processFind(el);
  },

  // LocalizedControlType
  type: function (s) {
    driver.findElement('tag name', s);
  },

  getAttribute: function (element) {

  },

  click: function () {
    if (!this.ELEMENT) { return; }
    driver.elementClick(this.ELEMENT);
    return this;
  },

};

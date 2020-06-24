/**
 * @module M/plugin/WindroseControl
 */
import template from 'templates/windrose';
import WindroseControlImpl from 'impl/windrosecontrol';

export default class WindroseControl extends M.Control {
  /**
   * @classdesc
   * Main constructor of the class. Creates a windroseControl
   * control
   *
   * @constructor
   * @extends {M.Control}
   * @api stable
   */
  constructor(position) {
    // 1. checks if the implementation can create windroseControl
    if (M.utils.isUndefined(WindroseControlImpl)) {
      M.exception('La implementación usada no puede crear controles windroseControl');
    }
    // 2. implementation of this control
    const impl = new WindroseControlImpl(position);
    super(impl, 'Windrose');
  }

  /**
   * This function creates the view
   *
   * @public
   * @function
   * @param {M.Map} map to add the control
   * @api stable
   */
  createView(map) {
    return M.template.compileSync(template);
  }

  /**
   * This function compares controls
   *
   * @public
   * @function
   * @param {M.Control} control to compare
   * @api stable
   */
  equals(control) {
    return control instanceof WindroseControl;
  }
}

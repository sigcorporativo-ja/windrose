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
  constructor(position, size) {
    if (M.utils.isUndefined(WindroseControlImpl)) {
      M.exception('La implementación usada no puede crear controles windroseControl');
    }
    const impl = new WindroseControlImpl();
    super(impl, 'Windrose');

    /**
     * Position of the control
     *
     * @private
     * @type {string}
     */
    this.position_ = position;

    /**
     * Change rotation event identifier
     *
     * @private
     * @type {string}
     */
    this.evtKey_ = null;

    /**
     * Size of windrose
     *
     * @private
     * @type {number}
     */
    this.size_ = size || 100;
  }

  /**
   * This function creates the view
   *
   * @public
   * @function
   * @param {M.Map} map to add the control
   * @api
   */
  createView(map) {
    const html = M.template.compileSync(template);
    this.html_ = html;
    html.querySelector('img').style.width = `${this.size_}px`;

    this.setPosition(map);
    this.evtKey_ = map.on(M.evt.CHANGE_ROTATION, (rotation) => {
      html.style.transform = `rotate(${rotation}deg)`;
    });
    return html;
  }

  /**
   * This function sets the position of the control
   *
   * @public
   * @api
   */
  setPosition(map) {
    const { clientWidth, clientHeight } = map.getContainer();
    const CSS_POSITION = {
      TR: {
        left: `${clientWidth - this.size_}px`,
        top: '0',
      },
      TL: {
        left: '0',
        top: '0',
      },
      TC: {
        left: `${(clientWidth / 2) - (this.size_ / 2)}px`,
        top: '0',
      },
      BL: {
        left: '0',
        top: `${clientHeight - this.size_}px`,
      },
      BR: {
        left: `${clientWidth - this.size_}px`,
        top: `${clientHeight - this.size_}px`,
      },
      BC: {
        left: `${(clientWidth / 2) - (this.size_ / 2)}px`,
        top: `${clientHeight - this.size_}px`,
      },
      RC: {
        left: `${clientWidth - this.size_}px`,
        top: `${(clientHeight / 2) - (this.size_ / 2)}px`,
      },
      LC: {
        left: '0',
        top: `${(clientHeight / 2) - (this.size_ / 2)}px`,
      },
    };

    const { top, left } = CSS_POSITION[this.position_];
    this.html_.style.top = top;
    this.html_.style.left = left;
  }

  /**
   * This function compares controls
   *
   * @public
   * @function
   * @param {M.Control} control to compare
   * @api
   */
  equals(control) {
    return control instanceof WindroseControl;
  }

  /**
   * This functions destroy the control
   *
   * @public
   * @function
   * @api
   */
  destroy() {
    this.map_.unByKey(M.evt.CHANGE_ROTATION, this.evtKey_);
  }
}

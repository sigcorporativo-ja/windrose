/**
 * @module M/plugin/Windrose
 */
import 'assets/css/windrose';
import WindroseControl from './windrosecontrol';
import api from '../../api';

export default class Windrose extends M.Plugin {
  /**
   * @classdesc
   * Main facade plugin object. This class creates a plugin
   * object which has an implementation Object
   *
   * @constructor
   * @extends {M.Plugin}
   * @param {Object} impl implementation object
   * @api stable
   */
  constructor(options = {}) {
    super();

    /**
     * Facade of the map
     * @private
     * @type {M.Map}
     */
    this.map_ = null;

    /**
     * Array of controls
     * @private
     * @type {Array<M.Control>}
     */
    this.controls_ = [];

    /**
     * Class name of the html view Plugin
     * @type {string}
     */
    this.className = 'm-plugin-windrose';

    /**
     * Position of the Plugin
     * Posible values: TR | TL | TC| BL | BR | BC | RC | LC
     * @type {Enum}
     */
    const positions = ['TR', 'TL', 'TC', 'BL', 'BR', 'BC', 'RC', 'LC'];
    this.position = positions.includes(options.position) ? options.position : 'BC';

    /**
     * Metadata from api.json
     * @private
     * @type {Object}
     */
    this.metadata_ = api.metadata;
  }

  /**
   * This function adds this plugin into the map
   *
   * @public
   * @function
   * @param {M.Map} map the map to add the plugin
   * @api stable
   */
  addTo(map) {
    map.getMapImpl().removeEventListener('postcompose');
    this.control_ = new WindroseControl(this.position);
    this.controls_.push(this.control_);
    this.map_ = map;
    map.addControls(this.controls_);
  }

  /**
   * This function destroys this plugin
   *
   * @public
   * @function
   * @api stable
   */
  destroy() {
    this.map_.getMapImpl().removeEventListener('postcompose');
    this.map_.removeControls([this.control_]);

    // Force the map to remove the imagen windrose
    setTimeout(() => {
      const resolution = this.map_.getMapImpl().getView().getResolution();
      this.map_.getMapImpl().getView().setResolution(resolution - 0.000001);
      [this.controls_, this.map_] = [null, null];
    }, 500);
  }

  /**
   * This function return the control of plugin
   *
   * @public
   * @function
   * @api stable
   */
  getControls() {
    const aControl = [];
    aControl.push(this.controls_);
    return aControl;
  }

  /**
   * @getter
   * @public
   */
  get name() {
    return 'windrose';
  }

  /**
   * This function gets metadata plugin
   *
   * @public
   * @function
   * @api stable
   */
  getMetadata() {
    return this.metadata_;
  }
}

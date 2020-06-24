import imageSrc from './imagesrc';

/**
 * @module M/impl/control/MapEffectsControl
 */
export default class WindroseControlImpl extends M.impl.Control {
  /**
   * @classdesc
   * Main constructor of the class. Creates a WindroseControlImpl
   * control
   *
   * @constructor
   * @extends {M.impl.Control}
   * @api stable
   */
  constructor(position) {
    super();
    this.position = position;
  }

  /**
   * This function adds the control to the specified map
   *
   * @public
   * @function
   * @param {M.Map} map to add the plugin
   * @param {HTMLElement} html of the plugin
   * @api stable
   */
  addTo(map, html) {
    // super addTo - don't delete
    super.addTo(map, html);
    const olMap = map.getMapImpl();

    this.addEventListener(olMap);
  }

  addEventListener(olMap) {
    olMap.on('postcompose', e => this.drawWindRose(e));

    // Force the first postcompose
    setTimeout(() => {
      const resolution = olMap.getView().getResolution();
      olMap.getView().setResolution(resolution - 0.000001);
    }, 500);
  }

  drawWindRose(e) {
    const ctx = e.context;
    const image = new Image();
    image.src = imageSrc;
    const { canvas } = ctx;
    const olMap = e.target;
    const angle = olMap.getView().getRotation();
    const x = canvas.width;
    const y = canvas.height;
    const width = 100;
    const height = 100;
    let dX;
    let dY;

    switch (this.position) {
      case 'TR':
        dX = 50;
        dY = y - 50;
        break;
      case 'TL':
        dX = x - 50;
        dY = y - 50;
        break;
      case 'TC':
        dX = (x / 2);
        dY = y - 50;
        break;
      case 'BR':
        dX = 50;
        dY = 50;
        break;
      case 'BL':
        dX = x - 50;
        dY = 50;
        break;
      case 'BC':
        dX = (x / 2);
        dY = 50;
        break;
      case 'RC':
        dX = 50;
        dY = (y / 2);
        break;
      case 'LC':
        dX = x - 50;
        dY = (y / 2);
        break;
      default: // BC
        dX = (x / 2);
        dY = 50;
        break;
    }

    ctx.translate(x - dX, y - dY);
    ctx.rotate(angle);
    ctx.drawImage(image, -width / 2, -height / 2, width, height);
    ctx.rotate(-angle);
    ctx.translate(-x + dX, -y + dY);
  }
}

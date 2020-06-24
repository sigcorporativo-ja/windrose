import Windrose from 'facade/windrose';

const map = M.map({
  container: 'mapjs',
  controls: 'layerswitcher',
});

const mp = new Windrose({ position: 'TC' });

map.addPlugin(mp);
window.map = map;

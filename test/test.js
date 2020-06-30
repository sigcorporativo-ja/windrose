import Windrose from 'facade/windrose';

const map = M.map({
  container: 'mapjs'
});

const mp = new Windrose({ position: 'TC' });

map.addPlugin(mp);
window.map = map;

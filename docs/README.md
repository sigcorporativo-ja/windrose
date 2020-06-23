# M.plugin.Windrose

Plugin que incorpora una rosa de vientos que se desplaza y gira con el mapa.

![Imagen1](./img/windRose_1.png)


## Dependencias

- windrose.ol.min.js
- windrose.ol.min.css


```html
 <link href="../../plugins/windrose/windrose.ol.min.css" rel="stylesheet" />
 <script type="text/javascript" src="../../plugins/windrose/windrose.ol.min.js"></script>
```

## Parámetros

- El constructor se inicializa con un JSON de options con los siguientes atributos:

- **position**. Indica la posición donde se mostrará el plugin
  - 'TL':top left (default)
  - 'TR':top right
  - 'TC':top center
  - 'BL':bottom left
  - 'BR':bottom right
  - 'BC':bottom center
  - 'RC':right center
  - 'LC':left center

## Eventos

- **windrose:postcompose**
  - Evento que se dispara cuando movemos o giramos el mapa.
  - El método que dispara se encarga de dibujar la rosa de vientos en el lugar y el ángulo correcto.

```javascript
olMap.on('postcompose', e => this.drawWindRose(e));
```

## Otros métodos


## Ejemplos de uso

### Ejemplo 1
```javascript
  const map = M.map({
    container: 'map'
  });

  const mp = new M.plugin.Windrose({
    position: 'TC',
  });

  map.addPlugin(mp);
```

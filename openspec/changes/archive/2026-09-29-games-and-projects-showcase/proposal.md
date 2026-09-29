# Escaparate de Juegos y Proyectos

## Por qué

Las dos secciones que un estudio abre primero son las que menos trabajo de
presentación tienen. Juegos y Proyectos siguen siendo rejillas de tarjetas
planas heredadas de la plantilla, mientras que el resto del sitio ya tiene
paleta propia, tipografía propia y sistema de movimiento.

Tres problemas concretos, medidos sobre el código actual:

1. **Las imágenes se deforman.** `Projects.astro` renderiza
   `<img class="w-full h-48">` sin `object-cover`, así que toda captura cuya
   proporción no sea exactamente la de la caja sale estirada o aplastada.
   En `PostCard.astro` ocurre lo contrario: la imagen no lleva proporción fija,
   de modo que cada tarjeta mide distinto y la rejilla queda irregular.

2. **Los datos están atrapados en prosa.** Cada descripción de juego termina en
   un paréntesis del tipo `(Team of 4, 24 weeks)`. Género, motor, rol, tamaño de
   equipo y duración existen, pero como texto corrido, así que no se pueden
   mostrar como ficha ni filtrar ni destacar.

3. **El detalle es una página de blog, no la ficha de un juego.** Se entra y lo
   primero es un iframe de YouTube, que además se monta siempre: alrededor de
   500 KB y cookies de terceros en cada visita, la reproduzca alguien o no.

Además hay un componente huérfano: `BlogHero.astro` existe pero no lo importa
nadie, porque `blog/index.astro` lleva su propia cabecera escrita a mano.

## Qué cambia

### Datos

- Género, motor, rol, equipo, duración y año pasan a campos propios del
  *frontmatter*, fuera del texto descriptivo.
- Campo `videoPreview` opcional, preparado para los clips cortos que Nahuel
  grabará más adelante. La rejilla lo usará si existe y seguirá funcionando
  igual si no.

### Rejilla

- Composición tipo *bento*: la entrada destacada ocupa dos columnas.
- Proporción fija en las imágenes, que es lo que arregla la rejilla irregular.
- Al pasar el puntero: zoom lento sobre la imagen, foco que sigue al cursor y
  una inclinación 3D sutil.
- Ficha técnica visible en la propia tarjeta.

### Detalle

- Portada a sangre con degradado hacia el fondo, título encima.
- La imagen y el título viajan desde la tarjeta mediante transiciones de vista.
- Ficha técnica en fila bajo el título.
- El vídeo pasa a cargarse con fachada: miniatura más botón de reproducción, y
  el iframe solo se crea al pulsar.
- Navegación anterior/siguiente con miniatura.

### Proyectos

- Mismo lenguaje visual que Juegos.
- Corregido el recorte de imágenes.

### Fondo del hero

- Fondo generativo en WebGL como alternativa al vídeo, escrito sin librería:
  un *quad* a pantalla completa con un *fragment shader*.
- Se implementa como capa comparable con el vídeo, no como sustitución
  automática. Nahuel decide cuál se queda tras verlos en local.

## Qué NO cambia

- La paleta, la tipografía y los tokens de movimiento fijados en changes
  anteriores.
- La infraestructura de i18n: todo texto nuevo entra por los diccionarios.
- El contenido de los posts. Solo se reorganiza su *frontmatter*.
- El vídeo del hero no se elimina en este change.

## Riesgos

- **Peso del WebGL.** Un *fragment shader* sobre WebGL crudo ronda los 4 KB,
  frente a los ~150 KB de Three.js. Si el alcance se desliza hacia escenas con
  cámara y modelos, el coste se dispara y habría que replantearlo.
- **Batería en móvil.** Un *shader* animado a pantalla completa consume más que
  un vídeo si no se limita. Hay que pausarlo fuera de pantalla y respetar
  `prefers-reduced-motion`.
- **Migración del *frontmatter*.** Son catorce archivos, siete por idioma. Un
  campo mal escrito rompe el esquema de la colección y con él el build.
- **Exceso de efectos.** Foco, inclinación, zoom y transición pueden sumar hasta
  resultar mareantes. Conviene revisar el conjunto, no cada efecto por separado.

## Dependencias

Requiere `visual-refresh` completado, del que hereda los tokens de movimiento,
la paleta y `<ClientRouter />`, que es lo que hace posible el efecto de
transición entre tarjeta y detalle sin JavaScript propio.

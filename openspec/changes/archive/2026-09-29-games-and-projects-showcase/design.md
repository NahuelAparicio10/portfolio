# Diseño — Escaparate de Juegos y Proyectos

## 1. Esquema de datos

### Situación

Cada entrada guarda su información real dentro del texto:

```
'3D survivor hack-and-slash built in Unity. Gameplay programmer,
 UI programmer and designer. (Team of 4, 24 weeks)'
   └── género ──┘  └ motor ┘  └────── rol ──────┘   └─ equipo ─┘ └ duración ┘
```

Es el mismo defecto que tenía la línea temporal antes de añadirle `period`: un
dato viviendo como prosa. No se puede mostrar como ficha, ni alinear entre
tarjetas, ni ordenar.

### Campos nuevos

```yaml
genre: '3D survivor hack-and-slash'
engine: 'Unity'
role: ['Gameplay Programmer', 'UI Programmer', 'Designer']
team: 'Team of 4'          # o 'Solo'
duration: '24 weeks'
videoPreview: undefined     # ruta a un clip corto, opcional
```

Todos opcionales, de modo que la migración puede hacerse entrada a entrada sin
romper el build a medio camino. `description` se queda solo con la frase.

`year` no se añade: ya se deriva de `pubDate`, y duplicarlo invita a que ambos
se desincronicen.

### Sobre `videoPreview`

Nahuel grabará los clips más adelante. El campo se define ahora para que
añadirlos después sea rellenar un valor, no rehacer la tarjeta. La rejilla
comprueba su existencia y, si falta, se queda con la imagen. Nada de rutas
adivinadas por convención: un archivo que no existe daría un 404 silencioso.

## 2. Rejilla

### Composición

```
┌───────────────────────────────┬───────────────┐
│                               │               │
│   DESTACADO (2 columnas)      │    juego      │
│                               │               │
├───────────────┬───────────────┼───────────────┤
│    juego      │    juego      │    juego      │
└───────────────┴───────────────┴───────────────┘
```

Rompe la monotonía de la cuadrícula uniforme y da jerarquía sin necesidad de la
etiqueta «★ Featured» actual, que es un parche visual para un problema de
composición.

### Proporción fija

`aspect-ratio: 16 / 9` más `object-fit: cover` en todas las portadas. Es lo que
arregla las alturas desiguales de la rejilla actual, y de paso el estirado de
las capturas en Proyectos.

### Efectos al pasar el puntero

| Efecto | Implementación | Coste |
|---|---|---|
| Zoom lento | `transform: scale(1.06)` sobre la imagen | 0 KB |
| Foco | Gradiente radial posicionado con variables CSS | ~0,4 KB |
| Inclinación | `rotateX/rotateY` según posición del puntero | ~0,5 KB |
| Entrada de texto | `translateY` sobre título y ficha | 0 KB |

El foco y la inclinación comparten un único listener delegado en el contenedor
de la rejilla, no uno por tarjeta. Con siete juegos la diferencia es
irrelevante, pero un listener por elemento es un mal hábito que luego se copia.

**Táctil no tiene puntero**, así que estos efectos son adorno en escritorio y
nada más. La tarjeta debe leerse completa sin ellos: ficha técnica y título
visibles siempre, nunca revelados solo al pasar.

## 3. Transición entre tarjeta y detalle

La pieza de mayor impacto y de menor coste, porque `<ClientRouter />` ya está
puesto desde `visual-refresh`.

```
   REJILLA                         DETALLE
┌──────────┐                  ┌─────────────────────┐
│ ▓▓▓▓▓▓▓▓ │ ─── clic ──▶     │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│  EDEN    │                  │        EDEN         │
└──────────┘                  └─────────────────────┘

transition:name={`cover-${post.id}`}
transition:name={`title-${post.id}`}
```

Astro interpola posición y tamaño entre las dos páginas. No hay JavaScript
propio ni librería. El nombre debe ser único por entrada y coincidir en ambos
lados, así que se deriva del identificador del post.

Los navegadores sin View Transitions API simplemente navegan como siempre. Es
una mejora progresiva, no un requisito.

## 4. Detalle

```
┌───────────────────────────────────────────────┐
│   portada a sangre (morph desde la tarjeta)   │
│   ░░░ degradado hacia el fondo navy ░░░       │
│              BLADE BOUNTY                     │
│         3D survivor hack-and-slash            │
├───────────────────────────────────────────────┤
│  2024 · Unity · Team of 4 · 24 weeks · PC     │
│  Gameplay Programmer · UI Programmer          │
├───────────────────────────────────────────────┤
│              [ ▶ vídeo ]                      │
│              prosa del post                   │
├───────────────────────────────────────────────┤
│  ← anterior          siguiente →              │
└───────────────────────────────────────────────┘
```

### Fachada de vídeo

Hoy el iframe de YouTube se monta al cargar la página. Eso son alrededor de
500 KB de reproductor y cookies de terceros en cada visita, la reproduzca
alguien o no.

Con fachada se muestra la miniatura y un botón de reproducción, y el iframe se
crea al pulsar. Se ve igual, y quien no reproduce no paga nada.

Detalle importante: la miniatura debe servirse desde el propio sitio, no desde
`img.youtube.com`. Traerla de un dominio de Google reintroduce por la puerta de
atrás el rastreo que la fachada viene a evitar.

## 5. Fondo generativo del hero

### Alternativas

| Opción | Peso | Valoración |
|---|---|---|
| Three.js | ~150 KB gzip | Descartada: escena, cámara y luces que no se usan |
| OGL | ~10 KB gzip | Descartada: sigue siendo una abstracción innecesaria |
| **WebGL crudo** | **~4 KB** | **Elegida** |
| CSS puro | 0 KB | Descartada: no llega al nivel buscado |

Un *quad* a pantalla completa con un *fragment shader* son unas cien líneas de
JavaScript; el resto es GLSL.

El argumento de fondo no es el peso, es la coherencia: Nahuel escribe *shaders*
profesionalmente, en HLSL y Shader Graph sobre URP. Un *shader* suyo en el hero
no es decoración, es una muestra de trabajo.

### Comparación con el vídeo

```
Vídeo actual        769 KB
Shader               ~4 KB      (−99,5 %)
```

El *shader* además se adapta a cualquier proporción sin recortes y puede
reaccionar al puntero o al scroll, cosa que un vídeo no hace.

**No se sustituye automáticamente.** Se implementa como capa comparable y Nahuel
decide tras verlos en local. Si el vídeo se queda, el *shader* se reutiliza en
otra sección.

### Requisitos no negociables

- Pausar el bucle de render cuando el hero sale de pantalla. Un `requestAnimationFrame`
  corriendo sobre contenido invisible es batería tirada.
- Respetar `prefers-reduced-motion`: imagen estática.
- Reserva si falla la creación del contexto WebGL. Sin contexto, se muestra el
  póster, nunca un hueco negro.
- Limitar la resolución del lienzo por `devicePixelRatio`. Renderizar a 3x en un
  móvil de gama alta calienta el dispositivo sin ganancia visible.

### Direcciones

| Idea | Encaja con |
|---|---|
| Malla en perspectiva con ondas | Lo técnico, retrofuturista |
| Partículas que reaccionan al puntero | Vivo, cercano al *game feel* |
| Nebulosa de ruido con flujo lento | Sobrio, no compite con el texto |

Pendiente de decisión de Nahuel, con comparador visual previo.

## 6. Componente huérfano

`BlogHero.astro` no lo importa nadie: `blog/index.astro` lleva su cabecera
escrita a mano. O se adopta como cabecera de las dos secciones, o se borra.
Mantener un componente que nadie usa es deuda que alguien acabará copiando.

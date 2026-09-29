# Tareas — Escaparate de Juegos y Proyectos

> Requiere `visual-refresh` completado.

## 0. Decisiones

- [x] Clips de previsualización: Nahuel los grabará más adelante. Se deja el
      campo preparado y la rejilla funciona sin ellos
- [x] Detalle: composición cinematográfica, portada primero y vídeo después
- [x] Metadatos: se extraen del texto a campos propios del *frontmatter*
- [x] 3D: interesa. WebGL crudo con *fragment shader*, sin librería
- [x] **Shader elegido**: combinación de malla en perspectiva y partículas
      reactivas, buscando un resultado visual y masivo. Se implementan como un
      único *fragment shader*, no dos capas: dos contextos WebGL duplicarían el
      coste sin ganar nada
- [ ] **Nahuel**: tras verlo en local, decidir si el *shader* sustituye al vídeo
- [ ] **Nahuel**: revisar los textos de género y rol de las catorce entradas

## 1. Esquema de datos

- [x] Añadir a `content.config.ts`: `genre`, `engine`, `role`, `team`,
      `duration`, `videoPreview`, todos opcionales
- [x] Migrar las 7 entradas de `content/blog`
- [x] Migrar las 7 entradas de `content/es`
- [x] Limpiar las descripciones: quitar los datos entre paréntesis
- [x] Añadir los mismos campos a `data/projects.ts`
- [x] Verificar que el build pasa con entradas a medio migrar (campos opcionales)

## 2. Corrección de imágenes

- [x] `Projects.astro`: añadir `object-cover` (hoy las capturas se deforman)
- [x] `PostCard.astro`: proporción fija en la portada
- [x] Verificar que ninguna imagen aparece estirada en ninguna de las dos rejillas
- [x] Verificar que las tarjetas de una misma fila miden igual

## 3. Rejilla

- [x] Composición *bento*: la entrada destacada ocupa dos columnas
- [x] Retirar la etiqueta «★ Featured», que la composición ya sustituye
- [x] Ficha técnica visible en la tarjeta
- [x] Zoom sobre la imagen al pasar el puntero
- [x] Foco que sigue al cursor, con un único listener delegado en la rejilla
- [x] Inclinación 3D sutil
- [x] Verificar que el título y la ficha son visibles sin interactuar
- [x] Verificar comportamiento en táctil
- [x] Respetar `prefers-reduced-motion`
- [x] Aplicar el mismo tratamiento a Proyectos

## 4. Previsualización en vídeo

- [x] Soporte del campo `videoPreview` en la tarjeta
- [x] Reproducir en silencio y en bucle al pasar el puntero
- [x] No descargar nada mientras no se necesite
- [x] Verificar que una entrada sin clip no genera peticiones

## 5. Transición entre rejilla y detalle

- [x] `transition:name` único por entrada en portada y título
- [x] Verificar la continuidad visual al navegar
- [x] Verificar que un navegador sin soporte navega igualmente
- [x] Verificar que con movimiento reducido no anima

## 6. Detalle

- [x] Portada a sangre con degradado hacia el fondo
- [x] Título y género sobre la portada, con contraste garantizado
- [x] Fila de ficha técnica bajo el título
- [x] Roles diferenciados de los datos de producción
- [x] Fachada de vídeo: miniatura más botón, iframe solo al pulsar
- [x] Generar las miniaturas y servirlas desde el propio sitio, no desde Google
- [x] Fachada accesible por teclado
- [x] Navegación anterior/siguiente con miniatura
- [x] Verificar que la navegación entre fichas respeta el idioma

## 7. Fondo generativo del hero

- [x] Comparador de direcciones de *shader* para que Nahuel elija
      (la dirección ya quedó fijada en la decisión 5; el comparador es
      *shader* frente a vídeo en el mismo hero: `?hero=shader` / `?hero=video`)
- [x] Implementar el *quad* a pantalla completa en WebGL crudo
- [x] Escribir el *fragment shader* de la dirección elegida
- [x] Detener el bucle cuando el hero sale de pantalla
- [x] Detener el bucle cuando la pestaña pasa a segundo plano
- [x] Limitar la resolución del lienzo por `devicePixelRatio`
- [x] Reserva a póster si no hay contexto WebGL
- [x] Respetar `prefers-reduced-motion`
- [x] Medir el peso: objetivo por debajo de 8 KB comprimidos
- [ ] Comparar con el vídeo en local y decidir cuál se queda

## 8. Limpieza

- [x] `BlogHero.astro`: adoptarlo como cabecera de ambas secciones o borrarlo.
      Hoy no lo importa nadie
- [x] Extraer la cabecera inline de `blog/index.astro`
- [x] Textos nuevos a los diccionarios de i18n, nunca incrustados

## 9. Verificación

- [x] `npm run build` sin errores ni warnings
- [x] Recorrer las dos rejillas y las catorce fichas en ambos idiomas
- [x] Comprobar que no hay peticiones a dominios de Google sin pulsar reproducir
- [ ] Lighthouse en móvil y escritorio
- [x] Probar con `prefers-reduced-motion` activado
- [x] Probar sin JavaScript
- [x] Navegación completa por teclado
- [ ] Revisar consumo de batería con el fondo generativo en un móvil real
- [ ] Revisión final del conjunto: retirar lo que resulte excesivo

## 10. Ajustes tras la primera revisión de Nahuel

- [x] Quitar el bloque «Project Info» de las catorce entradas: la fila de ficha
      técnica del detalle ya muestra esos datos
- [x] Destacados distinguibles: fila propia (3 + 3 de 6 columnas, nunca junto a
      una tarjeta normal), marco de acento encendido en reposo y etiqueta
      «Destacado». Revierte la retirada de la etiqueta del apartado 3: la
      composición sola no bastaba
- [x] Campo `dimension` (`2D` | `3D`) en el esquema, las catorce entradas y
      `projects.ts`, con insignia en tarjeta y detalle (color e icono distintos)
- [x] Negritas del texto con subrayado de marcador que se dibuja al entrar en
      pantalla y se rellena al pasar el puntero; excluidas las de los títulos
- [x] Pills de contribuciones como componente `ContributionPills` (antes JSX
      duplicado en catorce archivos), con entrada escalonada y respuesta al puntero
- [x] Pills de las tarjetas con respuesta individual al puntero y ola al pasar
      sobre la tarjeta
- [x] Verificado: build limpio, catorce fichas sin errores, sin JS y con
      movimiento reducido el contenido se ve completo

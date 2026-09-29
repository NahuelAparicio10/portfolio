# showcase-grid

## ADDED Requirements

### Requirement: Imágenes con proporción estable

Las portadas SHALL mantener su proporción y recortarse en lugar de deformarse.

#### Scenario: capturas de proporciones distintas

- **WHEN** se muestran entradas cuyas imágenes tienen proporciones diferentes
- **THEN** todas se renderizan con la misma proporción
- **AND** ninguna aparece estirada ni aplastada

#### Scenario: altura uniforme de la rejilla

- **WHEN** se recorre una fila de tarjetas
- **THEN** todas tienen la misma altura

### Requirement: Ficha técnica en la tarjeta

Cada tarjeta SHALL mostrar los datos de producción como campos, no embebidos en
el texto descriptivo.

#### Scenario: datos visibles

- **WHEN** un visitante mira una tarjeta de juego
- **THEN** puede leer motor, tamaño de equipo y duración sin abrir el detalle

#### Scenario: descripción limpia

- **WHEN** se lee el texto descriptivo de una entrada
- **THEN** no contiene los datos de producción entre paréntesis

#### Scenario: campos ausentes

- **WHEN** una entrada no define alguno de los campos opcionales
- **THEN** la tarjeta se renderiza sin ese dato y sin huecos vacíos

### Requirement: Jerarquía visual en la rejilla

La rejilla SHALL dar más peso a las entradas destacadas mediante la composición.

#### Scenario: entrada destacada

- **WHEN** una entrada está marcada como destacada
- **THEN** ocupa más espacio en la rejilla que las demás

#### Scenario: una sola columna en móvil

- **WHEN** la rejilla se muestra en un viewport estrecho
- **THEN** todas las entradas ocupan el ancho completo

### Requirement: Respuesta al puntero

Las tarjetas SHALL responder al puntero sin que la información dependa de ello.

#### Scenario: puntero sobre una tarjeta

- **WHEN** el puntero entra en una tarjeta
- **THEN** la imagen se amplía suavemente
- **AND** aparece un realce que sigue la posición del puntero

#### Scenario: la información no se esconde

- **WHEN** se mira una tarjeta sin interactuar con ella
- **THEN** el título y la ficha técnica ya son visibles

#### Scenario: dispositivo táctil

- **WHEN** la rejilla se usa en un dispositivo sin puntero
- **THEN** toda la información sigue siendo accesible
- **AND** pulsar una tarjeta navega a su detalle

#### Scenario: movimiento reducido

- **WHEN** el visitante prefiere movimiento reducido
- **THEN** no se aplican zoom ni inclinación

### Requirement: Previsualización en vídeo opcional

La rejilla SHALL admitir un clip de previsualización por entrada, sin requerirlo.

#### Scenario: entrada sin clip

- **WHEN** una entrada no tiene clip asociado
- **THEN** la tarjeta muestra la imagen estática
- **AND** no se solicita ningún archivo de vídeo

#### Scenario: entrada con clip

- **WHEN** una entrada tiene clip y el puntero entra en la tarjeta
- **THEN** el clip se reproduce en silencio y en bucle

#### Scenario: coste de la reproducción

- **WHEN** se carga la página de la rejilla
- **THEN** ningún clip se descarga hasta que se necesita

### Requirement: Coherencia entre Juegos y Proyectos

Ambas secciones SHALL compartir el mismo lenguaje visual.

#### Scenario: comparación entre secciones

- **WHEN** se comparan la rejilla de Juegos y la de Proyectos
- **THEN** usan el mismo tratamiento de tarjeta, imagen y respuesta al puntero

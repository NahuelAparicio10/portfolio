# showcase-detail

## ADDED Requirements

### Requirement: Portada cinematográfica

La página de detalle SHALL abrir con una portada a sangre en lugar de un
reproductor incrustado.

#### Scenario: entrada al detalle

- **WHEN** un visitante abre la ficha de un juego
- **THEN** lo primero que ve es la imagen de portada con el título encima

#### Scenario: legibilidad del título

- **WHEN** el título se superpone a la portada
- **THEN** mantiene contraste suficiente sobre cualquier zona de la imagen

### Requirement: Continuidad entre rejilla y detalle

La navegación desde una tarjeta SHALL dar continuidad visual al elemento pulsado.

#### Scenario: navegación desde la tarjeta

- **WHEN** se pulsa una tarjeta de la rejilla
- **THEN** su imagen se transforma hasta la portada del detalle

#### Scenario: navegador sin soporte

- **WHEN** el navegador no admite transiciones de vista
- **THEN** la navegación se completa igualmente

#### Scenario: movimiento reducido

- **WHEN** el visitante prefiere movimiento reducido
- **THEN** la navegación no anima

### Requirement: Ficha técnica en el detalle

El detalle SHALL presentar los datos de producción como una fila de campos.

#### Scenario: datos de producción

- **WHEN** se consulta la ficha de un juego
- **THEN** muestra año, motor, equipo, duración y plataformas como campos

#### Scenario: rol desempeñado

- **WHEN** una entrada declara los roles
- **THEN** se muestran de forma diferenciada de los datos de producción

### Requirement: Vídeo cargado bajo demanda

El reproductor de vídeo SHALL crearse solo cuando el visitante decide verlo.

#### Scenario: visita sin reproducir

- **WHEN** se carga una ficha con vídeo y no se pulsa reproducir
- **THEN** no se solicita el reproductor externo
- **AND** no se establecen cookies de terceros

#### Scenario: al pulsar reproducir

- **WHEN** el visitante pulsa el control de reproducción
- **THEN** el reproductor se carga y comienza la reproducción

#### Scenario: miniatura de la fachada

- **WHEN** se muestra la fachada del vídeo
- **THEN** su imagen se sirve desde el propio sitio

#### Scenario: acceso por teclado

- **WHEN** se navega con el teclado hasta la fachada
- **THEN** puede activarse igual que con el puntero

### Requirement: Navegación entre fichas

El detalle SHALL ofrecer navegación a las entradas contigua anterior y siguiente.

#### Scenario: enlaces contiguos

- **WHEN** se llega al final de una ficha
- **THEN** hay enlaces a la entrada anterior y a la siguiente, con su título

#### Scenario: primera y última entrada

- **WHEN** la ficha es la primera o la última
- **THEN** solo se ofrece el enlace que existe

#### Scenario: idioma correcto

- **WHEN** se navega entre fichas en español
- **THEN** los destinos son las fichas españolas

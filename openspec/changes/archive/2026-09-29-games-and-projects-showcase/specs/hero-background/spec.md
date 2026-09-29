# hero-background

## ADDED Requirements

### Requirement: Fondo generativo sin librería

El fondo animado del hero SHALL implementarse sobre WebGL sin dependencias de
terceros.

#### Scenario: coste del fondo

- **WHEN** se mide el JavaScript añadido por el fondo generativo
- **THEN** se mantiene por debajo de 8 KB comprimidos

#### Scenario: sin dependencias nuevas

- **WHEN** se revisan las dependencias del proyecto
- **THEN** no se ha añadido ninguna librería de gráficos

### Requirement: Reserva ante fallo o falta de soporte

El hero SHALL mostrar contenido válido aunque el fondo generativo no pueda
ejecutarse.

#### Scenario: sin contexto WebGL

- **WHEN** el navegador no concede un contexto WebGL
- **THEN** se muestra la imagen de póster en su lugar

#### Scenario: sin JavaScript

- **WHEN** se carga la página sin JavaScript
- **THEN** el hero muestra contenido de fondo y el titular permanece legible

#### Scenario: legibilidad del titular

- **WHEN** el fondo generativo está activo
- **THEN** el titular y los botones mantienen contraste suficiente

### Requirement: Consumo controlado

El bucle de render SHALL detenerse cuando no aporta nada.

#### Scenario: hero fuera de pantalla

- **WHEN** el hero deja de ser visible al hacer scroll
- **THEN** el bucle de render se detiene

#### Scenario: pestaña en segundo plano

- **WHEN** la pestaña deja de estar visible
- **THEN** el bucle de render se detiene

#### Scenario: resolución en pantallas densas

- **WHEN** se renderiza en una pantalla de alta densidad
- **THEN** la resolución del lienzo se limita en lugar de escalar sin tope

#### Scenario: movimiento reducido

- **WHEN** el visitante prefiere movimiento reducido
- **THEN** no se ejecuta el fondo animado
- **AND** se muestra la imagen estática

### Requirement: Decisión sobre el vídeo existente

El fondo generativo SHALL implementarse como alternativa comparable al vídeo,
sin retirarlo en este cambio.

#### Scenario: comparación posible

- **WHEN** se ha implementado el fondo generativo
- **THEN** puede compararse con el vídeo en la misma composición del hero

#### Scenario: el vídeo sigue disponible

- **WHEN** finaliza este cambio
- **THEN** el vídeo del hero sigue existiendo y siendo utilizable

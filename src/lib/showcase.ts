/**
 * Pointer effects for the Games and Projects grids.
 *
 * One delegated listener per grid, not one per card: the grid resolves which
 * card the pointer is over and writes CSS variables on it. With seven cards the
 * cost difference is irrelevant, but a listener per element is a habit that
 * gets copied into places where it does matter.
 *
 * Everything here is decoration. Cards render complete without it, which is
 * what touch devices and no-JS visitors get.
 */

const GRID_SELECTOR = '[data-showcase-grid]';
const CARD_SELECTOR = '[data-showcase-card]';
const PREVIEWING_CLASS = 'is-previewing';

/** Kept small on purpose: past a few degrees the card reads as wobbly. */
const MAX_TILT_DEG = 4;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function startPreview(card: HTMLElement): void {
  const video = card.querySelector<HTMLVideoElement>('video[data-src]');
  if (!video) return;

  // The source is attached on first hover only, so a visit that never hovers
  // a card downloads no clip at all.
  if (!video.getAttribute('src')) {
    video.src = video.dataset.src ?? '';
  }
  video.play().then(
    () => card.classList.add(PREVIEWING_CLASS),
    // Autoplay can still be refused (data saver, power saving). The still
    // image is already showing, so there is nothing to recover.
    () => {},
  );
}

function stopPreview(card: HTMLElement): void {
  const video = card.querySelector<HTMLVideoElement>('video[data-src]');
  card.classList.remove(PREVIEWING_CLASS);
  if (!video || !video.getAttribute('src')) return;
  video.pause();
  video.currentTime = 0;
}

function resetCard(card: HTMLElement): void {
  card.style.removeProperty('--tilt-x');
  card.style.removeProperty('--tilt-y');
}

function bindGrid(grid: HTMLElement, allowMotion: boolean): void {
  let activeCard: HTMLElement | null = null;
  let pendingEvent: PointerEvent | null = null;
  let frame = 0;

  const leave = () => {
    if (!activeCard) return;
    resetCard(activeCard);
    if (allowMotion) stopPreview(activeCard);
    activeCard = null;
  };

  // Batched to one write per frame: pointermove fires far more often than the
  // screen refreshes.
  const apply = () => {
    frame = 0;
    if (!activeCard || !pendingEvent) return;

    const rect = activeCard.getBoundingClientRect();
    const x = (pendingEvent.clientX - rect.left) / rect.width;
    const y = (pendingEvent.clientY - rect.top) / rect.height;

    activeCard.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
    activeCard.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);

    if (allowMotion) {
      activeCard.style.setProperty('--tilt-x', `${((0.5 - y) * 2 * MAX_TILT_DEG).toFixed(2)}deg`);
      activeCard.style.setProperty('--tilt-y', `${((x - 0.5) * 2 * MAX_TILT_DEG).toFixed(2)}deg`);
    }
  };

  grid.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;

    const card = (event.target as Element).closest<HTMLElement>(CARD_SELECTOR);
    if (card !== activeCard) {
      leave();
      activeCard = card;
      if (card && allowMotion) startPreview(card);
    }
    if (!activeCard) return;

    pendingEvent = event;
    if (!frame) frame = requestAnimationFrame(apply);
  });

  grid.addEventListener('pointerleave', leave);
}

export function initShowcase(root: ParentNode = document): void {
  // Touch has no hover: effects driven by pointer position would only fire
  // mid-tap and fight scrolling. initTouchSpotlight() covers touch instead.
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const allowMotion = !prefersReducedMotion();
  const grids = root.querySelectorAll<HTMLElement>(GRID_SELECTOR);

  for (const grid of grids) {
    // astro:page-load fires on every navigation. Grids from a new page are new
    // elements, but a grid that survived a swap must not be bound twice.
    if (grid.dataset.showcaseBound !== undefined) continue;
    grid.dataset.showcaseBound = '';
    bindGrid(grid, allowMotion);
  }
}

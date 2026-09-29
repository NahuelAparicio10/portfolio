/**
 * Scroll reveal.
 *
 * Two rules drive the design:
 *
 * 1. Content starts *visible*. The `.reveal` class only hides an element once
 *    this script has confirmed it can animate it (`data-motion-ready`). If the
 *    script never runs, whether because JavaScript is off, it failed to parse
 *    or the connection is slow, the page still reads normally instead of going
 *    blank. The usual pattern (opacity:0 in CSS, removed by JS) fails closed,
 *    which is unacceptable on a static site that gets indexed.
 *
 * 2. Only `transform` and `opacity` are animated, so the compositor handles
 *    them and scrolling stays smooth on mid-range phones.
 */

const REVEAL_SELECTOR = '[data-reveal]';
const VISIBLE_CLASS = 'is-revealed';

/** Stagger step between children, in milliseconds. */
const STAGGER_MS = 80;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Upper bound for a reveal transition to finish, matching --motion-slow. */
const REVEAL_SETTLE_MS = 700;

function revealNow(element: HTMLElement): void {
  element.classList.add(VISIBLE_CLASS);

  // The stagger delay is only for the entrance. Left in place it would also
  // delay every later hover on that child, so the last pill in a row would
  // answer the pointer half a second late.
  const children = element.querySelectorAll<HTMLElement>('[data-reveal-child]');
  children.forEach((child) => {
    if (!child.style.transitionDelay) return;
    const delay = parseFloat(child.style.transitionDelay) || 0;
    window.setTimeout(() => child.style.removeProperty('transition-delay'), delay + REVEAL_SETTLE_MS);
  });
}

function applyStagger(element: HTMLElement): void {
  const children = element.querySelectorAll<HTMLElement>('[data-reveal-child]');
  children.forEach((child, index) => {
    child.style.transitionDelay = `${index * STAGGER_MS}ms`;
  });
}

export function initReveal(root: ParentNode = document): void {
  const elements = Array.from(root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
  if (elements.length === 0) return;

  // Reduced motion, or a browser without IntersectionObserver: show everything
  // immediately and skip the animation entirely.
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    elements.forEach(revealNow);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target as HTMLElement;
        revealNow(target);
        // Reveal once. Re-animating on every scroll pass is noise, not feedback.
        observer.unobserve(target);
      }
    },
    {
      // Trigger slightly before the element reaches the viewport so the
      // animation is already underway when it becomes visible.
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.05,
    },
  );

  for (const element of elements) {
    applyStagger(element);
    // Opting in here, rather than in CSS, is what keeps the no-JS path safe.
    element.setAttribute('data-motion-ready', '');
    observer.observe(element);
  }
}

/**
 * Touch spotlight.
 *
 * Touch devices have no hover, so dragging a finger across the page produces
 * no feedback at all: the only state available is `:active`, and that fires
 * on tap. Simulating hover from `touchmove` would fight scrolling and light up
 * everything the finger sweeps past, which is exactly why browsers dropped it.
 *
 * The mobile-native equivalent is position-driven: whichever card sits in the
 * middle of the viewport gets the emphasis. Dragging then feels alive, because
 * the highlight moves with the scroll instead of with the finger.
 */
const SPOTLIGHT_SELECTOR = '.card-surface';
const SPOTLIGHT_CLASS = 'is-spotlit';

export function initTouchSpotlight(root: ParentNode = document): void {
  // Pointer-capable devices already have hover; this would only double up.
  if (window.matchMedia('(hover: hover)').matches) return;
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;

  const cards = Array.from(root.querySelectorAll<HTMLElement>(SPOTLIGHT_SELECTOR));
  if (cards.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle(SPOTLIGHT_CLASS, entry.isIntersecting);
      }
    },
    {
      // Negative margins collapse the root into a band across the middle of the
      // screen, so only what the reader is actually looking at lights up.
      rootMargin: '-42% 0px -42% 0px',
      threshold: 0,
    },
  );

  for (const card of cards) observer.observe(card);
}

/**
 * Highlighter sweep on the bold phrases of a game post.
 *
 * Same fail-open rule as the reveal: the highlight is drawn by default, and
 * only once this script marks the container (`data-highlight-ready`) does it
 * start empty and sweep in as each phrase scrolls into view. Phrases in the
 * same paragraph light up one after another, so the eye is led through the
 * key points in reading order.
 */
const HIGHLIGHT_SCOPE = '[data-highlight]';
const HIGHLIGHT_STEP_MS = 140;

export function initProseHighlight(root: ParentNode = document): void {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;

  const scopes = Array.from(root.querySelectorAll<HTMLElement>(HIGHLIGHT_SCOPE));
  for (const scope of scopes) {
    if (scope.hasAttribute('data-highlight-ready')) continue;

    // Bold inside headings is markdown habit (`### **About**`), not emphasis.
    const phrases = Array.from(scope.querySelectorAll<HTMLElement>('strong, b')).filter((el) => !el.closest('h1, h2, h3, h4'));
    if (phrases.length === 0) continue;

    // Stagger resets per block, so a phrase far down the page does not wait
    // for every phrase above it.
    const indexInBlock = new Map<Element, number>();
    for (const phrase of phrases) {
      const block = phrase.closest('p, li, div') ?? scope;
      const index = indexInBlock.get(block) ?? 0;
      indexInBlock.set(block, index + 1);
      phrase.style.transitionDelay = `${index * HIGHLIGHT_STEP_MS}ms`;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const phrase = entry.target as HTMLElement;
          phrase.classList.add('is-lit');
          observer.unobserve(phrase);
          // Drop the stagger once drawn, or it would also delay the hover fill.
          const delay = parseFloat(phrase.style.transitionDelay) || 0;
          window.setTimeout(() => phrase.style.removeProperty('transition-delay'), delay + REVEAL_SETTLE_MS);
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    );

    scope.setAttribute('data-highlight-ready', '');
    phrases.forEach((phrase) => observer.observe(phrase));
  }
}

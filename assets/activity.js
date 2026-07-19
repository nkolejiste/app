const config = window.activityConfig || {
  storageKey: 'activity-default',
  title: 'Aktivita',
  description: '',
  initialState: [],
  checkpoints: []
};

const checkpointList = document.querySelector('#checkpointList');
const resetButton = document.querySelector('#resetActivity');
const activityTitle = document.querySelector('#activityTitle');
const activityDescription = document.querySelector('#activityDescription');
const initialStateElement = document.querySelector('#initialState');

if (activityTitle) {
  activityTitle.textContent = config.title || 'Aktivita';
}

if (activityDescription) {
  activityDescription.textContent = config.description || '';
  activityDescription.hidden = !config.description;
}

function createInitialStateMarkup(trackState) {
  const wagons = Array.isArray(trackState.wagons) ? trackState.wagons : [];

  return `
    <article class="initial-track">
      <h2>Kolej č. ${trackState.track}</h2>
      <ol class="initial-wagon-list">
        ${wagons.map((wagon) => `<li>${wagon}</li>`).join('')}
      </ol>
    </article>
  `;
}

function renderInitialState() {
  if (!initialStateElement) return;

  const tracks = Array.isArray(config.initialState) ? config.initialState : [];

  if (tracks.length === 0) {
    initialStateElement.hidden = true;
    return;
  }

  initialStateElement.innerHTML = `
    <div class="section-heading">Výchozí stav</div>
    <div class="initial-track-list">
      ${tracks.map(createInitialStateMarkup).join('')}
    </div>
  `;
}

renderInitialState();

function wagonIconSvg() {
  return `
    <svg viewBox="0 0 140 78" role="img" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 52H122" />
        <path d="M16 52H8M132 52H124" />
        <path d="M43 52v6M97 52v6" />
        <path d="M28 48h84" />
        <path d="M35 48l-5 8M105 48l5 8" />
        <path d="M36 24h68c8 0 14 6 14 14s-6 14-14 14H36c-8 0-14-6-14-14s6-14 14-14Z" />
        <path d="M48 24v-7h44v7" />
        <path d="M58 17h24" />
        <path d="M70 17v-5" />
        <path d="M34 38h72" opacity="0.7" />
        <circle cx="42" cy="61" r="8" />
        <circle cx="98" cy="61" r="8" />
        <circle cx="42" cy="61" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="98" cy="61" r="2.2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  `;
}

function trackIconSvg() {
  return `
    <svg viewBox="0 0 84 74" role="img" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M28 8 20 66" />
        <path d="M56 8 64 66" />
        <path d="M32 8 24 66" opacity="0.55" />
        <path d="M52 8 60 66" opacity="0.55" />
        <path d="M22 18h40" />
        <path d="M21 29h42" />
        <path d="M19 40h46" />
        <path d="M18 51h48" />
        <path d="M16 62h52" />
      </g>
    </svg>
  `;
}

function createCheckpointMarkup(checkpoint, index) {
  const wagons = Array.isArray(checkpoint.wagons)
    ? checkpoint.wagons
    : checkpoint.wagon
      ? [checkpoint.wagon]
      : [];

  const wagonCount = checkpoint.count ?? wagons.length;

  return `
    <article class="checkpoint-card" data-checkpoint="${index}">
      <div class="checkpoint-content">
        <div class="checkpoint-topline">
          <div class="movement-group movement-group--wagons">
            <div class="wagon-symbol">${wagonIconSvg()}</div>
            <div class="wagon-meta">
              <strong class="wagon-count">${wagonCount}</strong>
            </div>
          </div>

          <div class="movement-divider" aria-hidden="true"></div>

          <div class="movement-group movement-group--tracks">
            <div class="track-symbol">${trackIconSvg()}</div>
            <div class="route-line">
              <span class="route-label">z</span>
              <span class="track-number">${checkpoint.from}</span>
              <span class="route-label">na</span>
              <span class="track-number">${checkpoint.to}</span>
            </div>
          </div>
        </div>

        <div class="checkpoint-text">
          <div class="checkpoint-wagon-list">
            ${wagons.map((wagon) => `<div class="checkpoint-wagon-item">${wagon}</div>`).join('')}
          </div>
          ${checkpoint.description ? `<p>${checkpoint.description}</p>` : ''}
        </div>
      </div>

      <button class="complete-button" type="button" aria-label="Označit checkpoint jako splněný" aria-pressed="false">
        <span class="checkmark" aria-hidden="true">✓</span>
      </button>
    </article>
  `;
}

function renderCheckpointList() {
  checkpointList.innerHTML = config.checkpoints
    .map((checkpoint, index) => createCheckpointMarkup(checkpoint, index))
    .join('');
}

renderCheckpointList();

const cards = Array.from(document.querySelectorAll('.checkpoint-card'));
const STORAGE_KEY = config.storageKey || 'activity-default';

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (Array.isArray(stored)) {
      return cards.map((_, index) => Boolean(stored[index]));
    }
  } catch (error) {
    console.warn('Stav aktivity se nepodařilo načíst.', error);
  }

  return cards.map(() => false);
}

let completionState = loadState();
let scrollAnimationFrame = null;

function scrollToCheckpoint(card, duration = 1000) {
  if (!card) return;

  if (scrollAnimationFrame) {
    window.cancelAnimationFrame(scrollAnimationFrame);
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const startY = window.scrollY;
  const cardRect = card.getBoundingClientRect();
  const targetY = Math.max(
    0,
    startY + cardRect.top - (window.innerHeight - cardRect.height) / 2
  );

  if (reduceMotion || duration <= 0) {
    window.scrollTo(0, targetY);
    return;
  }

  const distance = targetY - startY;
  const startTime = performance.now();

  function easeInOutCubic(progress) {
    return progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
  }

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * easedProgress);

    if (progress < 1) {
      scrollAnimationFrame = window.requestAnimationFrame(animateScroll);
    } else {
      scrollAnimationFrame = null;
    }
  }

  scrollAnimationFrame = window.requestAnimationFrame(animateScroll);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(completionState));
}

function renderState() {
  const firstIncompleteIndex = completionState.findIndex((isComplete) => !isComplete);

  cards.forEach((card, index) => {
    const button = card.querySelector('.complete-button');
    const isComplete = completionState[index];
    const isActive = index === firstIncompleteIndex;

    card.classList.toggle('is-complete', isComplete);
    card.classList.toggle('is-active', isActive);

    button.setAttribute('aria-pressed', String(isComplete));
    button.setAttribute(
      'aria-label',
      isComplete ? 'Označit checkpoint jako nesplněný' : 'Označit checkpoint jako splněný'
    );
  });
}

cards.forEach((card, index) => {
  const button = card.querySelector('.complete-button');

  button.addEventListener('click', () => {
    const willBeComplete = !completionState[index];
    completionState[index] = willBeComplete;
    saveState();
    renderState();

    if (willBeComplete) {
      const nextCard = cards.find((_, cardIndex) => !completionState[cardIndex]);

      if (nextCard) {
        scrollToCheckpoint(nextCard, 1000);
      }
    }
  });
});

if (resetButton) {
  resetButton.addEventListener('click', () => {
    if (scrollAnimationFrame) {
      window.cancelAnimationFrame(scrollAnimationFrame);
      scrollAnimationFrame = null;
    }
    completionState = cards.map(() => false);
    saveState();
    renderState();
  });
}

renderState();

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
    <svg viewBox="0 0 180 86" role="img" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 20h140l7 33H13z" fill="currentColor" opacity="0.07" />
        <path d="M20 20h140l7 33H13z" />
        <path d="M17 25h146" opacity="0.7" />
        <path d="M15 48h150" opacity="0.55" />

        <path d="M30 21v31M48 21v31M66 21v31M84 21v31M102 21v31M120 21v31M138 21v31M156 21v31" />
        <path d="M31 25 46 48M49 25 64 48M67 25 82 48M85 25 100 48M103 25 118 48M121 25 136 48M139 25 154 48" opacity="0.72" />

        <path d="M13 53h154" />
        <path d="M24 53v6h132v-6" />
        <path d="M6 50h8M166 50h8" />
        <path d="M6 47v6M174 47v6" />
        <path d="M3 50h3M174 50h3" />
        <path d="M89 59v5M84 64h10" opacity="0.75" />

        <path d="M28 60h38l5 6-5 8H28l-5-8z" />
        <path d="M114 60h38l5 6-5 8h-38l-5-8z" />
        <path d="M30 64h34M116 64h34" opacity="0.65" />

        <circle cx="34" cy="72" r="7" />
        <circle cx="59" cy="72" r="7" />
        <circle cx="121" cy="72" r="7" />
        <circle cx="146" cy="72" r="7" />
        <circle cx="34" cy="72" r="2" fill="currentColor" stroke="none" />
        <circle cx="59" cy="72" r="2" fill="currentColor" stroke="none" />
        <circle cx="121" cy="72" r="2" fill="currentColor" stroke="none" />
        <circle cx="146" cy="72" r="2" fill="currentColor" stroke="none" />

        <path d="M16 31H9v18M9 35h7M9 41h7M9 47h7" opacity="0.8" />
        <path d="M164 32h7v17" opacity="0.55" />
        <path d="M75 56h30" opacity="0.6" />
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

function documentIconSvg() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 2.75h8.3L18.5 7v14.25H6z" />
      <path d="M14 2.75V7h4.5" />
      <path d="M8.75 11h7M8.75 14.5h7M8.75 18h4.5" />
    </svg>
  `;
}

function getCheckpointDocuments(checkpoint) {
  if (Array.isArray(checkpoint.documents)) {
    return checkpoint.documents.map((document) => (
      typeof document === 'string' ? { file: document } : document
    ));
  }
  if (checkpoint.document) {
    return [typeof checkpoint.document === 'string' ? { file: checkpoint.document } : checkpoint.document];
  }
  return [];
}

function getDocumentTitle(documents, documentIndex) {
  if (documents.length === 1) return 'Nákladní list';
  return `Nákladní list ${documentIndex + 1}`;
}

function createDocumentMarkup(checkpoint, checkpointIndex) {
  const documents = getCheckpointDocuments(checkpoint);

  if (!documents.length) return '';

  return `
    <div class="document-list">
      ${documents.map((documentConfig, documentIndex) => {
        const title = getDocumentTitle(documents, documentIndex);

        return `
          <button class="document-button" type="button" data-checkpoint-document="${checkpointIndex}" data-document-index="${documentIndex}" aria-label="Otevřít ${title}">
            <span class="document-button-icon">${documentIconSvg()}</span>
            <span class="document-button-text">${title}</span>
            <span class="document-button-status" aria-hidden="true">✓</span>
          </button>
        `;
      }).join('')}
    </div>
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
          ${createDocumentMarkup(checkpoint, index)}
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
const DOCUMENT_STORAGE_KEY = `${STORAGE_KEY}-documents`;

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

function loadDocumentState() {
  try {
    const stored = JSON.parse(localStorage.getItem(DOCUMENT_STORAGE_KEY));

    if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
      return stored;
    }
  } catch (error) {
    console.warn('Stav dokumentů se nepodařilo načíst.', error);
  }

  return {};
}

let completionState = loadState();
let documentState = loadDocumentState();
let scrollAnimationFrame = null;
let documentModal = null;
let signatureCanvas = null;
let signatureContext = null;
let signatureDrawing = false;
let signatureHasInk = false;
let activeCheckpointIndex = null;
let activeDocumentIndex = null;

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

function saveDocumentState() {
  localStorage.setItem(DOCUMENT_STORAGE_KEY, JSON.stringify(documentState));
}

function getStoredDocumentState(checkpointIndex, documentIndex) {
  const checkpointState = documentState[checkpointIndex];

  if (!checkpointState || typeof checkpointState !== 'object') return {};

  if (documentIndex === 0 && ('checked' in checkpointState || 'signature' in checkpointState)) {
    return checkpointState;
  }

  return checkpointState[documentIndex] || {};
}

function isSingleDocumentComplete(checkpointIndex, documentIndex) {
  const documentConfig = getCheckpointDocuments(config.checkpoints[checkpointIndex])[documentIndex];

  if (!documentConfig) return true;

  const state = getStoredDocumentState(checkpointIndex, documentIndex);
  return Boolean(state.checked) && Boolean(state.signature);
}

function isDocumentComplete(index) {
  const documents = getCheckpointDocuments(config.checkpoints[index]);

  return documents.every((_, documentIndex) => isSingleDocumentComplete(index, documentIndex));
}

function isCheckpointAvailable(index, firstIncompleteIndex) {
  return completionState[index] || index === firstIncompleteIndex;
}

function renderState() {
  const firstIncompleteIndex = completionState.findIndex((isComplete) => !isComplete);

  cards.forEach((card, index) => {
    const button = card.querySelector('.complete-button');
    const documentButtons = Array.from(card.querySelectorAll('.document-button'));
    const isComplete = completionState[index];
    const isActive = index === firstIncompleteIndex;
    const isAvailable = isCheckpointAvailable(index, firstIncompleteIndex);
    const documentComplete = isDocumentComplete(index);
    const canComplete = isActive && documentComplete;

    card.classList.toggle('is-complete', isComplete);
    card.classList.toggle('is-active', isActive);
    card.classList.toggle('is-locked', !isAvailable);
    card.classList.toggle('has-document-complete', getCheckpointDocuments(config.checkpoints[index]).length > 0 && documentComplete);

    button.disabled = !isComplete && !canComplete;
    button.setAttribute('aria-pressed', String(isComplete));

    if (isComplete) {
      button.setAttribute('aria-label', 'Označit checkpoint jako nesplněný');
    } else if (!isActive) {
      button.setAttribute('aria-label', 'Checkpoint je zamčený');
    } else if (!documentComplete) {
      button.setAttribute('aria-label', 'Nejprve dokončete dokument');
    } else {
      button.setAttribute('aria-label', 'Označit checkpoint jako splněný');
    }

    documentButtons.forEach((documentButton) => {
      const documentIndex = Number(documentButton.dataset.documentIndex);
      const singleDocumentComplete = isSingleDocumentComplete(index, documentIndex);

      documentButton.disabled = !isAvailable;
      documentButton.setAttribute('aria-disabled', String(!isAvailable));
      documentButton.classList.toggle('is-complete', singleDocumentComplete);
    });
  });
}

function clearLaterState(index) {
  for (let i = index; i < completionState.length; i += 1) {
    completionState[i] = false;

    if (i > index && documentState[i]) {
      delete documentState[i];
    }
  }
}

function createDocumentModal() {
  const modal = document.createElement('div');
  modal.className = 'document-modal';
  modal.hidden = true;
  modal.innerHTML = `
    <div class="document-modal-backdrop" data-close-document></div>
    <section class="document-dialog" role="dialog" aria-modal="true" aria-labelledby="documentModalTitle">
      <div class="document-dialog-header">
        <div>
          <div class="document-dialog-eyebrow">Dokumentace vozu</div>
          <h2 id="documentModalTitle"></h2>
        </div>
        <button class="document-close" type="button" data-close-document aria-label="Zavřít dokument">×</button>
      </div>
      <div class="document-image-wrap">
        <img class="document-image" alt="">
      </div>
      <label class="document-check-row">
        <input class="document-check" type="checkbox">
        <span>kontrola</span>
      </label>
      <div class="signature-section" hidden>
        <div class="signature-heading-row">
          <strong>Podpis vedoucího posunu</strong>
          <button class="signature-clear" type="button">Vymazat podpis</button>
        </div>
        <canvas class="signature-canvas"></canvas>
      </div>
      <div class="document-actions">
        <button class="document-save" type="button" disabled>Uložit</button>
      </div>
    </section>
  `;

  document.body.appendChild(modal);
  return modal;
}

function sizeSignatureCanvas() {
  if (!signatureCanvas || signatureCanvas.closest('.signature-section').hidden) return;

  const ratio = Math.max(1, window.devicePixelRatio || 1);
  const rect = signatureCanvas.getBoundingClientRect();
  const storedSignature = activeCheckpointIndex !== null && activeDocumentIndex !== null
    ? getStoredDocumentState(activeCheckpointIndex, activeDocumentIndex).signature
    : null;

  signatureCanvas.width = Math.round(rect.width * ratio);
  signatureCanvas.height = Math.round(rect.height * ratio);
  signatureContext = signatureCanvas.getContext('2d');
  signatureContext.setTransform(ratio, 0, 0, ratio, 0, 0);
  signatureContext.lineWidth = 2.4;
  signatureContext.lineCap = 'round';
  signatureContext.lineJoin = 'round';
  signatureContext.strokeStyle = '#111111';

  if (storedSignature) {
    const image = new Image();
    image.onload = () => {
      signatureContext.drawImage(image, 0, 0, rect.width, rect.height);
    };
    image.src = storedSignature;
  }
}

function updateDocumentForm() {
  if (!documentModal || activeCheckpointIndex === null || activeDocumentIndex === null) return;

  const checkInput = documentModal.querySelector('.document-check');
  const signatureSection = documentModal.querySelector('.signature-section');
  const saveButton = documentModal.querySelector('.document-save');
  const checked = checkInput.checked;

  signatureSection.hidden = !checked;

  if (!signatureSection.hidden && signatureCanvas && signatureCanvas.width === 300) {
    window.requestAnimationFrame(sizeSignatureCanvas);
  }

  saveButton.disabled = !(checked && signatureHasInk);
}

function openDocument(checkpointIndex, documentIndex) {
  const checkpoint = config.checkpoints[checkpointIndex];
  const documentConfig = getCheckpointDocuments(checkpoint)[documentIndex];
  const firstIncompleteIndex = completionState.findIndex((isComplete) => !isComplete);

  if (!documentConfig || !isCheckpointAvailable(checkpointIndex, firstIncompleteIndex)) return;

  if (!documentModal) {
    documentModal = createDocumentModal();
    signatureCanvas = documentModal.querySelector('.signature-canvas');

    documentModal.addEventListener('click', (event) => {
      if (event.target.closest('[data-close-document]')) {
        closeDocument();
      }
    });

    documentModal.querySelector('.document-check').addEventListener('change', updateDocumentForm);
    documentModal.querySelector('.signature-clear').addEventListener('click', () => {
      if (!signatureContext || !signatureCanvas) return;
      signatureContext.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
      signatureHasInk = false;
      updateDocumentForm();
    });

    documentModal.querySelector('.document-save').addEventListener('click', saveActiveDocument);

    signatureCanvas.addEventListener('pointerdown', startSignature);
    signatureCanvas.addEventListener('pointermove', drawSignature);
    signatureCanvas.addEventListener('pointerup', stopSignature);
    signatureCanvas.addEventListener('pointercancel', stopSignature);
    signatureCanvas.addEventListener('pointerleave', stopSignature);
  }

  activeCheckpointIndex = checkpointIndex;
  activeDocumentIndex = documentIndex;
  const stored = getStoredDocumentState(checkpointIndex, documentIndex);
  const documents = getCheckpointDocuments(checkpoint);
  const title = getDocumentTitle(documents, documentIndex);
  const base = config.documentBase || '';
  const image = documentModal.querySelector('.document-image');
  const checkInput = documentModal.querySelector('.document-check');
  const signatureSection = documentModal.querySelector('.signature-section');

  documentModal.querySelector('#documentModalTitle').textContent = title;
  image.src = `${base}${documentConfig.file}`;
  image.alt = title;
  checkInput.checked = Boolean(stored.checked);
  checkInput.disabled = false;
  signatureHasInk = Boolean(stored.signature);
  signatureSection.hidden = !checkInput.checked;
  documentModal.hidden = false;
  document.body.classList.add('document-open');

  window.requestAnimationFrame(() => {
    sizeSignatureCanvas();
    updateDocumentForm();
  });
}

function closeDocument() {
  if (!documentModal) return;
  documentModal.hidden = true;
  document.body.classList.remove('document-open');
  activeCheckpointIndex = null;
  activeDocumentIndex = null;
  signatureDrawing = false;
}

function getSignaturePoint(event) {
  const rect = signatureCanvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function startSignature(event) {
  if (activeCheckpointIndex === null || activeDocumentIndex === null || !signatureContext) return;
  signatureDrawing = true;
  signatureCanvas.setPointerCapture(event.pointerId);
  const point = getSignaturePoint(event);
  signatureContext.beginPath();
  signatureContext.moveTo(point.x, point.y);
  event.preventDefault();
}

function drawSignature(event) {
  if (!signatureDrawing || !signatureContext) return;
  const point = getSignaturePoint(event);
  signatureContext.lineTo(point.x, point.y);
  signatureContext.stroke();
  signatureHasInk = true;
  updateDocumentForm();
  event.preventDefault();
}

function stopSignature(event) {
  if (!signatureDrawing) return;
  signatureDrawing = false;
  if (signatureCanvas.hasPointerCapture(event.pointerId)) {
    signatureCanvas.releasePointerCapture(event.pointerId);
  }
}

function saveActiveDocument() {
  if (activeCheckpointIndex === null || activeDocumentIndex === null || !documentModal) return;

  const checkInput = documentModal.querySelector('.document-check');
  const checked = checkInput.checked;

  if (!checked || !signatureHasInk) return;

  const checkpointState = documentState[activeCheckpointIndex];

  if (!checkpointState || 'checked' in checkpointState || 'signature' in checkpointState) {
    documentState[activeCheckpointIndex] = {};
  }

  documentState[activeCheckpointIndex][activeDocumentIndex] = {
    checked: true,
    signature: signatureCanvas.toDataURL('image/png')
  };

  saveDocumentState();
  renderState();
  closeDocument();
}

cards.forEach((card, index) => {
  const button = card.querySelector('.complete-button');
  const documentButtons = Array.from(card.querySelectorAll('.document-button'));

  button.addEventListener('click', () => {
    if (button.disabled) return;

    if (completionState[index]) {
      clearLaterState(index);
      saveState();
      saveDocumentState();
      renderState();
      scrollToCheckpoint(cards[index], 600);
      return;
    }

    if (!isDocumentComplete(index)) return;

    completionState[index] = true;
    saveState();
    renderState();

    const nextCard = cards.find((_, cardIndex) => !completionState[cardIndex]);

    if (nextCard) {
      scrollToCheckpoint(nextCard, 1000);
    }
  });

  documentButtons.forEach((documentButton) => {
    documentButton.addEventListener('click', () => {
      openDocument(index, Number(documentButton.dataset.documentIndex));
    });
  });
});

if (resetButton) {
  resetButton.addEventListener('click', () => {
    if (scrollAnimationFrame) {
      window.cancelAnimationFrame(scrollAnimationFrame);
      scrollAnimationFrame = null;
    }
    completionState = cards.map(() => false);
    documentState = {};
    saveState();
    saveDocumentState();
    renderState();
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && documentModal && !documentModal.hidden) {
    closeDocument();
  }
});

window.addEventListener('resize', () => {
  if (documentModal && !documentModal.hidden) {
    sizeSignatureCanvas();
  }
});

renderState();

(function () {

  // ==========================================================
  // CONFIG
  // ==========================================================

  const CONFIG = {
    offer: "https://play.mascot.games/fly-high/",
    promo: "BONUS200",

    timer: 14 * 60 + 57,

    counters: {
      online: 1847,
      claimed: 3241
    }
  };

  // ==========================================================
  // CTA LINKS
  // ==========================================================

  document.querySelectorAll("[data-cta]").forEach(link => {
    link.href = CONFIG.offer;
    link.rel = "noreferrer";
  });

  // ==========================================================
  // ONLINE COUNTERS
  // ==========================================================

  const online = document.querySelector("[data-online]");
  const claimed = document.querySelector("[data-claimed]");

  let onlineValue =
    CONFIG.counters.online + Math.floor(Math.random() * 80);

  let claimedValue =
    CONFIG.counters.claimed + Math.floor(Math.random() * 120);

  function formatNumber(value) {
    return value.toLocaleString("de-DE");
  }

  function updateCounters() {

    onlineValue += Math.floor(Math.random() * 5) - 1;

    if (onlineValue < 1780) onlineValue = 1810;
    if (onlineValue > 1960) onlineValue = 1905;

    if (Math.random() > 0.68) {
      claimedValue++;
    }

    if (online) {
      online.textContent = formatNumber(onlineValue);
    }

    if (claimed) {
      claimed.textContent = formatNumber(claimedValue);
    }

  }

  updateCounters();
  setInterval(updateCounters, 2400);

  // ==========================================================
  // COUNTDOWN TIMER
  // ==========================================================

  let totalSeconds = CONFIG.timer;

  const hours = document.querySelector("[data-h]");
  const minutes = document.querySelector("[data-m]");
  const seconds = document.querySelector("[data-s]");

  function updateTimer() {

    if (totalSeconds <= 0) {
      totalSeconds = CONFIG.timer;
    }

    totalSeconds--;

    const hh = Math.floor(totalSeconds / 3600);
    const mm = Math.floor((totalSeconds % 3600) / 60);
    const ss = totalSeconds % 60;

    if (hours) {
      hours.textContent = String(hh).padStart(2, "0");
    }

    if (minutes) {
      minutes.textContent = String(mm).padStart(2, "0");
    }

    if (seconds) {
      seconds.textContent = String(ss).padStart(2, "0");
    }

  }

  updateTimer();
  setInterval(updateTimer, 1000);

  // ==========================================================
  // COPY PROMO
  // ==========================================================

  async function copyPromo() {

    try {

      await navigator.clipboard.writeText(CONFIG.promo);

    } catch {

      const textarea = document.createElement("textarea");

      textarea.value = CONFIG.promo;

      document.body.appendChild(textarea);

      textarea.select();

      document.execCommand("copy");

      textarea.remove();

    }

    document
      .querySelector("[data-copied]")
      ?.classList.add("show");

    document.querySelectorAll(
      "[data-copy], [data-modal-copy]"
    ).forEach(button => {
      button.textContent = "Copied ✓";
    });

  }

  document
    .querySelector("[data-copy]")
    ?.addEventListener("click", copyPromo);

  document
    .querySelector("[data-code]")
    ?.addEventListener("click", copyPromo);

  document
    .querySelector("[data-modal-copy]")
    ?.addEventListener("click", copyPromo);

})();
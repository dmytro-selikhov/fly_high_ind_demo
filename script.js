(function () {
  const OFFER = "https://play.mascot.games/fly-high/";
  const PROMO = "BONUS200";

  document.querySelectorAll("[data-cta]").forEach(a => {
    a.href = OFFER;
    a.rel = "noreferrer";
  });

  const online = document.querySelector("[data-online]");
  const claimed = document.querySelector("[data-claimed]");
  let onlineVal = 1847 + Math.floor(Math.random() * 80);
  let claimedVal = 3241 + Math.floor(Math.random() * 120);
  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
  function updateCounters() {
    onlineVal += Math.floor(Math.random() * 5) - 1;
    if (onlineVal < 1780) onlineVal = 1810;
    if (onlineVal > 1960) onlineVal = 1905;
    claimedVal += Math.random() > .68 ? 1 : 0;
    if (online) online.textContent = fmt(onlineVal);
    if (claimed) claimed.textContent = fmt(claimedVal);
  }
  updateCounters();
  setInterval(updateCounters, 2400);

  let total = 14 * 60 + 57;
  const h = document.querySelector("[data-h]");
  const m = document.querySelector("[data-m]");
  const s = document.querySelector("[data-s]");
  function tick() {
    if (total <= 0) total = 14 * 60 + 57;
    total--;
    const hh = Math.floor(total / 3600);
    const mm = Math.floor((total % 3600) / 60);
    const ss = total % 60;
    if (h) h.textContent = String(hh).padStart(2, "0");
    if (m) m.textContent = String(mm).padStart(2, "0");
    if (s) s.textContent = String(ss).padStart(2, "0");
  }
  tick();
  setInterval(tick, 1000);

  async function copyPromo() {
    try {
      await navigator.clipboard.writeText(PROMO);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = PROMO;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    document.querySelector("[data-copied]")?.classList.add("show");
    document.querySelector("[data-copy]").textContent = "Copied ✓";
    document.querySelector("[data-modal-copy]").textContent = "Copied ✓";
  }

  document.querySelector("[data-copy]")?.addEventListener("click", copyPromo);
  document.querySelector("[data-code]")?.addEventListener("click", copyPromo);
  document.querySelector("[data-modal-copy]")?.addEventListener("click", copyPromo);

  const cells = Array.from(document.querySelectorAll("[data-cell]"));
  const hint = document.querySelector("[data-hint]");
  const winLayer = document.querySelector("[data-win-layer]");
  const modal = document.querySelector("[data-modal]");
  let moves = 0;
  let locked = false;

  const botOrder = [4, 0, 8, 2, 6, 1, 3, 5, 7];

  function botMove() {
    const empty = botOrder.map(i => cells[i]).find(c => c && !c.textContent);
    if (!empty) return;
    empty.textContent = "O";
    empty.classList.add("o");
  }

  function unlockBonus() {
    locked = true;
    if (hint) hint.textContent = "Promo code BONUS200 terbuka. Copy lalu klaim bonus.";
    winLayer?.classList.remove("hidden");
    setTimeout(() => modal?.classList.remove("hidden"), 850);
  }

  cells.forEach(cell => {
    cell.addEventListener("click", () => {
      if (locked || cell.textContent) return;
      cell.textContent = "X";
      cell.classList.add("x");
      moves++;
      if (hint) hint.textContent = moves < 3 ? `Bagus! Tap ${3 - moves} kotak lagi untuk membuka bonus.` : "Bonus terbuka!";
      if (moves >= 3) {
        unlockBonus();
        return;
      }
      setTimeout(botMove, 220);
    });
  });

  document.querySelector("[data-close]")?.addEventListener("click", () => modal?.classList.add("hidden"));
})();

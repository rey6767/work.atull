  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 1); // Atur promo berakhir 2 hari dari sekarang

  const countdown = document.getElementById("countdown");

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      countdown.textContent = "Promo telah berakhir!";
      countdown.style.color = "#999";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    countdown.textContent = `${days} hari ${hrs} jam ${mins} menit ${secs} detik`;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();
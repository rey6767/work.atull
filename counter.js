let count = 0;
let target = 32546; // Jumlah member real/tampilan
let speed = 2;
let counter = document.getElementById("counter");

function updateCounter() {
  if (count < target) {
    count += Math.floor(Math.random() * 300) + 1;
    if (count > target) count = target;
    counter.textContent = count.toLocaleString();
    setTimeout(updateCounter, speed);
  }
}
updateCounter();
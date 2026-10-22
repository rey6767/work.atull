  const chats = [
    document.getElementById("chat1"),
    document.getElementById("chat2"),
    document.getElementById("chat3"),
    document.getElementById("chat4"),
    document.getElementById("chat5")
  ];
  let current = 0;

  function showChat() {
    chats.forEach((chat, index) => {
      chat.style.display = index === current ? "block" : "none";
    });
    current = (current + 1) % chats.length;
  }

  showChat(); // Tampilkan pertama
  setInterval(showChat, 3300); // Ganti setiap 6 detik
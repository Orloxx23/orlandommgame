const chatBubbles = [];

async function enviar(event) {
  event.preventDefault();
  let message = document.getElementById("message").value;

  if (message.trim().length > 0 && message !== "...") {
    document.getElementById("message").disabled = true;
    document.getElementById("message").value = "...";

    chatBubbles.push(
      new ChatBubble(message, player.position.x + 64, player.position.y - 32)
    );
    console.log(message);

    setTimeout(async () => {
      await getResponse(message);
      document.getElementById("message").disabled = false;
      document.getElementById("message").value = "";
    }, 1900);
  }
}

async function getResponse(message) {
  chatBubbles.push(
    new ChatBubble(
      "No me molestes, aún estoy en desarrollo.",
      wizard.position.x - 64,
      wizard.position.y
    )
  );
}

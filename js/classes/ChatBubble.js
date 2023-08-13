/*class ChatBubble {
  constructor(text, x, y) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.opacity = 1; // Inicializar la opacidad
    this.speed = 0.3; // Velocidad de movimiento hacia arriba
  }

  update() {
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + 200 > canvas.width) {
      this.x = canvas.width - 200;
    }

    this.y -= this.speed;
    this.opacity -= 0.005;

    if (this.opacity <= 0) {
      const index = chatBubbles.indexOf(this);
      if (index !== -1) {
        chatBubbles.splice(index, 1);
      }
    }
  }

  draw() {
    c.globalAlpha = this.opacity;
    c.fillStyle = "white";

    // Dibujar la burbuja con esquinas redondeadas
    c.beginPath();
    c.moveTo(this.x + 10, this.y);
    c.lineTo(this.x + 190, this.y);
    c.arc(this.x + 190, this.y + 10, 10, -Math.PI / 2, 0);
    c.lineTo(this.x + 200, this.y + 20);
    c.arc(this.x + 190, this.y + 20, 10, 0, Math.PI / 2);
    c.lineTo(this.x + 10, this.y + 30);
    c.arc(this.x + 10, this.y + 20, 10, Math.PI / 2, Math.PI);
    c.lineTo(this.x, this.y + 10);
    c.arc(this.x + 10, this.y + 10, 10, Math.PI, -Math.PI / 2);
    c.fill();

    c.fillStyle = "black";
    c.font = "12px Arial";
    c.fillText(this.text, this.x + 20, this.y + 20);

    c.globalAlpha = 1;
  }
}*/

class ChatBubble {
  constructor(text, x, y, maxWidth) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.opacity = 1;
    this.speed = 0.3;
    this.width = 0;
    this.height = 0;
    this.maxWidth = maxWidth || 150;
  }

  update(canvas) {
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width > canvas.width) {
      this.x = canvas.width - this.width;
    }

    this.y -= this.speed;
    this.opacity -= 0.0015;

    if (this.opacity <= 0) {
      const index = chatBubbles.indexOf(this);
      if (index !== -1) {
        chatBubbles.splice(index, 1);
      }
    }
  }

  calculateDimensions(c) {
    c.font = "12px Arial";
    const words = this.text.split(" ");
    let line = "";
    let lines = [];

    for (const word of words) {
      const testLine = line + (line ? " " : "") + word;
      const testWidth = c.measureText(testLine).width;
      if (testWidth > this.maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    this.width = this.maxWidth + 40;
    this.height = 20 + lines.length * 20; // Ajustar la altura según la cantidad de líneas
  }

  draw(c) {
    c.globalAlpha = this.opacity;
    c.fillStyle = "white";

    // Dibujar la burbuja con esquinas redondeadas
    c.beginPath();
    c.moveTo(this.x + 10, this.y);
    c.lineTo(this.x + this.width - 10, this.y);
    c.arc(this.x + this.width - 10, this.y + 10, 10, -Math.PI / 2, 0);
    c.lineTo(this.x + this.width, this.y + this.height - 10);
    c.arc(
      this.x + this.width - 10,
      this.y + this.height - 10,
      10,
      0,
      Math.PI / 2
    );
    c.lineTo(this.x + 10, this.y + this.height);
    c.arc(this.x + 10, this.y + this.height - 10, 10, Math.PI / 2, Math.PI);
    c.lineTo(this.x, this.y + 10);
    c.arc(this.x + 10, this.y + 10, 10, Math.PI, -Math.PI / 2);
    c.fill();

    c.fillStyle = "black";
    c.font = "12px Arial";

    const words = this.text.split(" ");
    let line = "";
    let lines = [];

    for (const word of words) {
      const testLine = line + (line ? " " : "") + word;
      const testWidth = c.measureText(testLine).width;
      if (testWidth > this.maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    for (let i = 0; i < lines.length; i++) {
      c.fillText(lines[i], this.x + 20, this.y + 20 + i * 20);
    }

    c.globalAlpha = 1;
  }
}

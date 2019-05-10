function Clock(x, y, scale) {
  this.sevenSegments = [];
  this.colons = [];

  this.colons.push(new Circle(x + 35 * scale, y + 5 * scale, 10));
  this.colons.push(new Circle(x + 35 * scale, y + 20 * scale, 10));

  this.colons.push(new Circle(x + 75 * scale, y + 5 * scale, 10));
  this.colons.push(new Circle(x + 75 * scale, y + 20 * scale, 10));

  for(let i = 0 ; i < 10 ; i++) {
    this.colons.push(new Circle(i * document.body.clientWidth/10, y + 30 * scale, scale * 3));
  }
  this.sevenSegments.push(new SevenSegment(x, y, scale));
  this.sevenSegments.push(new SevenSegment(x + 10 * scale + 8 * scale, y, scale));

  this.sevenSegments.push(new SevenSegment(x + 20 * scale + 20 * scale, y, scale));
  this.sevenSegments.push(new SevenSegment(x + 30 * scale + 28 * scale, y, scale));

  this.sevenSegments.push(new SevenSegment(x + 40 * scale + 40 * scale, y, scale));
  this.sevenSegments.push(new SevenSegment(x + 50 * scale + 48 * scale, y, scale));


  this.draw = function() {

    for(let seg of this.sevenSegments) {
      seg.draw();
    }
    for (let c of this.colons) {
      c.draw();
    }
  }


  this.update = function() {
    let date = new Date();

    this.sevenSegments[0].showDigit(int(date.getHours()/10));
    this.sevenSegments[1].showDigit(date.getHours()%10);

    this.sevenSegments[2].showDigit(int(date.getMinutes()/10));
    this.sevenSegments[3].showDigit(date.getMinutes()%10);

    this.sevenSegments[4].showDigit(int(date.getSeconds()/10));
    this.sevenSegments[5].showDigit(date.getSeconds()%10);

  }
}

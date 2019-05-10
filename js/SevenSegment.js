function SevenSegment(x, y, scale) {
  this.x = x;
  this.y = y;

  this.segments = [];

  this.segments.push(new Segment(x + 5 * scale, y, scale, 0, 1))
  this.segments.push(new Segment(x + 10 * scale, y + 5 * scale, scale, PI/2, 1));
  this.segments.push(new Segment(x + 10 * scale, y + 15 * scale, scale, PI/2, 1));
  this.segments.push(new Segment(x + 5 * scale, y + 20 * scale, scale, 0, 1));
  this.segments.push(new Segment(x, y + 15 * scale, scale, PI/2, 1));
  this.segments.push(new Segment(x, y + 5 * scale, scale, PI/2, 1));
  this.segments.push(new Segment(x + 5 * scale, y + 10 * scale, scale, 0, 1));

  this.currentDigit = -1;

  this.draw = function() {
    for (let s of this.segments) {
      s.draw();
    }
  }

  this.showDigit = function (digit) {
    if (this.currentDigit == digit) {
      return;
    } else {
      this.currentDigit = digit;
      for (let s of this.segments) {
        s.removeJoint();
      }
    setTimeout(this.setSegments, 1000, this.segments, digit);
   }
  }

  this.setSegments = function(segments, digit) {
    let hex = DECIMAL_EQ_HEX[digit];
    segments[0].setStatus((hex >> 6) & 1);
    segments[1].setStatus((hex >> 5) & 1);
    segments[2].setStatus((hex >> 4) & 1);
    segments[3].setStatus((hex >> 3) & 1);
    segments[4].setStatus((hex >> 2) & 1);
    segments[5].setStatus((hex >> 1) & 1);
    segments[6].setStatus((hex >> 0) & 1);
  }

}

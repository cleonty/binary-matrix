function Matrix(n, m) {
  this.n = n;
  this.m = m;
  this.data = new Array(n);
  for (let i = 0; i < n; i++) {
    this.data[i] = new Array(m);
    this.data[i].fill(0);
  }
  this.domainCount = 0;
  this.firstColorIndex = 2;
  this.palette = {};
}

Matrix.prototype.propogateColor = function (i, j, color) {
  if (this.inMatrix(i, j)) {
    if (this.isNotColored(i, j)) {
      this.setColor(i, j, color);
      this.propogateColorRight(i, j, color);
      this.propogateColorDown(i, j, color);
      this.propogateColorLeft(i, j, color);
      this.propogateColorUp(i, j, color);
    }
  }
};

Matrix.prototype.inMatrix = function (i, j) {
  return i >= 0 && i < this.n && j >= 0 && j < this.m;
};

Matrix.prototype.isNotColored = function (i, j) {
  return this.data[i][j] === 1;
};

Matrix.prototype.toggleColor = function (i, j) {
  this.data[i][j] = (this.data[i][j] === 0 ? 1 : 0);
};

Matrix.prototype.setColor = function (i, j, color) {
  this.data[i][j] = color;
};

Matrix.prototype.propogateColorRight = function (i, j, color) {
  this.propogateColor(i, j + 1, color);
};

Matrix.prototype.propogateColorLeft = function (i, j, color) {
  this.propogateColor(i, j - 1, color);
};

Matrix.prototype.propogateColorDown = function (i, j, color) {
  this.propogateColor(i + 1, j, color);
};

Matrix.prototype.propogateColorUp = function (i, j, color) {
  this.propogateColor(i - 1, j, color);
};

Matrix.prototype.colorize = function () {
  let color = this.firstColorIndex;
  this.domainCount = 0;
  this.palette = {};
  for (let i = 0; i < this.n; i++) {
    for (let j = 0; j < this.m; j++) {
      if (this.isNotColored(i, j)) {
        this.propogateColor(i, j, color);
        color++;
        this.domainCount++;
      }
    }
  }
  this.createColorPallette();
  return this.domainCount;
};

Matrix.prototype.createColorPallette = function () {
  this.palette = {};
  for (let i = 0; i < this.domainCount; i++) {
    this.palette[this.firstColorIndex + i] = randomColor();
  }
};

Matrix.prototype.autoFill = function (prob) {
  const data = this.data;
  for (let i = 0; i < this.n; i++) {
    for (let j = 0; j < this.m; j++) {
      data[i][j] = random(prob);
    }
  }
};

Matrix.prototype.auto = function (prob) {
  this.autoFill(prob);
  return this.colorize();
};

Matrix.prototype.size = function () {
  return this.m * this.n;
};

function random(prob) {
  return Math.random() < prob ? 1 : 0;
}

function randomColor() {
  const hexColor = Math.floor(Math.random() * 0x1000000).toString(16);
  return '#' + '000000'.substr(0, 6 - hexColor.length) + hexColor;
}

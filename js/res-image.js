const resImage = {holder:{}};

resImage.load = function(id, url) {
  return new Promise(resolve => {
    const image = new Image();
    image.onload = resolve;
    image.src = url;
    this.holder[id] = image;
  });
};

resImage.draw = function(id, cobj, x, y, w, h) {
  cobj.context.drawImage(this.holder[id], x, y, w, h);
}
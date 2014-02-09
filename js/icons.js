var icons = (function () {
  // Provide an interface for managing icon objects.
  // An icon object is an object which holds a title and a function to draw
  // itself given a canvas context, width, and height.

  var iconList = [];

  return {
    get: function (index) {
      if (index < 0 || iconList.length <= index)
        return null;
      return iconList[index];
    },

    add: function(icon) {
      iconList.push(icon);
    },

    forEach: function (callback, thisArg) {
      return iconList.forEach(callback, thisArg);
    }
  };

})();

;(function () {
  // Enumerate all icons. Actual drawing happens here.

  icons.add({
    title: 'Lambdar Main Icon',
    draw: function (ctx, width, height) {
      ctx.fillStyle = '#2F8DBC';
      ctx.font = 'normal bold 150px \"GFS Didot\"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('λr.', width / 2 , height / 2);
    }
  });

})();

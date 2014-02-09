var init = (function ($, icons) {
  // Initialize a page which describes the given icons.
  // This function must be called after loading all fonts used for drawing
  // icons.

  // Width and height of thumbnails for icons.
  var thumbnailWidth = 220;
  var thumbnailHeight = 220;

  // A root element of icons.
  var iconsRoot = $('#icons');

  // Create elements for describing a given icon and append it to the root.
  var addIcon = function (icon) {
    var iconWrapper = $('<div class=\"pure-g-r icon-wrapper\"></div>');

    var thumbnail = $('<canvas>' + icon.title + '</canvas>');
    thumbnail.attr('width', thumbnailWidth);
    thumbnail.attr('height', thumbnailHeight);
    icon.draw(thumbnail.get(0).getContext('2d'),
      thumbnailWidth, thumbnailHeight);
    iconWrapper.append($('<div class=\"pure-u-1-2\"></div>').append(thumbnail));

    var desc = $('<div class=\"pure-u-1-2\"></div>');
    desc.append($('<h1>' + icon.title + '</h1>'));
    iconWrapper.append(desc);

    iconsRoot.append(iconWrapper);
  };

  return function () {
    icons.forEach(addIcon);
  };

})($, icons);

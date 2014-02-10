var init = (function (window, $, icons) {
  // Initialize a page which describes the given icons.
  // This function must be called after loading all fonts used for drawing
  // icons.

  // Width and height of thumbnails for icons.
  var thumbnailWidth = 220;
  var thumbnailHeight = 220;

  // Create elements for describing a given icon and append it to the root.
  var addIcon = function (icon) {
    // Generate a thumbnail for the icon.
    var thumbnail = $('<canvas/>')
      .text(icon.title)
      .attr('width', thumbnailWidth)
      .attr('height', thumbnailHeight);
    icon.draw(thumbnail.get(0).getContext('2d'),
      thumbnailWidth, thumbnailHeight);

    // Generate a function which exports the icon as PNG.
    var iconExporter = function (widthField, heightField) {
      return function () {
        var width = widthField.val();
        var height = heightField.val();

        var canvas = $('<canvas/>')
          .attr('width', width)
          .attr('height', height)
          .get(0);

        // Draw the icon of the given size.
        icon.draw(canvas.getContext('2d'), width, height);

        // Simply assigning data URL to `window.location` doesn't work
        // if this function is called on submit event.
        window.setTimeout(function () {
          window.location = canvas.toDataURL('image/png');
        }, 1);
      };
    };

    // Generate description and exportation form for the icon.
    var desc = $('<div class="icon-desc"></div>').append(
      $('<h1/>')
        .text(icon.title)
    ).append(
      $('<form class="pure-form pure-form-aligned"></form>')
        .attr('action', '#').append(
          $('<fieldset/>').append(
            $('<div class="pure-control-group"></div>').append(
              $('<label class="icon-form-label">Width</label>')
            ).append(
              $('<input type="number"/>')
                .val(thumbnailWidth)
            )
          ).append(
            $('<div class="pure-control-group"></div>').append(
              $('<label class="icon-form-label">Height</label>')
            ).append(
              $('<input type="number"/>')
                .val(thumbnailHeight)
            )
          ).append(
            $('<div class="pure-controls icon-controls"></div>').append(
              $('<button/>')
                .attr('type', 'submit')
                .addClass('pure-button')
                .addClass('pure-button-primary')
                .text('Export as PNG')
            )
          )
        )
    );

    // Bind icon exporter to the form.
    desc.find('form')
      .submit(iconExporter(
        desc.find('input').eq(0), desc.find('input').eq(1)
      ));

    // Attach them to the document.
    $('#icons').append(
      $('<div class="icon-wrapper"></div>').append(
        $('<div class="pure-g-r"></div>').append(
          $('<div class="pure-u-1-3"></div>').append(
            thumbnail
          )
        ).append(
          $('<div class="pure-u-2-3"></div>').append(
            desc
          )
        )
      )
    );
  };

  return function () {
    icons.forEach(addIcon);
  };

})(window, $, icons);

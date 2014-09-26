(function (win, doc, undefined)
{
  'use strict';

  var
    app = new win.Donde({

      idMap: 'js-map'

    , image: {
        width: 32
      , height: 32
      }
    })

  , getMarkers = function getMarkers ()
    {
      var
        xhr = null
      , markers = localStorage.getItem('markers.json');

      if (markers)
        app.addMarkers(JSON.parse(markers));

      else
      {
        xhr = new XMLHttpRequest();

        xhr.onload = function ()
        {
          markers = this.response;
          app.addMarkers(JSON.parse(markers));
          localStorage.setItem('markers.json', markers);
        };

        xhr.open('get', 'markers.json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
      }
    };

  // Customizing
  app.googleMarkers = [];

  app.addMarkers = function (markers)
  {
    var self = this
      , marker = null;

    Utils.each(markers, function (item)
    {
      marker = self.createMarker(item);

      marker.values = item.types;

      self.googleMarkers.push(marker);
    });

    return this;
  };

  app.toggleType = function (type)
  {
    var isHidden = false;

    Utils.each(app.googleMarkers, function (marker, index)
    {
      isHidden = !~marker.values.indexOf(type);

      if (marker.getVisible() !== !isHidden)
        marker.setVisible(!isHidden);
    });
  };

  doc.addEventListener('touchstart', function(){}, true);

  app.$('js-btn-initial').addEventListener('click', function (e)
  {
    app.panToInitialPosition();
  });

  app.$('js-nav').addEventListener('click', function (e)
  {
    var target = e.target;

    if (!target.classList.contains('active'))
    {
      Utils.each(target.parentNode.children, function (element)
      {
        if (element.classList && element.classList.contains('active'))
            element.classList.remove('active');
      });

      target.classList.add('active');

      app.toggleType(target.dataset.type);
    }
  });

  app.init();

  getMarkers();

}(window, document));

$(document).ready(function() {
  $.ajaxSetup({ cache: true });
  $.getScript('http://connect.facebook.net/en_US/sdk.js', function(){


    var appFb = {
        appId: '564719590342709',
        secret: '67546569ca7b7ed17af9d6b59811d2f4',
        accessToken:'CAAIBnAaUgDUBAA1jdit3Lu5wZBEwSEct7pgMS4rbmA5E2VcZBGKsT4kvYVml3rFxMb9H5iYM7yatPfwIHos30BFZCvgahRD914fwtcqxdiOejPiQBJJyhNVLO45ZCtAuUAqf63Km0yWiZBzangIKaZBDikJXdoHDwnamQraGjxSSw7ZAnyriZCGY', // 02-02-16
        version: 'v2.5' // or v2.0, v2.1, v2.2, v2.3
    }
    // console.log(FB);

    FB.setExtendedAccessToken = function() {

        FB.api('/oauth/access_token', 'POST',
        {
            'grant_type': 'fb_exchange_token',
            'clientid': appFb.appId,
            'client_secret': appFb.appSecret,
            'fb_exchange_token': appFb.accessToken

        },
        function(err,res) {
            if (err) console.log(err);
            if (res) console.log(res);
            appFb.accessToken = res.access_token;
        });
    }

    FB.init({
        appId: appFb.appId,
        accessToken: appFb.accessToken,
        version: appFb.version
    });


    var getPhotos = function () {
        FB.api(
        '/me',
        'GET',
        {
            "fields":"albums{name,photos{images, link, width, height, name}}",
            "access_token": appFb.accessToken
        },
        function(res) {

            //console.log(res);

            // Para cada Album
            if (res.error) {
                // Atualizando token
                console.log(' Error: '+res.error.message);

            }
            // console.log(res);
            for (a in res.albums.data) {
                album = res.albums.data[a];


                var div = "#photos";

                // Repete para todas as fotos do Album
                if (
                  album.name != 'Mobile Uploads' &&
                  album.name != 'Timeline Photos' &&
                  album.name != 'Profile Pictures' &&
                  album.name != 'Cover Photos'

                ){

									$(div).append(" \
                  <H3 style='margin-top: 20px; color: #4C4D3D !important;'> \
                    "+album.name+" \
                  </H3>");

                  for (p in album.photos.data) {

                      photos = album.photos.data[p];
                      // console.log(photos);

                      var size = 0; // Tamanho da foto
                      var proportion = 340/photos.width; // Largura fotos
                    //  var proportion = 300/photos.height; // Largura fotos

                    var tooltip;

                    if (!photos.name || photos.name== undefined)
                      tooltip = "";
                    else
                      tooltip = photos.name;

                    $(div).append(" \
                    <a href='"+photos.link+"'  title='"+tooltip+"'> \
                      <div style='display: inline-block' title='"+tooltip+"'> \
                        <img title='"+tooltip+"' style='color: black !important; margin: 10px'src='"+photos.images[size].source+"' height='"+photos.height*proportion+"' width='"+photos.width*proportion+"'></img> \
                      </div> \
                    </a>");

                    // $(div).append(" \
                    // <div class='mdl-tooltip mdl-tooltip--large' for='"+photos.id+"'> \
                    //     '"+photos.name+"' \
                    // </div>");
                  }
                  //break;
                  // console.log(album.name);
                }
            }
            // console.log(res);
        });
    }

    getPhotos();
  });
});

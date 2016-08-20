$(document).ready(function() {
  $.ajaxSetup({ cache: true });
  $.getScript('http://connect.facebook.net/en_US/sdk.js', function(){


    var appFb = {
        appId: '564719590342709',
        secret: '67546569ca7b7ed17af9d6b59811d2f4',
        accessToken:'CAAIBnAaUgDUBAA1jdit3Lu5wZBEwSEct7pgMS4rbmA5E2VcZBGKsT4kvYVml3rFxMb9H5iYM7yatPfwIHos30BFZCvgahRD914fwtcqxdiOejPiQBJJyhNVLO45ZCtAuUAqf63Km0yWiZBzangIKaZBDikJXdoHDwnamQraGjxSSw7ZAnyriZCGY', // 02-02-16
        version: 'v2.5' // or v2.0, v2.1, v2.2, v2.3
    }
    console.log(FB);

    FB.setExtendedAccessToken = function() {

        FB.api('/oauth/access_token', 'POST',
        {
            'grant_type': 'fb_exchange_token',
            'client_id': appFb.appId,
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
            "fields":"albums{name,photos{images, link}}",
            "access_token": appFb.accessToken
        },
        function(res) {

            //console.log(res);

            // Para cada Album
            if (res.error) {
                // Atualizando token
                console.log(' Error: '+res.error.message);
                
            }
            console.log(res);
            for (a in res.albums.data) {
                album = res.albums.data[a];
                // album = a;

                $("#home").append("<H1> "+album.name+"</H1>");

                for (p in album.photos.data) {
                photos = album.photos.data[p];
                $("#home").append("<a href='"+photos.link+"'><img style='margin: 20px'src='"+photos.images[0].source+"' height='300' width='400'></img></a>");
                }
                //break;
                // console.log(album.name);
            }
            console.log(res);
        });
    }

    getPhotos();
  });
});

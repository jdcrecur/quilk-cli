app.apiTester = {

    init: function(  ){
        if( $('.api-test').length > 0 ){
            app.apiTester.bindEvents();
        }
    },

    bindEvents: function(){
        $('.api-test').find('form').submit( function( e ){
            e.preventDefault();
            app.apiTester.runApiRequest();
        } );
    },

    runApiRequest: function(  ){
        var $cont = $('.api-test');
        $.get( $cont.find('input[name=route]').val(), function( data ) {

            if( typeof data === 'string' ) $cont.find('.api-result').html( $('<pre>').text(data) );
            else {
                renderjson.set_show_to_level('all');
                $cont.find('.api-result').html( renderjson( data ) );
            }
        });
    }
};
app.init_loader( app.apiTester.init );
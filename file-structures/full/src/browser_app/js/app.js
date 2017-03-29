var app = {

    init: function(){
        window.log = function( m ){
            console.log( m );
        }
    },

    init_loader: function( f ) {
        $(document).ready( f );
    }
};
app.init_loader( app.init );
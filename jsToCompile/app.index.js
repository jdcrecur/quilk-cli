app.index = {
    init: function(){
        app.index.bind_events();
    },
    bind_events: function(){
        $('.index form').submit(function( e ){
            e.preventDefault();

            app.index.submit_form( $(this) );

        });
    },
    submit_form: function( $form ){
        $.ajax({
            url: $form.attr('action'),

            data: $form.serialize(),
            success: function( resp ){
                console.log( resp );
            }
        });
    }
};
app.init_loader( app.index.init );
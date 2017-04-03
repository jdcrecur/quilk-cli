import $ from 'jquery';
import apiTestService from '../services/apiTestService';

let renderjson = require('renderjson');

export default class apiTester {

    constructor (){
        if( $('.api-test').length > 0 ) this.bindEvents();
        this.apiTestService = new apiTestService();
    }

    bindEvents ( ) {
        $('.api-test').find('form').submit( ( e ) => {
            e.preventDefault();
            this.runApiRequest();
        } );
    }

    runApiRequest ( ){
        let $cont = $('.api-test');

        this.apiTestService.setBasePath( $cont.find('input[name=base]').val() );

        this.apiTestService.testGet( $cont.find('input[name=route]').val() ).then(( data ) => {
            if( typeof data === 'string' )
                $cont.find('.api-result').html( $('<pre>').text(data) );
            else {
                renderjson.set_show_to_level('all');
                $cont.find('.api-result').html( renderjson( data ) );
            }
        }).catch( ( err ) => {
            console.error( err );
        });
    }
}
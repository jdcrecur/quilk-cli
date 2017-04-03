import _ from 'lodash';
import $ from 'jquery';
import router from './lib/router'

let app = {
    init:() => {
        $(document).ready( () => {
            app.set_globals();
            new router();
        } );
    },

    set_globals: () => {
        window.log = ( ) => {
            _.map( arguments, console.log);
        };
    }
};
app.init();
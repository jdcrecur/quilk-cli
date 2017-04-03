import $ from 'jquery';

export default class httpService {

    constructor () {
        this.basePath = '';
    }

    http ( method, route, data ) {
        return new Promise( ( resolve, reject ) => {
            $.ajax({
                url: this.basePath + route,
                method: method,
                data: data
            })
            .done( ( response ) => {
                let err = false;
                try{
                    if( !response.success ) err = true;
                    if( response.json ) response = response.json;
                    else if( response.html ) response = response.html;
                } catch( e ) {
                    console.log( e );
                }
                if( err ) reject( err );
                else {
                    resolve( response );
                }
            })
            .fail( ( response ) => {
                reject( response );
            } );

        } );
    }

    post ( route, data ) {
        return this.http( 'post', route, data );
    }

    get ( route, data ) {
        return this.http( 'get', route, data );
    }

    put ( route ) {
        return this.http( 'put', route, data );
    }

    del ( route ) {
        return this.http( 'delete', route, data );
    }
}
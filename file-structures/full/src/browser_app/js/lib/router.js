import _ from 'lodash';
import routes from '../routes';

export default class router {

    /**
     * Loops over each constant looking for any url matches and calls all their inits functions accordingly.
     */
    constructor() {
        let path = _.trimEnd( String( window.location.pathname ), '/' );

        _.forIn( routes, ( inits, key ) =>{

            if( this.path_match( path, key ) )
            {
                _.map( inits, ( init ) => {
                    this.init_eval( init );
                } );
            }
        } );
    }

    /**
     * Runs eval on the init string passed
     *
     * @param init
     */
    init_eval ( init ) {
        try {
            new init;
        } catch (e) {
            console.error( e );
        }
    }

    /**
     * Returns true if the provided path matches the key
     *
     * @param path
     * @param key
     * @returns {boolean}
     */
    path_match ( path, key ) {
        if(key.indexOf( '(' ) === -1) return this.compare(path, key);

        let match = false;
        _.map( this.key_to_paths( key ), ( k_path ) => {
            if( this.compare(path, k_path) ) match = true;
        } );

        return match;
    }

    /**
     * Takes a key from the constants and returns a numeric array of all possible paths
     *
     * @param key
     * @returns {[*]}
     */
    key_to_paths ( key ) {
        let key_parts = key.split( '(' );
        let ret = [ _.trimEnd( key_parts[ 0 ], '/' ) ];
        //walk over each provided segment in the () | separated params, ensuring the last ) char is stripped
        _.map( key_parts[ 1 ].slice( 0, -1 ).split( '|' ), ( seg ) => {
            ret.push( _.trimEnd( key_parts[ 0 ] + seg, '/' ) );
        } );
        return ret;
    }

    /**
     * Compares a given key and path. If the kay contains a : separated param this is removed first from the key and path before comparison.
     *
     * @param path
     * @param key
     */
    compare ( path, key ){

        key = _.trimEnd( key, '/' );
        if( key.indexOf(':') === -1 ) return (path === key);

        //we have found a key with a param, strip param from path and key, then re-compared
        key = _.trimEnd(key.split(':')[0], '/');

        //strip the trialing url segment
        let paths = path.split('/');
        paths.pop();

        path = _.trimEnd(paths.join('/'));

        return (path === key);
    }
}
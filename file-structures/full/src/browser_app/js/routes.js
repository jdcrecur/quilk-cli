import index from './controllers/index';
import apiTester from './controllers/apiTester';

/**
 * Example key:
 * '/some-route/(controller-a|controller-b|controller-b/param_a)'
 *
 * The above controller will call the array of controller classes provided if the incoming url pathname is any of the following list, but nothing more:
 * '/some-route/'
 * '/some-route/controller-a'
 * '/some-route/controller-b'
 * '/some-route/controller-b/param_a'
 */
export default {
    '/':     [ index ],
    '/app':  [ apiTester ]
};

import httpService from './httpService';

export default class apiTestService extends httpService {

    constructor() {
        super();
        this.basePath = '/api/';
    }

    setBasePath ( base ) {
        this.basePath = base;
    }

    testGet( path ) {
        return this.get( path );
    }
}
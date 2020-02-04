import { Species } from './species';
export default class SpeciesService {
    constructor() {
        this.apiUrl = "https://myService.com/api/species/";
        this.data = {
            key = "naturallyAPIKey"
        };
    }

    getSpeciesById(id) {
        //Make GET API call with ID;
    }

    _parseSpecies({id,
        kingdom,
        phylum,
        speciesClass,
        order,
        family,
        genus,
        subgenus}) {
    }
}
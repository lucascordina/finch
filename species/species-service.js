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

    getAllSpeciesFromStorage() {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', '../assets/data/speciesdata.json', true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                var speciesdata = JSON.parse(xobj.responseText);

                var mySpecies = [];
                speciesdata.forEach(species => {
                    mySpecies.push(new Species(
                        species.id,
                        species.kingdom,
                        species.phylum,
                        species.speciesClass,
                        species.order,
                        species.family,
                        species.genus,
                        species.subgenus,
                        species.species,
                        species.imageUrl,
                        species.imageLicenseHolder,
                        species.licenseType
                    ));
                });
                return mySpecies;
            }
        };
        xobj.send(null);
    }
}
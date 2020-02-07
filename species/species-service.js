import { Species } from './species.js';

export class SpeciesService {
    constructor() {
        // this.apiUrl = "https://myService.com/api/species/";
        // this.data = {
        //     key = "naturallyAPIKey"
        // };

        this.species = [];
        this.todaysSpecies = {
            speciesInternal: 10,
            speciesListener: function(val) {},
            set species(val) {
              this.speciesInternal = val;
              this.speciesListener(val);
            },
            get species() {
              return this.speciesInternal;
            },
            registerListener: function(listener) {
              this.speciesListener = listener;
            }
        };
        this._getAllSpeciesFromStorage();
    }

    getSpeciesById(id) {
        return this.species.find(x => x.id == id);
    }

    _getAllSpeciesFromStorage() {
        var currentInstance = this;
        return new Promise(function (resolve, reject) {
            var xobj = new XMLHttpRequest();
            
            xobj.overrideMimeType("application/json");
            xobj.open('GET', '../assets/data/speciesdata.json', true);
            xobj.onreadystatechange = function () {
                try {
                    if (xobj.readyState == 4 && xobj.status == "200") {
                        var speciesdata = JSON.parse(xobj.responseText);

                        var loadedSpecies = [];
                        speciesdata.forEach(species => {
                            loadedSpecies.push(new Species(
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
                                species.imageLicenseType
                            ));
                        });
                        currentInstance.species = loadedSpecies;
                        currentInstance.todaysSpecies.species = currentInstance.getSpeciesById(2541231656);
                        resolve(loadedSpecies);
                    }
                } catch(e) {
                    console.log(e);
                }
            }
            xobj.send(null);
    });
    }
}
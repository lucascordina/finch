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
        this.getSpeciesDescription();
        return this.species.find(x => x.id == id);
    }

    getSpeciesDescription() {
        var currentInstance = this;
        fetch('https://en.wikipedia.org/w/api.php?action=query&redirects=1&format=json&prop=extracts&exsentences=10&exlimit=1&explaintext=1&titles=cochlicella_barbara&origin=*')
            .then(response => response.json())
            .then(data => {
                let arr = Object.keys(data.query.pages).map((k) => data.query.pages[k])

                let x = currentInstance.todaysSpecies.species;
                x.wikipediaDescription = arr[0].extract;
                currentInstance.todaysSpecies.species = x;
            });
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
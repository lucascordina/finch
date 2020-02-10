import { Species } from './species.js';

export class SpeciesService {
    constructor() {
        this.wikiTemplateUrl = "https://en.wikipedia.org/w/api.php?action=query&redirects=1&format=json&prop=info|extracts&inprop=url&exsentences=6&exlimit=1&explaintext=1&origin=*";

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

    getTodaysSpecies() {
        return this.species[this._calculateDayNumber()];
    }

    //Generally used for curating content
    getSpeciesByIndex(index) {
        this.todaysSpecies.species = this.species[index];
        this.populateCurrentSpeciesFromWiki();
    }

    populateCurrentSpeciesFromWiki() {
        var currentInstance = this;
        var normalizedSpeciesTitle = currentInstance.todaysSpecies.species.species.replace(" ", "_"); 
        fetch(`${currentInstance.wikiTemplateUrl}&titles=${normalizedSpeciesTitle}`)
            .then(response => response.json())
            .then(data => {
                try {
                    let arr = Object.keys(data.query.pages).map((k) => data.query.pages[k])

                    let x = currentInstance.todaysSpecies.species;
                    x.wikipediaDescription = arr[0].extract;
                    x.wikipediaUrl = arr[0].fullurl;
                    currentInstance.todaysSpecies.species = x;
                } catch(e) {
                    console.log(e);
                }
            });
    }

    _getAllSpeciesFromStorage() {
        var currentInstance = this;
        return new Promise(function (resolve, reject) {
            var xobj = new XMLHttpRequest();
            
            xobj.overrideMimeType("application/json");
            xobj.open('GET', '../assets/data/speciesdatafinal.json', true);
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
                        console.log(loadedSpecies);
                        currentInstance.species = loadedSpecies;
                        currentInstance.todaysSpecies.species = currentInstance.getTodaysSpecies();
                        currentInstance.populateCurrentSpeciesFromWiki();
                        resolve(loadedSpecies);
                    }
                } catch(e) {
                    console.log(e);
                }
            }
            xobj.send(null);
    });
    }

    _calculateDayNumber() {
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        return day;
    }
}
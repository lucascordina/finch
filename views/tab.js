import { Species } from '../species/species.js';
    
    
var xobj = new XMLHttpRequest();
xobj.overrideMimeType("application/json");
xobj.open('GET', '../assets/data/occurrencedata.json', true);
xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
    var occurrencedata = (JSON.parse(xobj.responseText));
    console.log(occurrencedata);
    var uniqueSpecies = [];
    var uniqueSpeciesReal = [];
    occurrencedata.forEach(occurrence => {
        var isUnique = true;
        uniqueSpecies.forEach(uniqueSpec => {
            if(uniqueSpec == occurrence.acceptedScientificName) {
                isUnique = false;
            }
        });

        if(isUnique) {

    console.log('ey yo');
            uniqueSpeciesReal.push(new Species(
                occurrence.gbifID, occurrence.kingdom, occurrence.phylum, occurrence.class, occurrence.order, occurrence.family, occurrence.genus, occurrence.subgenus
            ));

            uniqueSpecies.push(occurrence.acceptedScientificName);
        }
    });
    console.log(uniqueSpeciesReal);
    }
};
xobj.send(null);
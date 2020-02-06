import { Species } from '../species/species.js';
    
// OCCURRENCE DATA LOAD FROM JSON    
// var xobj = new XMLHttpRequest();
// xobj.overrideMimeType("application/json");
// xobj.open('GET', '../assets/data/occurrencedata.json', true);
// xobj.onreadystatechange = function () {
//     if (xobj.readyState == 4 && xobj.status == "200") {
//     var occurrencedata = (JSON.parse(xobj.responseText));
//     console.log(occurrencedata);
//     var uniqueSpecies = [];
//     var uniqueSpeciesReal = [];
//     occurrencedata.forEach(occurrence => {
//         var isUnique = true;
//         uniqueSpecies.forEach(uniqueSpec => {
//             if(uniqueSpec == occurrence.acceptedScientificName) {
//                 isUnique = false;
//             }
//         });

//         if(isUnique && occurrence.species !== "") {

//     console.log('ey yo');
//             uniqueSpeciesReal.push(new Species(
//                 occurrence.gbifID, occurrence.kingdom, occurrence.phylum, occurrence.class, occurrence.order, occurrence.family, occurrence.genus, occurrence.subgenus, occurrence.species
//             ));

//             uniqueSpecies.push(occurrence.acceptedScientificName);
//         }
//     });
//     console.log(JSON.stringify(uniqueSpeciesReal));
//     }
// };
// xobj.send(null);


//SPECIES DATA LOAD FROM JSON
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
        console.log(speciesdata);
        console.log(mySpecies);
        console.log(JSON.stringify(mySpecies));
    }
};
xobj.send(null);
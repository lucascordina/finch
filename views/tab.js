import { SpeciesService } from '../species/species-service.js';
    
let localSpeciesService = new SpeciesService();
var todaysSpecies = localSpeciesService.todaysSpecies;

todaysSpecies.registerListener(function(val){
    document.getElementById("main-container").style.backgroundImage = 'url('+val.imageUrl+')';
    document.getElementById("species-name").textContent = val.species;
    document.getElementById("order-name").textContent = val.order;
    document.getElementById("family-name").textContent = val.family;
    
    if(val.wikipediaDescription !== undefined && val.wikipediaDescription !== "" && val.wikipediaDescription !== null) {
        document.getElementById("species-extract").innerHTML = `${val.wikipediaDescription} <a href="${val.wikipediaUrl}" target="_blank">Read More</a>`;
    }

    if(val.imageLicenseHolder == "" || val.imageLicenseHolder == null || val.imageLicenseHolder == undefined) {
        document.getElementById("attribution-section").classList.add('hidden');
    } else {
        document.getElementById("photo-author").textContent = val.imageLicenseHolder;
        document.getElementById("attribution-section").classList.remove('hidden');
    }
    if(val.imageLicenseType == "CC 2.0") {
        document.getElementById("copyright-span").classList.remove('hidden');
        document.getElementById("license").href = "https://creativecommons.org/licenses/by/2.0/";
        document.getElementById("license").textContent = val.imageLicenseType;
    } else if(val.imageLicenseType == "CC 3.0") {
        document.getElementById("copyright-span").classList.remove('hidden');
        document.getElementById("license").href = "https://creativecommons.org/licenses/by/3.0/";
        document.getElementById("license").textContent = val.imageLicenseType;
    } else if(val.imageLicenseType == "CC 4.0") {
        document.getElementById("copyright-span").classList.remove('hidden');
        document.getElementById("license").href = "https://creativecommons.org/licenses/by/4.0/";
        document.getElementById("license").textContent = val.imageLicenseType;
    } else {
        if(document.getElementById("copyright-span") != null) {
            document.getElementById("copyright-span").classList.add('hidden');
        }
    }
    
});

//CODE USED FOR CURATING
// document.addEventListener('keypress', nextImage);
// var currentSpeciesIncrement = 0;
// function nextImage(e) {
//     localSpeciesService.getSpeciesByIndex(currentSpeciesIncrement);
//     console.log(currentSpeciesIncrement);
//     currentSpeciesIncrement++;
// }
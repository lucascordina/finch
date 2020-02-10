import { SpeciesService } from '../species/species-service.js';
    
let localSpeciesService = new SpeciesService();
var todaysSpecies = localSpeciesService.todaysSpecies;

todaysSpecies.registerListener(function(val){
    console.log(val);
    document.getElementById("main-container").style.backgroundImage = 'url('+val.imageUrl+')';
    document.getElementById("species-name").textContent = val.species;
    document.getElementById("order-name").textContent = val.order;
    document.getElementById("family-name").textContent = val.family;
    document.getElementById("photo-author").textContent = val.imageLicenseHolder;
    document.getElementById("license").textContent = val.imageLicenseType;
    document.getElementById("species-extract").innerHTML = `${val.wikipediaDescription} <a href="${val.wikipediaUrl}" target="_blank">Read More</a>`;
    document.getElementById("license").href = "https://creativecommons.org/licenses/by/3.0/";
});

// CODE USED FOR CURATING
// document.addEventListener('keypress', nextImage);
// var currentSpeciesIncrement = 0;
// function nextImage(e) {
//     localSpeciesService.getSpeciesByIndex(currentSpeciesIncrement);
//     console.log(currentSpeciesIncrement);
//     currentSpeciesIncrement++;
// }
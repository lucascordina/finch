import { SpeciesService } from '../species/species-service.js';
    
let localSpeciesService = new SpeciesService();
var todaysSpecies = localSpeciesService.todaysSpecies;

todaysSpecies.registerListener(function(val){
    console.log(val);
    document.getElementById("main-container").style.backgroundImage = 'url('+val.imageUrl+')';
    document.getElementById("species-name").textContent = val.species;
    document.getElementById("order-name").textContent = val.order;
    document.getElementById("family-name").textContent = val.family;
});
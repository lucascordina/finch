import { SpeciesService } from '../species/species-service.js';
    
let localSpeciesService = new SpeciesService();
var todaysSpecies = localSpeciesService.todaysSpecies;

todaysSpecies.registerListener(function(val){
    console.log(val);
});
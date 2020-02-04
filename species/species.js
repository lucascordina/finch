export class Species {
    constructor(
        id,
        kingdom,
        phylum,
        speciesClass,
        order,
        family,
        genus,
        subgenus
    ) {
        this.id = id;
        this.kingdom = kingdom;
        this.phylum = phylum;
        this.kingdom.speciesClass = speciesClass;
        this.order = order;
        this.family = family;
        this.genus = genus;
        this.subgenus = subgenus;
    }
}
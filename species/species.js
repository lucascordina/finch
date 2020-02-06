export class Species {
    constructor(
        id,
        kingdom,
        phylum,
        speciesClass,
        order,
        family,
        genus,
        subgenus,
        species,
        imageUrl = "",
        imageLicenseHolder = "",
        licenseType = ""
    ) {
        this.id = id;
        this.kingdom = kingdom;
        this.phylum = phylum;
        this.speciesClass = speciesClass;
        this.order = order;
        this.family = family;
        this.genus = genus;
        this.subgenus = subgenus;
        this.species = species;
        this.imageUrl = imageUrl;
        this.imageLicenseHolder = imageLicenseHolder;
        this.licenseType = licenseType;
    }
}
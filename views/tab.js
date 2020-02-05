
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '../assets/data/occurrencedata.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        var occurrencedata = (JSON.parse(xobj.responseText));
        var uniqueSpecies = [];
        occurrencedata.forEach(occurrence => {
            var isUnique = true;
            uniqueSpecies.forEach(uniqueSpec => {
                if(uniqueSpec == occurrence.acceptedScientificName) {
                    isUnique = false;
                }
            });

            if(isUnique) {
                uniqueSpecies.push(occurrence.acceptedScientificName)
            }
        });

        console.log(uniqueSpecies);
      }
    };
    xobj.send(null);
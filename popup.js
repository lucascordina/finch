import { Species } from './species/species';
import { Occurrence } from './occurrence/occurrence';

let changeColor = document.getElementById('changeColor');

let species = new Species("adhuhsauda", "Animalia", "Arthropoda", "Insecta", "Hemiptera", "Pyrrhocoridea", "Pyrrhocoris");
    let occurrence = new Occurrence("asdasddsa", "adhuhsauda", "2020-01-10T23:58:00Z", "MT", "My Rights", true, 14.421668, 35.957812);

    alert(species);
    alert(occurrence);

  chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
  });

  changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  };
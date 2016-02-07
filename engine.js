var engine = function()
{"use strict;"}

engine.prototype = {
  items: [],

  api: null,

  speak: function()
  {
    var pepper = this;
    pepper.api.stop();
    response = "Fui na feira comprar " + this.items.join(',');
    response = response.replace(/\,([^,]*)$/,' e $1');
    console.info(response);
    chrome.tts.speak(response, {
      'lang': 'pt-BR',
      'rate': 1.0,
      onEvent: function(event) {
        if (event.type == 'end') {
          pepper.api.stop();
          pepper.api.start();
        }
      }
    });
  },

  listen: function()
  {
    var pepper = this;
    pepper.api = new webkitSpeechRecognition();
    pepper.api.continuous = true;
    pepper.api.interimResults = true;
    pepper.api.lang = "pt-BR";
    pepper.api.onresult = function(e){
      for(var i=e.resultIndex;i<e.results.length;i++){
        if(e.results[i].isFinal){
          string = e.results[i][0].transcript;
          console.log(string);
          if (! string) {
            return;
          }
          string = string.replace("Fui na feira comprar", "").trim(),
          string = string.replace(' e ', ' '),
          items = string.split(' ');
          lastItem = pepper.validateReceived(items);
          if (lastItem) {
            pepper.addItem(lastItem);
            pepper.getRandomItem() ? pepper.speak() : pepper.end("Você ganhou!");
          } else {
            pepper.end("Você perdeu!");
          }
        }
      }
    }

    return pepper.api.start();
  },

  validateReceived: function(items)
  {
    var lastItem = items.pop().trim();
    if (JSON.stringify(items) == JSON.stringify(this.items)) {
      return lastItem;
    } else {
      return false;
    }
  },

  end: function(message) {
    chrome.tts.speak(message, {lang: 'pt-BR'});
    console.info(message);
    this.items = [];
  },

  addItem: function(lastItem) {
    this.items.push(lastItem.trim());
    isAvailable = this.availableItems.indexOf(lastItem.trim());
    if (isAvailable > -1) {
      this.availableItems.splice(isAvailable, 1);
    }
  },

  getRandomItem: function()
  {
    var random = Math.round(Math.random() * (this.availableItems.length - 1));
    selectedItem = this.availableItems[random];
    if (selectedItem) {
      this.addItem(selectedItem);
      return selectedItem;
    } else {
      return false;
    }
  },

  availableItems: [
    'cenoura',
    'laranja',
    'alface',
    'pepino',
    'pastel',
    'banana',
    'uva',
    'maçã',
    'abacaxi',
    'berinjela',
    'caqui',
    'tomate',
    'pimentão',
    'almeirão',
    'atum'
  ],
};

window.onload = function()
{
  window.pepper = new engine();
  window.pepper.listen();
}

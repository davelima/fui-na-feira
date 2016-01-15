var engine = function()
{"use strict;"}

engine.prototype = {
  items: [],

  speak: function()
  {
    console.info("MÁQUINA: Fui na feira comprar " + this.items.join(','));
  },

  hear: function(string)
  {
    string = string.replace("Fui na feira comprar", "").trim(),
    items = string.split(',');
    lastItem = this.validateReceived(items);
    if (lastItem) {
      this.addItem(lastItem);
      this.getRandomItem();
      this.speak();
      return true;
    } else {
      this.end("You lose! :-D");
    }
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
    console.info(message);
    this.items = [];
  },

  addItem: function(lastItem) {
    this.items.push(lastItem.trim());
  },

  getRandomItem: function()
  {
    selectedItem = this.availableItems[Math.round(Math.random() * (this.availableItems.length - 1))];
    this.addItem(selectedItem);
    return selectedItem;
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
    'pêra'
  ],

  returnItems: function()
  {
    return this.items;
  }
};

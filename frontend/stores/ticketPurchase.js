var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var TicketPurchaseConstants = require('../constants/ticketPurchaseConstants.js');
var TicketPurchaseStore = new Store(AppDispatcher);

var _ticketPurchases = {};

var resetTicketPurchases = function (ticketPurchases) {
  console.log('resetTicketPurchases');
  console.log(["ticketPurchases", ticketPurchases]);
  _ticketPurchases = {};
  ticketPurchases.forEach(function (ticketPurchase) {
    _ticketPurchases[ticketPurchase.id] = ticketPurchase;
  });
  console.log(["_ticketPurchases", _ticketPurchases]);
};

var resetTicketPurchase = function (ticketPurchase) {
  _ticketPurchases[ticketPurchase.id] = ticketPurchase;
};

var removeTicketPurchase = function(ticketPurchase){
  console.log("ticketPurchasestore removeTicketPurchase");
  delete _ticketPurchases[ticketPurchase.id];
};

TicketPurchaseStore.all = function () {
  var ticketPurchases = [];
  for (var id in _ticketPurchases) {
    ticketPurchases.push(_ticketPurchases[id]);
  }
  return ticketPurchases;
};

TicketPurchaseStore.find = function (id) {
  return _ticketPurchases[id];
};

TicketPurchaseStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case TicketPurchaseConstants.TICKET_PURCHASES_RECEIVED:
      resetTicketPurchases(payload.ticketPurchases);
      TicketPurchaseStore.__emitChange();
      break;
    case TicketPurchaseConstants.TICKET_PURCHASE_RECEIVED:
      resetTicketPurchase(payload.ticketPurchase);
      TicketPurchaseStore.__emitChange();
      break;
    case TicketPurchaseConstants.TICKET_PURCHASE_REMOVED:
      console.log("ticketPurchase store case EVENT_REMOVED");
      removeTicketPurchase(payload.ticketPurchase);
      break;
  }
};

// TODO: Remove when done
window.TicketPurchaseStore = TicketPurchaseStore;

module.exports = TicketPurchaseStore;
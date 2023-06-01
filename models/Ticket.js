const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticket: {
    type: [[Number]],
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;

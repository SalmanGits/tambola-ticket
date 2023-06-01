const Ticket = require('../models/Ticket')
const { generateTicketNumbers, generateTicketId } = require('../utils/ticketGenerator')
const getTicket = async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  try {
    const totalCount = await Ticket.countDocuments({ id });
    const totalPages = Math.ceil(totalCount / limit);
    const skip = (page - 1) * limit;

    const tickets = await Ticket.find({ id })
      .skip(skip)
      .limit(limit);

    res.json({
      tickets,
      page,
      totalPages,
      totalCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}
const createTicket = async (req, res) => {

  try {
    const numTickets = req.body.numTickets;
    const tickets = [];

    for (let i = 0; i < numTickets; i++) {
      const ticketNumbers = generateTicketNumbers();
      const ticket = new Ticket({ id: generateTicketId(), ticket: ticketNumbers });
      tickets.push(ticket);
    }
    const savedTickets = await Ticket.insertMany(tickets);
    res.status(200).json(savedTickets.map(ticket => ticket.id));

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

module.exports = { getTicket, createTicket }
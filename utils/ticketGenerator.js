const generateTicketNumbers = () => {
  const ticket = Array.from({ length: 3 }, () => Array(9).fill(0));
  const numbers = Array.from({ length: 90 }, (_, index) => index + 1);
  for (let i = 0; i < 9; i++) {
    const columnNumbers = getRandomNumbersForColumn(i, numbers);

    ticket[0][i] = columnNumbers[0];
    ticket[1][i] = columnNumbers[1];
    ticket[2][i] = columnNumbers[2];
  }
let sortedTicket = sortTicketNumbers(ticket)

  return sortedTicket;
}

const getRandomNumbersForColumn = (columnIndex, numbers) => {
  const columnNumbers = [];
  while (columnNumbers.length < 3) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const number = numbers.splice(randomIndex, 1)[0];
    columnNumbers.push(number);
  }

  return columnNumbers;
}
const sortTicketNumbers = (ticketNumbers) => {
  const sortedTicket = ticketNumbers.map(column => column.sort((a, b) => a - b));
  return sortedTicket;
};

const generateTicketId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

module.exports = { generateTicketNumbers, generateTicketId }
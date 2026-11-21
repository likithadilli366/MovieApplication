
const BookingSummary = ({
  selectedSeats,
  ticketPrice,
  onConfirm,
}) => {
  const totalPrice = selectedSeats.length * ticketPrice

  return (
    <div>
      <h2>Booking Summary</h2>

      <p>
        Selected Seats:
        <strong>
          {selectedSeats.length > 0
            ? selectedSeats.join(', ')
            : ' No seats selected'}
        </strong>
      </p>

      <p>
        Number of Tickets:
        <strong> {selectedSeats.length}</strong>
      </p>

      <p>
        Price Per Ticket:
        <strong> ₹{ticketPrice}</strong>
      </p>

      <div>
        Total Amount: ₹{totalPrice}
      </div>

      <button
        onClick={onConfirm}
        disabled={selectedSeats.length === 0}
      >
        Confirm Booking
      </button>
    </div>
  )
}

export default BookingSummary

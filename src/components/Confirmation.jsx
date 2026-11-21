
const Confirmation = ({ booking, onClose }) => {
  if (!booking) {
    return null
  }

  return (
    <div>
      <div>✓</div>

      <h2>Booking Successful!</h2>

      <p>Your movie tickets have been booked successfully.</p>

      <p>
        <strong>Movie:</strong> Avengers: infinity War
      </p>

      <p>
        <strong>Seats:</strong> {booking.seats.join(', ')}
      </p>

      <p>
        <strong>Total Amount:</strong> ₹{booking.total}
      </p>

      <button onClick={onClose}>
        Done
      </button>
    </div>
  )
}

export default Confirmation

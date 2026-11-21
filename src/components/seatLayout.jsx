
const SeatLayout = ({
  seats,
  selectedSeats,
  onSeatClick,
}) => {
  const rows = ['A', 'B', 'C', 'D', 'E']

  return (
    <div>
      <h2>Select Your Seats</h2>

      <div>
        SCREEN THIS WAY
      </div>

      <div>
        {rows.map(row => (
          <div key={row}>
            <span>{row}</span>

            {seats
              .filter(seat => seat.row === row)
              .map(seat => {
                const isSelected =
                  selectedSeats.includes(seat.id)

                return (
                  <button
                    key={seat.id}
                    className={`seat ${
                      seat.status === 'booked'
                        ? 'booked'
                        : isSelected
                          ? 'selected'
                          : 'available'
                    }`}
                    disabled={seat.status === 'booked'}
                    onClick={() => onSeatClick(seat.id)}
                    title={`${row}${seat.number}`}
                  >
                    {seat.number}
                  </button>
                )
              })}
          </div>
        ))}
      </div>

      <div>
        <span><i className="available"></i> Available</span>
        <span><i className="selected"></i> Selected</span>
        <span><i className="booked"></i> Booked</span>
      </div>
    </div>
  )
}

export default SeatLayout

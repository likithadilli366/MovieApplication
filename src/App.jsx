import { useState } from 'react';
import MovieDetails from './components/MovieDetails.jsx'
import SeatLayout from './components/seatLayout.jsx'
import BookingSummary from './components/Bookingsummary.jsx'
import Confirmation from  './components/confirmation.jsx'
import './App.css'
const ticketPrice = 150
const createSeats = () => {
  const rows = ['A', 'B', 'C', 'D', 'E']

  return rows.flatMap((row, rowIndex) =>
    Array.from({ length: 8 }, (_, index) => ({
      id: `${row}${index + 1}`,
      row: row,
      number: index + 1,
      status: 'available',
    }))
  )
}
const getBookedSeats = () => {
  try {
    return JSON.parse(
      localStorage.getItem('bookedSeats')
    ) || []
  } catch {
    return []
  }
}

const App = () => {
  const [seats, setSeats] = useState(() => {
    const bookedSeats = getBookedSeats()

    return createSeats().map(seat => ({
      ...seat,
      status: bookedSeats.includes(seat.id)
        ? 'booked'
        : 'available',
    }))
  })

  const [selectedSeats, setSelectedSeats] = useState([])
  const [booking, setBooking] = useState(null)
  const handleSeatClick = seatId => {
    const clickedSeat = seats.find(
      seat => seat.id === seatId
    )

    if (!clickedSeat || clickedSeat.status === 'booked') {
      return
    }

    setSelectedSeats(prevSeats =>
      prevSeats.includes(seatId)
        ? prevSeats.filter(id => id !== seatId)
        : [...prevSeats, seatId]
    )
  }
  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      return
    }

    const total = selectedSeats.length * ticketPrice

    const newBooking = {
      seats: [...selectedSeats],
      total: total,
    }
    const updatedSeats = seats.map(seat =>
      selectedSeats.includes(seat.id)
        ? { ...seat, status: 'booked' }
        : seat
    )
    setSeats(updatedSeats)
    const allBookedSeats = updatedSeats
      .filter(seat => seat.status === 'booked')
      .map(seat => seat.id)

    localStorage.setItem(
      'bookedSeats',
      JSON.stringify(allBookedSeats)
    )

    setBooking(newBooking)
    setSelectedSeats([])
  }
  const handleCloseConfirmation = () => {
    setBooking(null)
  }

  const selectedSeatNames = selectedSeats

  return (
    <div>
      <MovieDetails />

      <div>
        <SeatLayout
          seats={seats}
          selectedSeats={selectedSeats}
          onSeatClick={handleSeatClick}
        />

        <BookingSummary
          selectedSeats={selectedSeatNames}
          ticketPrice={ticketPrice}
          onConfirm={handleConfirmBooking}
        />
      </div>

      <Confirmation
        booking={booking}
        onClose={handleCloseConfirmation}
      />
    </div>
  )
}

export default App

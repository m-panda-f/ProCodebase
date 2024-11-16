import React, { useState, useEffect } from "react";

// Generate time slots for a given day
const generateTimeSlots = (day) => {
  const slots = [];
  const startHour = 8; // Start from 8:00 AM
  const endHour = 13; // End at 1:00 PM (13:00 in 24-hour format)

  for (let hour = startHour; hour < endHour; hour++) {
    slots.push({ time: `${hour}:00`, isBooked: false });
    slots.push({ time: `${hour}:30`, isBooked: false });
  }
  slots.push({ time: `${endHour}:00`, isBooked: false });

  return slots;
};

// Format date to "YYYY-MM-DD"
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Get the first day of the month
const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

// Get the number of days in the month
const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const TimeBlock = () => {
  const [allBookings, setAllBookings] = useState({});
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Load time slots whenever the date changes
  useEffect(() => {
    const dateKey = formatDate(selectedDate);
    const day = selectedDate.getDay();

    // Generate new slots if no bookings exist for the selected date
    if (!allBookings[dateKey]) {
      setSlots(generateTimeSlots(day));
    } else {
      setSlots(allBookings[dateKey]);
    }
  }, [selectedDate, allBookings]);

  const handleBooking = (slotTime) => {
    const updatedSlots = slots.map((slot) =>
      slot.time === slotTime ? { ...slot, isBooked: true } : slot
    );

    const dateKey = formatDate(selectedDate);
    setSlots(updatedSlots);
    setAllBookings((prev) => ({
      ...prev,
      [dateKey]: updatedSlots,
    }));

    setSelectedSlot(slotTime);
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (newDate >= new Date() && newDate.getDay() !== 0) {
      setSelectedDate(newDate);
    }
  };

  const changeMonth = (direction) => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + direction,
      1
    );
    setCurrentMonth(newMonth);
  };

  // Render calendar days
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const today = new Date();

    const days = [];

    // Add empty days for the start of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} style={{ flex: "1" }} />);
    }

    // Add actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isPast = date < today;
      const isSunday = date.getDay() === 0;
      const isSelected = formatDate(date) === formatDate(selectedDate);

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          style={{
            flex: "1",
            padding: "10px",
            margin: "5px",
            textAlign: "center",
            cursor: isPast || isSunday ? "not-allowed" : "pointer",
            backgroundColor: isSelected ? "orange" : "#fff",
            color: isPast || isSunday ? "#ccc" : isSelected ? "#fff" : "#000",
            borderRadius: "5px",
            border: isSelected ? "none" : "1px solid #ccc",
          }}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Book an Appointment</h2>
      

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {/* Calendar Section */}
        <div style={{ flex: "1", border: "1px solid #ccc", borderRadius: "5px", padding: "20px" }}>
          <h3 style={{ textAlign: "center" }}>Select a Date</h3>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <button onClick={() => changeMonth(-1)} style={{ background: "none", border: "none", cursor: "pointer" }}>
              &larr;
            </button>
            <h4>{`${currentMonth.toLocaleString("default", {
              month: "long",
            })} ${currentMonth.getFullYear()}`}</h4>
            <button onClick={() => changeMonth(1)} style={{ background: "none", border: "none", cursor: "pointer" }}>
              &rarr;
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "5px",
            }}
          >
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: "5px 0",
                }}
              >
                {day}
              </div>
            ))}
            {renderCalendarDays()}
          </div>
        </div>

        {/* Time Slots Section */}
        <div style={{ flex: "1.5", border: "1px solid #ccc", borderRadius: "5px", padding: "20px" }}>
          <h3 style={{ textAlign: "center" }}>Available Time Slots</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {slots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => handleBooking(slot.time)}
                disabled={slot.isBooked}
                style={{
                  padding: "10px 20px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: slot.isBooked
                    ? "#ddd"
                    : selectedSlot === slot.time
                    ? "#4CAF50"
                    : "#fff",
                  color: slot.isBooked
                    ? "#888"
                    : selectedSlot === slot.time
                    ? "#fff"
                    : "#000",
                  cursor: slot.isBooked ? "not-allowed" : "pointer",
                }}
              >
                {slot.time} {slot.isBooked && "(Booked)"}
              </button>
            ))}
          </div>
        </div>

        {/* Service Details Section */}
        <div style={{ flex: "1", border: "1px solid #ccc", borderRadius: "5px", padding: "20px" }}>
          <h3 style={{ textAlign: "center" }}>Service Details</h3>
          <p style={{ textAlign: "center" }}>
            <strong>MANICURE</strong>
          </p>
          <p style={{ textAlign: "center" }}>
            {formatDate(selectedDate)}, {selectedSlot || "Select a Time Slot"}
          </p>
          <p style={{ textAlign: "center" }}>1 hr</p>
          <button
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: selectedSlot ? "pointer" : "not-allowed",
              width: "100%",
            }}
            disabled={!selectedSlot}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeBlock;

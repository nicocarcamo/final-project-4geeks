import React, { useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";

const TimePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState("10:00");

  const handleDateChange = (date) => {
    setStartDate(date);
  };
  const handleTimeChange = (time) => {
    setStartTime(time);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const eventDateTime = new Date(startDate.toString() + " " + startTime);
  };

  return (
    <>
      <DatePicker selected={startDate} onChange={handleDateChange} />
      <TimePicker onChange={handleTimeChange} value={startTime} />
    </>
  );
};

export default TimePicker;

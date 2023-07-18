import React, { useEffect, useState } from "react";

const DateTimeDisplay = () => {
  const [formattedDateTime, setFormattedDateTime] = useState("");

  const getFormattedDateTime = () => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      weekday: "short",
      month: "short",
      day: "numeric",
    };

    const now = new Date();
    return now.toLocaleString("en-US", options);
  };

  useEffect(() => {
    const updateDateTime = () => {
      setFormattedDateTime(getFormattedDateTime());
    };

    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <span>{formattedDateTime}</span>;
};

export default DateTimeDisplay;

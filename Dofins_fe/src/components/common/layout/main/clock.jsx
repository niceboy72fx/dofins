import React, { useState, useEffect } from "react";

function LiveDate() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div>
      <h2 className="text-white text-xs  m-0">{date.toDateString()}</h2>
    </div>
  );
}

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div>
      <p className="text-white font-bold text-md m-0">
        {time.toLocaleTimeString()}
      </p>
      <LiveDate />
    </div>
  );
}

export default Clock;


import React, { useState, useEffect } from 'react';

interface ClockProps {
  language: string;
}

export const Clock: React.FC<ClockProps> = ({ language }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="mt-4 text-sm text-slate-400 space-y-1">
      <p>{currentDate.toLocaleDateString(language, dateOptions)}</p>
      <p>
        {currentDate.toLocaleTimeString(language)} ({timeZone})
      </p>
    </div>
  );
};
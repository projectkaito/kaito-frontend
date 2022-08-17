import React from "react";

export interface ITimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface IUseTimer {
  timeLeft?: ITimeLeft;
  timeFinished: boolean;
}

export const useTimer = (futureTime?: number): IUseTimer => {
  const [timeFinished, setTimeFinished] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState<ITimeLeft | undefined>();

  React.useEffect(() => {
    const now = Date.now() / 1000;
    if (futureTime && now < futureTime) {
      setTimeLeft(
        getTimeLeft(futureTime - now) ?? {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      );
      setTimeFinished(false);
    } else {
      setTimeFinished(true);
      setTimeLeft(undefined);
    }

    const interval = setInterval(() => {
      const now = Date.now() / 1000;
      if (futureTime && now < futureTime) {
        setTimeLeft(
          getTimeLeft(futureTime - now) ?? {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          }
        );
        setTimeFinished(false);
      } else {
        setTimeFinished(true);
        setTimeLeft(undefined);
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [futureTime]);

  return { timeFinished, timeLeft };
};

export function getTimeLeft(
  delta: number
): { days: number; hours: number; minutes: number; seconds: number } | undefined {
  if (delta <= 0) return undefined;

  // calculate (and subtract) whole days
  let days = Math.floor(delta / 86400);
  delta -= days * 86400;
  days = parseInt(days.toString());

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  hours = parseInt(hours.toString());

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  minutes = parseInt(minutes.toString());

  // what's left is seconds
  var seconds = delta % 60;
  seconds = parseInt(seconds.toString());

  return { days, hours, minutes, seconds };
}

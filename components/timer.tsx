'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Timer() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const startTimer = (minutes: number) => {
    setTime(minutes * 60);
    setIsActive(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Clock className="h-5 w-5" />
          {isActive && <span className="ml-2">{formatTime(time)}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => startTimer(3)}>3 minutes</DropdownMenuItem>
        <DropdownMenuItem onClick={() => startTimer(5)}>5 minutes</DropdownMenuItem>
        <DropdownMenuItem onClick={() => startTimer(10)}>10 minutes</DropdownMenuItem>
        <DropdownMenuItem onClick={() => startTimer(15)}>15 minutes</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
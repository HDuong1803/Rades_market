import { HStack, Text } from "@chakra-ui/react";
import DateTimeDisplay from "./DateTimeDisplay";
import { Countdown } from "./Countdown";

const ShowCounter = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  return (
    <HStack px="0px" spacing="1.5px">
      <Text fontSize="14px" px="0px">{days}</Text>    
      <Text fontSize="14px">:</Text> 
      <Text fontSize="14px">{hours}</Text>     
      <Text fontSize="14px">:</Text> 
      <Text fontSize="14px">{minutes}</Text>     
      <Text fontSize="14px">:</Text> 
      <Text fontSize="14px">{seconds.toString().padStart(2, '0')}</Text>           
      <Text fontSize="14px">left</Text>
    </HStack>
  );
};

const CountdownTimer = ({ targetDate }: { targetDate: number }) => {
  const [days, hours, minutes, seconds] = Countdown(targetDate);
  return (
    <ShowCounter
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
  );
};

export default CountdownTimer;
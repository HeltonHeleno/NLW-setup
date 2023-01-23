import { Dimensions,TouchableOpacity, TouchableOpacityProps  } from "react-native";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import clsx from "clsx"
import dayjs from "dayjs";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 *2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);

interface Props extends TouchableOpacityProps{
  amountOfHabits?: number;
  amountCompleted?: number;
  date: Date;
}
export function HabitDay({amountOfHabits = 0, amountCompleted = 0, date, ...rest}: Props) {
  const amountAccomplisherPercentage = amountOfHabits > 0 ? generateProgressPercentage(amountOfHabits , amountCompleted) : 0; 
  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today);
  return(
    <TouchableOpacity 
      className={clsx("rounded-lg border-2 m1", {
        ["bg-zinc-900 border-zinc-800"] : amountAccomplisherPercentage === 0,
        ["bg-violet-900 border-l-violet-700"]: amountAccomplisherPercentage >0 && amountAccomplisherPercentage < 20,
        ["bg-violet-800 border-l-violet-600"]: amountAccomplisherPercentage > 20 && amountAccomplisherPercentage < 40,
        ["bg-violet-700 border-l-violet-500"]: amountAccomplisherPercentage > 40 && amountAccomplisherPercentage < 60,
        ["bg-violet-600 border-l-violet-500"]: amountAccomplisherPercentage > 60 && amountAccomplisherPercentage < 80,
        ["bg-violet-500 border-l-violet-400"]: amountAccomplisherPercentage > 80,
        ["border-white border-4"]: isCurrentDay
      })}
      style={{ width:DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
      {...rest}
    />
  )
}
import React from 'react';
import { getTheme } from '../../../utils/getTheme';
import { Reminder } from './reminder/Reminder';
import TimeAndTimer from './TimeAndTimer';

const TimeComponents: React.FC<{name: string}> = ({name}) => {
  const theme = getTheme();
  const { currentTheme } = theme;

  return (
  <div className="fill-all">
    <TimeAndTimer userName={name} />
    <Reminder theme={currentTheme} />
  </div>
)};

export default TimeComponents;

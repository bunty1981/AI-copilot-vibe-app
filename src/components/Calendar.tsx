import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths, parse, differenceInDays } from 'date-fns';
import EventModal from './EventModal';
import './Calendar.css';
import { Event } from '../App';

// Helper function to parse date strings as local dates (not UTC)
const parseLocalDate = (dateString: string): Date => {
  return parse(dateString, 'yyyy-MM-dd', new Date());
};

// Helper function to get event color based on duration
const getEventColor = (duration: number): string => {
  if (duration === 1) return '#646cff'; // blue
  if (duration === 2) return '#ff6b6b'; // red
  if (duration === 3) return '#51cf66'; // green
  if (duration <= 7) return '#ffd43b'; // yellow
  return '#868e96'; // gray
};

// Helper function to check if a day is within an event's date range
const isDateInEventRange = (day: Date, startDate: string, endDate: string): boolean => {
  const dayDate = parseLocalDate(format(day, 'yyyy-MM-dd'));
  const eventStart = parseLocalDate(startDate);
  const eventEnd = parseLocalDate(endDate);
  return dayDate >= eventStart && dayDate <= eventEnd;
};

interface CalendarProps {
  events: Event[];
  onAddEvent: (event: Omit<Event, 'id'>) => void;
  onUpdateEvent: (id: string, event: Omit<Event, 'id'>) => void;
  onDeleteEvent: (id: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ events, onAddEvent, onUpdateEvent, onDeleteEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>&lt;</button>
        <h2>{format(currentDate, 'MMMM yyyy')}</h2>
        <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>&gt;</button>
        <div className="view-buttons">
          <button onClick={() => setView('month')}>Month</button>
          <button onClick={() => setView('week')}>Week</button>
          <button onClick={() => setView('day')}>Day</button>
        </div>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="days-of-week">
        {days.map(day => <div key={day} className="day-header">{day}</div>)}
      </div>
    );
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    // First, build the position map for all days
    const dateToPosition = new Map<string, {row: number, col: number}>();
    let tempRow = 0;
    let tempCol = 0;
    let tempDay = startDate;
    while (tempDay <= endDate) {
      const dateKey = format(tempDay, 'yyyy-MM-dd');
      dateToPosition.set(dateKey, {row: tempRow, col: tempCol});
      tempDay = addDays(tempDay, 1);
      tempCol++;
      if (tempCol === 7) {
        tempCol = 0;
        tempRow++;
      }
    }

    // Now, process events and build the grid
    const spanningEvents: {event: Event, startCol: number, endCol: number, row: number, yOffset: number}[] = [];
    const multiDayEvents: Event[] = [];
    const rows = [];
    let row = 0;
    let col = 0;
    let day = startDate;
    let currentRowDays = [];

    while (day <= endDate) {
      const cloneDay = day;
      const dayEvents = events.filter(event => isDateInEventRange(cloneDay, event.startDate, event.endDate));

      const displayEvents: Event[] = [];
      dayEvents.forEach(event => {
        if (event.startDate !== event.endDate) {
          if (!multiDayEvents.includes(event)) {
            multiDayEvents.push(event);
          }
        } else {
          displayEvents.push(event);
        }
      });

      currentRowDays.push(
        <div
          key={day.toString()}
          className={`calendar-day ${!isSameMonth(day, monthStart) ? 'disabled' : ''} ${isSameDay(day, new Date()) ? 'today' : ''}`}
          onClick={() => handleDateClick(cloneDay)}
        >
          <span className="day-number">{format(day, 'd')}</span>
          {displayEvents.map(event => (
            <div key={event.id} className="event" onClick={(e) => { e.stopPropagation(); handleEventClick(event); }} style={{ background: getEventColor(1) }}>
              {event.name}
            </div>
          ))}
        </div>
      );

      day = addDays(day, 1);
      col++;
      if (col === 7) {
        rows.push(<div key={row} className="calendar-row">{currentRowDays}</div>);
        currentRowDays = [];
        col = 0;
        row++;
      }
    }

    if (currentRowDays.length > 0) {
      rows.push(<div key={row} className="calendar-row">{currentRowDays}</div>);
    }

    // Process multi-day events into spanning events per row
    for (const event of multiDayEvents) {
      const startPos = dateToPosition.get(event.startDate);
      const endPos = dateToPosition.get(event.endDate);
      if (!startPos) continue;
      const endRow = endPos ? endPos.row : tempRow - 1;
      for (let r = startPos.row; r <= endRow; r++) {
        const rowStartCol = r === startPos.row ? startPos.col : 0;
        const rowEndCol = r === endRow && endPos ? endPos.col : 6;
        spanningEvents.push({
          event,
          startCol: rowStartCol,
          endCol: rowEndCol,
          row: r,
          yOffset: 0
        });
      }
    }

    // Stagger overlapping events in the same row
    const rowEvents = new Map<number, {event: Event, startCol: number, endCol: number, row: number, yOffset: number}[]>();
    for (const se of spanningEvents) {
      if (!rowEvents.has(se.row)) rowEvents.set(se.row, []);
      rowEvents.get(se.row)!.push(se);
    }
    for (const events of rowEvents.values()) {
      events.forEach((se, index) => {
        se.yOffset = index * 1.4; // 1.4rem offset for each overlapping event
      });
    }

    return { rows, spanningEvents };
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setShowModal(true);
  };

  const handleEventClick = (event: Event) => {
    setEditingEvent(event);
    setSelectedDate(parseLocalDate(event.startDate));
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedDate(null);
    setEditingEvent(null);
  };

  const handleSaveEvent = (eventData: Omit<Event, 'id'>) => {
    if (editingEvent) {
      onUpdateEvent(editingEvent.id, eventData);
    } else {
      onAddEvent(eventData);
    }
    handleModalClose();
  };

  const handleDeleteEvent = () => {
    if (editingEvent) {
      onDeleteEvent(editingEvent.id);
      handleModalClose();
    }
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {view === 'month' && (
        <>
          {renderDaysOfWeek()}
          {(() => {
            const { rows, spanningEvents } = renderMonthView();
            return (
              <>
                <div className="calendar-body">
                  {rows}
                  <div className="spanning-events">
                    {spanningEvents.map(({event, startCol, endCol, row, yOffset}) => {
                      const duration = differenceInDays(parseLocalDate(event.endDate), parseLocalDate(event.startDate)) + 1;
                      return (
                        <div
                          key={`${event.id}-${row}`}
                          className="spanning-event"
                          style={{
                            left: `${(startCol / 7) * 100}%`,
                            width: `${((endCol - startCol + 1) / 7) * 100}%`,
                            top: `calc(${(row / 6) * 100}% + ${yOffset}rem)`,
                            background: getEventColor(duration)
                          }}
                          onClick={() => handleEventClick(event)}
                        >
                          {event.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })()}
        </>
      )}
      {/* TODO: Implement week and day views */}
      {showModal && selectedDate && (
        <EventModal
          date={selectedDate}
          event={editingEvent}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Calendar;
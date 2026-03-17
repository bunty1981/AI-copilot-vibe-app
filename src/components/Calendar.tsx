import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import EventModal from './EventModal';
import './Calendar.css';
import { Event } from '../App';

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

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const dayEvents = events.filter(event => isSameDay(new Date(event.date), cloneDay));
        days.push(
          <div
            key={day.toString()}
            className={`calendar-day ${!isSameMonth(day, monthStart) ? 'disabled' : ''} ${isSameDay(day, new Date()) ? 'today' : ''}`}
            onClick={() => handleDateClick(cloneDay)}
          >
            <span className="day-number">{format(day, 'd')}</span>
            {dayEvents.map(event => (
              <div key={event.id} className="event" onClick={(e) => { e.stopPropagation(); handleEventClick(event); }}>
                {event.name}
              </div>
            ))}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div key={day.toString()} className="calendar-row">{days}</div>);
      days = [];
    }
    return <div className="calendar-body">{rows}</div>;
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setShowModal(true);
  };

  const handleEventClick = (event: Event) => {
    setEditingEvent(event);
    setSelectedDate(new Date(event.date));
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
          {renderMonthView()}
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
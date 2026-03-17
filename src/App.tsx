import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import './App.css';

export interface Event {
  id: string;
  date: string; // ISO date string
  name: string;
  details?: string;
  creator: string; // hardcoded to 'User' for now
}

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  // Load events from localStorage on mount
  useEffect(() => {
    const storedEvents = localStorage.getItem('calendar-events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(events));
  }, [events]);

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent: Event = { ...event, id: Date.now().toString() };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (id: string, updatedEvent: Omit<Event, 'id'>) => {
    setEvents(events.map(event => event.id === id ? { ...updatedEvent, id } : event));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="app">
      <h1>Personal Calendar</h1>
      <Calendar
        events={events}
        onAddEvent={addEvent}
        onUpdateEvent={updateEvent}
        onDeleteEvent={deleteEvent}
      />
    </div>
  );
};

export default App;
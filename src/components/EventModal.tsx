import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './EventModal.css';
import { Event } from '../App';

interface EventModalProps {
  date: Date;
  event: Event | null;
  onSave: (event: Omit<Event, 'id'>) => void;
  onDelete: () => void;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ date, event, onSave, onDelete, onClose }) => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [startDate, setStartDate] = useState(format(date, 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(date, 'yyyy-MM-dd'));

  useEffect(() => {
    if (event) {
      setName(event.name);
      setDetails(event.details || '');
      setStartDate(event.date);
      setEndDate(event.date); // For now, assume single day
    } else {
      setName('');
      setDetails('');
      setStartDate(format(date, 'yyyy-MM-dd'));
      setEndDate(format(date, 'yyyy-MM-dd'));
    }
  }, [event, date]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventData: Omit<Event, 'id'> = {
      date: startDate,
      name,
      details: details || undefined,
      creator: 'User', // hardcoded
    };
    onSave(eventData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{event ? 'Edit Event' : 'Add Event'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date (optional):</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Event Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="details">Details:</label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button type="submit">{event ? 'Update' : 'Add'} Event</button>
            {event && <button type="button" onClick={onDelete} className="delete-btn">Delete</button>}
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
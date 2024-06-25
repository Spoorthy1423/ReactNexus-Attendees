
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './AttendeeList.css';

const AttendeeList = ({ attendees, deleteAttendee, setEditingAttendee }) => {
  return (
    <div>
      <h2>Attendees</h2>
      <TransitionGroup component="ul" className="attendee-list">
        {attendees.map((attendee) => (
          <CSSTransition key={attendee.id} timeout={500} classNames="attendee">
            <li className="attendee-item">
              <div className="attendee-details">
                <strong>{attendee.name}</strong> - {attendee.email} - {attendee.company}
              </div>
              <button className="edit-button" onClick={() => setEditingAttendee(attendee)}>Edit</button>
              <button className="delete-button" onClick={() => deleteAttendee(attendee.id)}>Delete</button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default AttendeeList;
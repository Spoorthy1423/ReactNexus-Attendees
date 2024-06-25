//for this i want to use 3 components => App, AttendeeList, AddAttendeeForm
//app is for main component
//AttendeeList will show the list of attendees
//AddAttendeeForm will be used to add new attendees


import React, { useState, useEffect } from 'react';
import AttendeeList from './components/AttendeeList';
import AddAttendeeForm from './components/AddAttendeeForm';
import './App.css';

const App = () => {
  const [attendees, setAttendees] = useState([]);
  const [filteredAttendees, setFilteredAttendees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAttendee, setEditingAttendee] = useState(null);

  useEffect(() => {
    fetch('/attendees.json')
      .then(response => response.json())
      .then(data => {
        setAttendees(data);
        setFilteredAttendees(data);
      });
  }, []);

  useEffect(() => {
    setFilteredAttendees(
      attendees.filter(attendee =>
        attendee.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, attendees]);

  const addAttendee = (attendee) => {
    const newAttendees = [...attendees, { id: attendees.length + 1, ...attendee }];
    setAttendees(newAttendees);
    setFilteredAttendees(newAttendees);
  };

  const deleteAttendee = (id) => {
    const newAttendees = attendees.filter(attendee => attendee.id !== id);
    setAttendees(newAttendees);
    setFilteredAttendees(newAttendees);
  };

  const editAttendee = (updatedAttendee) => {
    const newAttendees = attendees.map(attendee => 
      attendee.id === updatedAttendee.id ? updatedAttendee : attendee
    );
    setAttendees(newAttendees);
    setFilteredAttendees(newAttendees);
    setEditingAttendee(null);
  };

  return (
    <div className="App">
      <h1>ReactNexus Attendees</h1>
      <input
        type="text"
        placeholder="Search attendees"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <AddAttendeeForm 
        addAttendee={addAttendee} 
        editingAttendee={editingAttendee} 
        editAttendee={editAttendee} 
      />
      <AttendeeList 
        attendees={filteredAttendees} 
        deleteAttendee={deleteAttendee} 
        setEditingAttendee={setEditingAttendee} 
      />
    </div>
  );
};

export default App;

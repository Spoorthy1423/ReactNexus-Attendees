import React, { useState, useEffect } from 'react';

const AddAttendeeForm = ({ addAttendee, editingAttendee, editAttendee }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  useEffect(() => {
    if (editingAttendee) {
      setName(editingAttendee.name);
      setEmail(editingAttendee.email);
      setCompany(editingAttendee.company);
    } else {
      setName('');
      setEmail('');
      setCompany('');
    }
  }, [editingAttendee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && email.trim() && company.trim()) {
      if (editingAttendee) {
        editAttendee({ id: editingAttendee.id, name, email, company });
      } else {
        addAttendee({ name, email, company });
      }
      setName('');
      setEmail('');
      setCompany('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter attendee name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter attendee email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter attendee company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <button type="submit">{editingAttendee ? 'Edit Attendee' : 'Add Attendee'}</button>
    </form>
  );
};

export default AddAttendeeForm;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, resetForm } from '../formSlice';

function ContactForm() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    dispatch(resetForm());
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 360 }}>
      <div style={{ marginBottom: 8 }}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name || ''}
            onChange={handleChange}
          />
        </label>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email || ''}
            onChange={handleChange}
          />
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default ContactForm;

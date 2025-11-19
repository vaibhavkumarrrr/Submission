import React from 'react';
import GridContainer from '../componenets/GridContainer';

const Contact: React.FC = () => (
  <GridContainer>
    <div className="col-12">
      <div className="card">
        <h2>Contact</h2>
        <p style={{ color: '#94a3b8' }}>
          We’d love to hear from you. Whether you have a question, need support,
          or want to explore partnership opportunities, our team is here to help.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>Support</h3>
        <p style={{ color: '#94a3b8' }}>
          Email: <strong>support@example.com</strong><br/>
          Our support team typically responds within 24 hours.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>Business Inquiries</h3>
        <p style={{ color: '#94a3b8' }}>
          Partnerships: <strong>partners@example.com</strong><br/>
          Sales & Demos: <strong>sales@example.com</strong>
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>Follow Us</h3>
        <ul style={{ color: '#94a3b8', lineHeight: 1.8 }}>
          <li>Twitter: @yourcompany</li>
          <li>LinkedIn: Your Company Name</li>
          <li>GitHub: github.com/yourcompany</li>
        </ul>

        <h3 style={{ marginTop: '1.5rem' }}>Office</h3>
        <p style={{ color: '#94a3b8' }}>
          123 Finance Street<br/>
          Suite 450<br/>
          San Francisco, CA 94107
        </p>
      </div>
    </div>
  </GridContainer>
);

export default Contact;

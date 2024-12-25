import React, { useState } from 'react';
import './accordion.css';
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

function Accordion() {
  const [toggledState, setToggledState] = useState([false, false, false]);

  const handleToggle = (index) => {
    const newToggledState = toggledState.map((item, i) => i === index ? !item : item);
    setToggledState(newToggledState);
  };

  const accordionData = [
    {
      topic: "Facilitate Legal Aid Applications",
      answer: "Review and approve applications at the Legal Aid Centre. We also Coordinate grant issuance to the Bar Council for legal aid funding."
    },
    {
      topic: "Provide Legal Consultation",
      answer: "Manage the assignment of lawyers through the Bar Council. We also ensure detailed case notifications and lawyer appointments are communicated back to the Legal Aid Centre."
    },
    {
      topic: "Offer Pro Bono Services",
      answer: "Oversee case disclosures and proceedings. Offer process lawyer fee payments upon case resolution. We Generate and provide comprehensive reports on various case and demographic data for analysis and record-keeping."
    }
  ];

  return (
    <div className="service-section">
      <div className="service-content-container">
        <h1>What We Do</h1>
        <div className="accordion-container">
          <div className="horizontal-line"></div>
          <div className="accordion-contents">
            {accordionData.map((item, index) => (
              <React.Fragment key={index}>
                <div 
                  className={`accordion-item ${toggledState[index] ? 'toggled' : ''}`} 
                  onClick={() => handleToggle(index)}
                >
                  <div className={`circle ${toggledState[index] ? 'circle-toggled' : ''}`}></div>
                  <p className='topic'>{item.topic}</p>
                  {toggledState[index] ? <FiMinus className='accordion-icon' /> : <GoPlus className='accordion-icon' />}
                </div>
                <div className={toggledState[index] ? 'answer show' : 'answer'}>
                  {item.answer}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
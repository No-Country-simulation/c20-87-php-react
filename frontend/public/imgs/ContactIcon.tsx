import * as React from "react";

interface PorpsComponents {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

const ContactIcon = ({ width = 50, height = 50, className, color = "#011238" }: PorpsComponents) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={color}
    className={`bi bi-envelope ${className}`}
  >
    <path d="M0 4a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm22 0H2v16h20V4zm-1.667 2L12 11.086 3.667 6H20.333zM12 12.914l-9.333-5.5v9.167h18.666V7.414L12 12.914z" />
  </svg>
);

export default ContactIcon;

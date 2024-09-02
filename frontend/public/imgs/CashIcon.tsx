
import * as React from "react"

interface PorpsComponents {
    width? : number
    height? : number
    className? : string
    color? : string
}


const CashIcon = ({width = 50 , height = 50 , className , color = "#011238" }:PorpsComponents) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width={width}
  height={height}
  viewBox="0 0 16 16"
  fill={color}
    className={`bi bi-cash-stack ${className}`}
  >
    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
    <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z" />
  </svg>
)
export default CashIcon

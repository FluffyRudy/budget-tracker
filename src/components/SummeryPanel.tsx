// SummeryPanel.tsx
import React from "react";

export function SummeryPanel({
  label,
  value,
}: {
  label: string;
  value: number;
}): React.JSX.Element {
  return (
    <div className='budget-summery font-mono'>
      <h2 className='font-extralight'>{label}</h2>
      <p className='font-extrabold'>NRs {value}</p>
    </div>
  );
}

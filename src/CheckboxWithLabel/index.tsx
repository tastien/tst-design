import React, { useState } from 'react';

type TProps = {
  labelOn: string;
  labelOff: string;
};

export function CheckboxWithLabel({ labelOn, labelOff }: TProps) {
  const [isChecked, setIsChecked] = useState(false);

  const onChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      {isChecked ? labelOn : labelOff}
    </label>
  );
}

import { DateSelectFilter } from '@tastien/tstd';
import React from 'react';

const App = () => (
  <DateSelectFilter
    type="quick"
    defaultDateType="DAY_7"
    picks={[
      'DAY_7',
      'DAY_15',
      'DAY_30',
      'CURRENT_WEEK',
      'WEEK',
      'MONTH',
      'CURRENT_MONTH',
      'LAST_MONTH',
      'CUSTOM',
      'DATE',
    ]}
  />
);

export default App;

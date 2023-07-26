import React, { useState } from 'react';
import Select from './select/select';

function PagesizeComponent({ value, onChange }:any) {
    const [pageSize, setPage] = useState({pageSize:value});

  const dropdown=[
    {
      pageSize:5
    },
  {
    pageSize:10
  },
  {
    pageSize:15
  },
  {
    pageSize:20
  },
  
  ]

  return (
    <div>
       <Select
        name="page"
        onChange={(ev:any)=>{setPage({pageSize:ev.pageSize});onChange(ev.pageSize);}}
        getOptionLabel={(option: any) => option.pageSize}
        getOptionValue={(option: any) => option.pageSize}
        value={pageSize}
        options={dropdown}
      />
    </div>
  );
}

export default PagesizeComponent;

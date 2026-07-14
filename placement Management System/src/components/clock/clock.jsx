import React, { useState, useEffect } from 'react';
function Clock(){
    const [time, setTime] = useState(new Date());
useEffect(()=>{
    const timer = setInterval(()=>{
        setTime(new Date());
    },1000);
    return()=>{
        clearInterval(timer);
    }
},[]);
 return (
    <div>
      <h2>Current Time</h2>
      <h2>
        {time.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })}
      </h2>
    </div>
  );
}

export default Clock;


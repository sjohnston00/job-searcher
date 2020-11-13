import React from 'react'
import { useLocation } from "react-router-dom";

export default function Error404() {

  let location = useLocation();
  return (
    <div>
      ERROR 404 NOT FOUND. {location.pathname} is not a valid path
    </div>
  )
}

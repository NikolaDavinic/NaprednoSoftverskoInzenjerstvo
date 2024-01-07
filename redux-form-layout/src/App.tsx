import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { increment } from './features/counter/counterSlice'

function App() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Redux osnovni primer</h1>
      <div className="card">
        <Button
          onClick={() => dispatch(increment())}
          variant='outlined'
          sx={{
            backgroundColor: "gray"
          }}
        >
          count is {count}
        </Button>
      </div>
      <p className="read-the-docs">
        Primer aplikacije koja pokazuje Redux kontrolu stanja
      </p>
    </>
  )
}

export default App

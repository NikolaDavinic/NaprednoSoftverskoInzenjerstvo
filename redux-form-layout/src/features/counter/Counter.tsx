import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount, squared, squaredRoot, decrementByAmount, multiplyByAmount, divideByAmount } from "./counterSlice";
import { TextField } from "@mui/material";

function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const resetAll = () => {
    setAmount(0);
    dispatch(reset())
  }

  const [amount, setAmount] = useState<number | string>(0);

  return (
    <section>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+1</button>
        <button onClick={() => dispatch(decrement())}>-1</button>
        <button onClick={() => dispatch(squared())}>^2</button>
        <button onClick={() => dispatch(squaredRoot())}>1/2</button>
      </div>
      {/* <input value={amount} onChange={(event) => setAmount(Number(event.target.value))} /> */}
      <TextField type="number" value={amount} onChange={(event) => setAmount(Number(event.target.value))} sx={{backgroundColor: "white", margin: 2}} id="outlined-basic" s variant="filled" />
      <div>
        <button onClick={() => dispatch(incrementByAmount(amount))}>Add amount</button>
        <button onClick={() => dispatch(decrementByAmount(amount))}>Sub amount</button>
        <button onClick={() => dispatch(multiplyByAmount(amount))}>Miltiply by amount</button>
        <button onClick={() => dispatch(divideByAmount(amount))}>Divide by amount</button>
        <button onClick={resetAll}>Reset</button>
      </div>
    </section>
  );
}

export default Counter;

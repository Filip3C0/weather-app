

import Information from "./components/Information";
import "./input.css";

function App() {
 
  return (
    <>
      <div className=" flex flex-col justify-center h-screen bg-background bg-no-repeat bg-cover ">
        <h1 className=" font-rubi text-center py-10 text-5xl text-teal-50">
          Weather App
        </h1>
          <Information/>
      </div>
    </>
  );
}

export default App;

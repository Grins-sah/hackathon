import { useRef } from "react";

function App(){
  const teacherNameRef = useRef();
  const classRef = useRef();
  const sessionRef = useRef();
  const feedbackRef = useRef();
  const ratingRef = useRef();
  const ableRef = useRef();
  return <>
    <div className="bg-gray-800  w-vdh h-screen flex flex-col ">
      <input type="text" ref={teacherNameRef} name="" id="" placeholder="Name" className="text-3xl w-80  m-5 h-18"  />
      <input type="text" ref={classRef} name="" id="" placeholder="class" className="text-3xl w-80 m-5  h-18"  />
      <input type="text" ref={sessionRef} name="" id="" placeholder="session" className="text-3xl w-80 m-5 h-18"  />
      <input type="text" ref={feedbackRef} name="" id="" placeholder="feedback" className="text-3xl w-80 m-5  h-18"  />
      <input type="text" ref={ableRef} name="" id="" placeholder="able" className="text-3xl w-80  m-5 h-18"  />
      <input type="number" ref={ratingRef} name="" id="" placeholder="rating" className="text-3xl w-80 m-5  h-18"   />
      <button className="text-3xl bg-red-400 w-fit" onClick={()=>{
        console.log(teacherNameRef.current.value)
console.log(sessionRef.current.value)
console.log(ableRef.current.value)
console.log(ratingRef.current.value)
console.log(feedbackRef.current.value)
      }}>
        Click me 
      </button>
    </div>

  </>
  
}

export default App;

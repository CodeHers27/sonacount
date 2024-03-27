import React,{useState,useEffect}from 'react';
import Timer from '/Users/sonal/COUNTSZ/repo/src/timer.jsx';
import{ BsFillPlayFill,BsPauseFill,BsStopFill} from "react-icons/bs";
document.body.style.background="#282";

export default function Countdown  () {
    const [hours,setHours]=useState(0);
    const  [minutes,setMinutes]=useState(0);
    const[seconds,setSeconds]=useState(0);
    const [milliseconds,setMilliseconds]=useState(0);
    const [isRunning, setIsRunning]=useState(null);

    //end of timer
    const [showEndScreen, setShowEndScreen] = useState({
        show: false,
        message: "Event is live",
      });

    useEffect(()=>{
        let interval;
        if(isRunning){
            interval=setInterval(()=>{
                if(milliseconds>0){
                    setMilliseconds((milliseconds)=>milliseconds-1);
                }
                else if(seconds>0){
                    setSeconds((seconds)=>seconds-1);
                    setMilliseconds(99);
                }
                else if (minutes>0){
                    setMinutes((minutes)=>minutes-1);
                    setSeconds(59);
                    setMilliseconds(99);
                }
                else if (hours>0){
                    setHours((setHours)=>hours-1);
                    setMinutes(59);
                    setSeconds(59);
                    setMilliseconds(99);
                }
                
            },10);
        }
if(hours===0&& minutes===0 && seconds===0&&milliseconds===1){
setShowEndScreen({...showEndScreen,show:true});
resetTimer();
}



        return()=>clearInterval(interval);
    },[milliseconds,seconds, minutes,hours,isRunning,showEndScreen.show]);

//start Pause and stop timer
// Start
function startTimer() {
    if (hours !== 0 || minutes !== 0 || seconds !== 0 || milliseconds !== 0) {
      setIsRunning(true);
      setShowEndScreen({ ...showEndScreen, show: false });
    } else {
      window.alert("Add Time.");
    }
  }

  // Pause
  function pauseTimer() {
    setIsRunning(false);setShowEndScreen({ ...showEndScreen, show: false });

  }
  // Stop

  function stopTimer() {
    resetTimer();
    setShowEndScreen({ ...showEndScreen, show: false });
  }
//reset
  function resetTimer() {
    setIsRunning(false);
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }

//Handlers
const changeSeconds=(e)=>{
    setSeconds(e.target.value);

};
const changeHours=(e)=>{
    setHours(e.target.value);

};

const changeMinutes=(e)=>{
    setMinutes(e.target.value);

};

  return (
    <div>
        {showEndScreen.show && (
        <h1 className="title text-light"> {showEndScreen.message}</h1>
)}

        <Timer milliseconds={milliseconds} seconds={seconds} minutes={minutes} hours={hours}
        changeHours={changeHours} changeMinutes={changeMinutes} changeSeconds={changeSeconds} />
        <br/>
        {!isRunning && (
            <button className='btn btn-accept btn-lg' onClick={startTimer}> 
        <BsFillPlayFill/>
        
        </button>
        )}
      {isRunning && (
            <button className='btn btn-warning btn-lg' onClick={pauseTimer}> 
        <BsPauseFill/>
        
        </button>
        )} { " "}
        
            <button className='btn btn-danger btn-lg' onClick={stopTimer}> 
        <BsStopFill/>
        
        </button>
        
    </div>
  );
}

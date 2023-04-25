import { useState, useRef } from "react";

export default function Accordion(props) {
  // const [isShowing, setIsShowing] = useState(false);
  const [activeState, setActiveState] = useState("");
  const [activeHeight, setActiveHeight] = useState("0px");
  const contentRef = useRef(null)


  const toggle = () => {
    setActiveState(activeState === "" ? "active" : "");
    setActiveHeight(activeState === "active" ? "0px" : `${contentRef.current.scrollHeight + 100}px`)
  };

  return (
    <div className="w-full bg-black/50 border border-card-border shadow-accordion overflow-hidden backdrop-blur-btn rounded-lg mb-2.5">
      <button className="w-full pl-2.5 p-2 cursor-pointer text-left flex justify-between outline-none" onClick={toggle}>
        <p className="text-lg font-semibold">{props.title}</p>

        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#FFF" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" fill="white"></path> </svg>

      </button>

      <div ref={contentRef}
        style={{ maxHeight: `${activeHeight}` }}
        className="transition-all duration-500">
        <div className="px-2.5 pb-3">
          {props.content}
        </div>
      </div>
    </div>
  );
}

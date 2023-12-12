import React, { useReducer, useRef } from "react";

const reducer = (initState, action) => {
  switch (action.type) {
    case "ADD_TASK": {
      return [
        ...initState,
        { id: Date.now(), text: action.payload, isVisible: true },
      ];
    }
    case "TOGGLE_TASK": {
      return initState.map((ele) => {
        return ele.id == action.payload
          ? { ...ele, isVisible: !ele.isVisible }
          : ele;
      });
    }
    default:
      return initState;
  }
};
const TaskList = () => {
  const inputRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, []);

  const addTask = (e) => {
    dispatch({ type: "ADD_TASK", payload: e.target.value });
  };

  const toggleTask = (taskId) => {
    dispatch({ type: "TOGGLE_TASK", payload: taskId });
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    inputRef.current.focus();
  };

  return (
    <>
      <div>
        <input
          type="text"
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key == "Enter" && e.target.value !== "") {
              addTask(e);
            }
          }}
        />
        <div>
          {state.map((ele) => {
            return (
              <li key={ele.id}>
                {ele.isVisible ? (
                  <div>
                    {ele.text}
                    <button onClick={() => toggleTask(ele.id)}>Toggle</button>
                  </div>
                ) : (
                  <div>
                    The Content is hidden
                    <button onClick={() => toggleTask(ele.id)}>Toggle</button>
                  </div>
                )}
              </li>
            );
          })}
        </div>
      </div>
      <button onClick={scrollTop}>Get Back To Writing</button>
    </>
  );
};

export default TaskList;

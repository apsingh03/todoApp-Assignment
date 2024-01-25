import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToDoAsync,
  deleteToDoAsync,
  getToDoAsync,
  sortByIdASC,
  sortByIdDES,
} from "../redux/Slices/AddDataSlice";

import { RotatingLines } from "react-loader-spinner";

const HomePage = () => {
  const [taskName, settaskName] = useState("");
  const [priority, setpriority] = useState("");
  const [sorting, setsorting] = useState("");

  const getTodo = useSelector((state) => state.getData);
  const dispatch = useDispatch();

  //   console.log ( getTodo && getTodo );

  useEffect(() => {
    dispatch(getToDoAsync());
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // console.log("cliclked");

    console.log(taskName);
    console.log(priority);

    if (taskName === "") {
      alert("Please type Task Name");
    } else if (priority === "") {
      alert("Please select Priority");
    } else {
      dispatch(
        addToDoAsync({
          name: taskName,
          priority: priority,
        })
      );
    }

    // console.log ( taskName );
    // console.log ( priority );
  };

  const onClickSortings = () => {
    if (sorting === "Ascending") {
      dispatch(sortByIdASC());
    }

    if (sorting === "Descending") {
      dispatch(sortByIdDES());
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h3 className="text-center">Priority To-do list</h3>

        <form></form>
        <div id="inputBoxes" className="d-flex flex-row">
          <div style={{ width: "40%" }}>
            <input
              required
              type="text"
              onChange={(e) => settaskName(e.target.value)}
              className="form-control rounded-0"
              id="taskinfo"
              placeholder="Add a new Task"
            />
          </div>

          <div style={{ width: "40%" }}>
            <select
              required
              className="form-select rounded-0 "
              onChange={(e) => setpriority(e.target.value)}
            >
              <option>Select Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div style={{ width: "20%" }}>
            <input
              type="submit"
              onClick={(e) => onSubmitHandler(e)}
              className="btn btn-primary rounded-0"
              value="Add"
            />
          </div>
        </div>

        <div className="text-center">
          {getTodo.isLoading === true ? (
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : null}
        </div>

        <div className="my-3">
          <div className="  w-50">
            <select
              required
              className="form-select rounded-0 "
              onChange={(e) => setsorting(e.target.value)}
              onClick={onClickSortings()}
            >
              <option>Sorting </option>
              <option value="Ascending">Ascending </option>
              <option value="Descending">Descending</option>
            </select>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12 col-md-4  mb-3">
            {" "}
            <div>
              {" "}
              <h3>Low Priority</h3>{" "}
              {getTodo.data.data &&
                getTodo.data.data.map((data) => {
                  // console.log("gfh " + data.priority);

                  if (data.priority === "low") {
                    return (
                      <div
                        key={data.id}
                        className="d-flex flex-row justify-content-between align-items-center  border px-3 py-2  rounded-1"
                        title={data.id}
                      >
                        <div>
                          <h6>
                            {" "}
                            id - {data.id} , {data.name}
                          </h6>
                        </div>

                        <div>
                          <input
                            type="button"
                            className="btn btn-danger btn-sm"
                            value="Delete"
                            title="Delete It"
                            onClick={() =>
                              dispatch(deleteToDoAsync({ id: data.id }))
                            }
                          />
                        </div>
                      </div>
                    );
                  }
                })}
            </div>{" "}
          </div>
          <div className="col-12 col-md-4 mb-3">
            {" "}
            <div>
              {" "}
              <h3>Medium Priority</h3>{" "}
              {getTodo.data.data &&
                getTodo.data.data.map((data) => {
                  // console.log("gfh " + data.priority);

                  if (data.priority === "medium") {
                    return (
                      <div
                        key={data.id}
                        className="d-flex flex-row justify-content-between align-items-center  border px-3 py-2  rounded-1"
                        title={data.id}
                      >
                        <div>
                          <h6>
                            {" "}
                            id - {data.id} , {data.name}
                          </h6>
                        </div>

                        <div>
                          <input
                            type="button"
                            className="btn btn-danger btn-sm"
                            value="Delete"
                            title="Delete It"
                            onClick={() =>
                              dispatch(deleteToDoAsync({ id: data.id }))
                            }
                          />
                        </div>
                      </div>
                    );
                  }
                })}
            </div>{" "}
          </div>
          <div className="col-12 col-md-4 mb-3">
            {" "}
            <div>
              {" "}
              <h3>High Priority</h3>{" "}
              {getTodo.data.data &&
                getTodo.data.data.map((data) => {
                  // console.log("gfh " + data.priority);

                  if (data.priority === "high") {
                    return (
                      <div
                        key={data.id}
                        className="d-flex flex-row justify-content-between align-items-center border px-3 py-2  rounded-1"
                        title={data.id}
                      >
                        <div>
                          <h6>
                            {" "}
                            id - {data.id} , {data.name}
                          </h6>
                        </div>

                        <div>
                          <input
                            type="button"
                            className="btn btn-danger btn-sm"
                            value="Delete"
                            title="Delete It"
                            onClick={() =>
                              dispatch(deleteToDoAsync({ id: data.id }))
                            }
                          />
                        </div>
                      </div>
                    );
                  }
                })}
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

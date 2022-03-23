const express = require("express");
const router = express.Router();
const axios = require("axios");

// routes

// 1. get all todo list

const getTodos = async (req, res) => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  // console.log(response.data);
  if (response.statusText === "OK") {
    const allTodos = response.data;
    let requiredData = [];

    for (let index = 0; index < allTodos.length; index++) {
      let todoObj = {};
      todoObj.id = allTodos[index].id;
      todoObj.title = allTodos[index].title;
      todoObj.completed = allTodos[index].completed;
      requiredData.push(todoObj);
    }
    console.log("final array", requiredData);
    res.send({ data: requiredData });
  } else {
    console.log("failed to get the data");
    res.send({
      status: "failed",
      message: "failed to get requested data, something went wrong",
    });
  }
};

// 2. get all the user data along with their todo list
const getAllUserData = async (req, res) => {
  console.log("in function");
  const userId = req.query.id;
  if (userId) {
    console.log("user id is ", userId);
    const url = "https://jsonplaceholder.typicode.com/users/" + userId;
    const user = await axios.get(url);
    console.log("user is ", user.data);
    if (user.statusText === "OK") {
      const todoList = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      if (todoList.statusText === "OK") {
        let output = [user.data];
        console.log("first out", output);
        for (let index = 0; index < todoList.data.length; index++) {
          if (todoList.data[index].userId === user.id) {
            output.push(todoList.data[index]);
          }
        }
        console.log("output is ", output);
        res.send(output);
      } else {
        console.log("failed to get todo list");
        res.send({ status: "failed", message: "failed to get todo list" });
      }
    } else {
      res.send({ status: "failed", message: "failed to get user" });
    }
  } else {
    res.send({ status: "failed", message: "provided user id is wrong" });
  }
};

// 1. all todos
router.get("/todos", getTodos);

// 2. get all user data
router.get("/user-data", getAllUserData);

module.exports = router;

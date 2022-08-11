import React, { Component } from "react";
import "./Search.css";
import Display from "../Books/Books";

export default class Search extends Component {
  constructor() {
    super();
    this.state = { total: 0 };
  }
  changeHandler = (e) => {
    var query = e.target.value;
    fetch("https://reactnd-books-api.udacity.com/search", {
      method: "POST",
      headers: {
        Authorization: "whatever-you-want",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          list: res.books,
          total: res.books.length,
          value: "all",
        });
      })
      .catch((er) => console.log(er));
  };
  render() {
    return (
      <>
        <input
          id="searchbar"
          type="text"
          onChange={this.changeHandler}
          placeholder="Search for a book"
        ></input>
        <div id="head">{this.state.total} books found</div>
        {this.state.value && (
          <>
            <Display
              value={this.state.value}
              list={this.state.list}
              search={this.props.change}
            />
          </>
        )}
      </>
    );
  }
}

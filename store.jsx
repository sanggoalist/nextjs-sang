import React from "react";
import PropTypes from "prop-types";
export const Context = React.createContext(null);
export class Provider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: 0,
      cartList: [],
    };
    this.add = this.add.bind(this);
    this.reduce = this.reduce.bind(this);
    this.delete = this.delete.bind(this);
    this.inNumber = this.inNumber.bind(this);
  }
  componentDidMount() {
    let list = JSON.parse(localStorage.getItem("cartList"));
    if (list != null) {
      let number = list.map((value) => value.total).reduce((acc, v) => v + acc);
      this.setState({
        cart: number > 99 ? "99+" : number,
        cartList: list,
      });
    }
  }

  add = (ii) => {
    let list = this.state.cartList;
    let item = list.find((value) => value.id === ii.id);
    let number = 0;
    if (item !== undefined) {
      if (item !== null) {
        item.total = ++item.total;
      }
    } else {
      let i = {};
      i.id = ii.id;
      i.name = ii.name;
      i.price = ii.price;
      i.img = ii.img;
      i.total = 1;
      list.push(i);
    }
    number = list.map((value) => value.total).reduce((acc, v) => v + acc);
    this.setState({
      cart: number > 99 ? "99+" : number,
      cartList: list,
    });
    localStorage.setItem("cartList", JSON.stringify(list));
  };
  reduce = (ii) => {
    let list = this.state.cartList;
    let item = list.find((value) => value.id === ii.id);
    let number = 0;
    if (!list) return;
    if (item === undefined) return;
    item.total = item.total - 1;
    if (item.total === 0) {
      list = list.filter((value) => value.id !== ii.id);
    }
    number =
      list.length > 0 &&
      list.map((value) => value.total).reduce((acc, v) => v + acc);
    this.setState({
      cart: number > 99 ? "99+" : number,
      cartList: list,
    });
    if (list.length > 0) localStorage.setItem("cartList", JSON.stringify(list));
    else localStorage.removeItem("cartList");
  };
  delete = (ii) => {
    let list = this.state.cartList;
    let item = list.find((value) => value.id === ii.id);
    let number = 0;
    if (!list) return;
    if (item === undefined) return;
    list = list.filter((value) => value.id !== ii.id);
    number =
      list.length > 0 &&
      list.map((value) => value.total).reduce((acc, v) => v + acc);
    this.setState({
      cart: number > 99 ? "99+" : number,
      cartList: list,
    });
    if (list.length > 0) localStorage.setItem("cartList", JSON.stringify(list));
    else localStorage.removeItem("cartList");
  };
  inNumber = (ii, num) => {
    let list = this.state.cartList;
    let item = list.find((value) => value.id === ii.id);
    let number = 0;
    if (!list) return;
    if (item === undefined) return;
    if (item !== null) {
      item.total = num;
    }
    if (item.total === 0) {
      list = list.filter((value) => value.id !== ii.id);
    }
    number =
      list.length > 0 &&
      list.map((value) => value.total).reduce((acc, v) => v + acc);
    this.setState({
      cart: number > 99 ? "99+" : number,
      cartList: list,
    });
    if (list.length > 0) localStorage.setItem("cartList", JSON.stringify(list));
    else localStorage.removeItem("cartList");
  };
  render() {
    return (
      <Context.Provider
        value={{
          cart: this.state.cart,
          cartList: this.state.cartList,
          add: this.add,
          reduce: this.reduce,
          delete: this.delete,
          inNumber: this.inNumber,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

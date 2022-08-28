import React, { Component } from "react";
import "../styles/Category.css";
export class Category extends Component {
  render() {
    let categoriesAmounts = this.props.categoriesAmounts;
    let category = this.props.category;
    let amount = categoriesAmounts[category];
    let index = this.props.index + 1;
    return (
      <tr className="category">
        <td>{index}</td>
        <td>{category}</td>
        {amount < 0 ? (
          <td className="red">${amount}</td>
        ) : (
          <td className="green">${amount}</td>
        )}
      </tr>
    );
  }
}

export default Category;

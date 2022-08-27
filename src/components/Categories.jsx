import React, { Component } from "react";
import Category from "./Category";
import "./Categories.css";
import Title from "./Title";

export class Categories extends Component {
  findSumOfEachCategory = () => {
    let transactions = this.props.transactions;
    let categoriesTotalAmount = {};
    transactions.forEach((t) => {
      let category = t.category.toLowerCase();
      if (categoriesTotalAmount[category]) {
        categoriesTotalAmount[category] += t.amount;
      } else {
        categoriesTotalAmount[category] = t.amount;
      }
    });

    return categoriesTotalAmount;
  };

  render() {
    let categories = Object.keys(this.findSumOfEachCategory());

    return (
      <div className="categories">
        <Title title="Categories" />
        <div className="categories-container">
          <table border="1">
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Total Transactions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c, key) => (
                <Category
                  key={key}
                  category={c}
                  index={key}
                  categoriesAmounts={this.findSumOfEachCategory()}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Categories;

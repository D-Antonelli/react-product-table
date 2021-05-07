import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

/* I start from top to bottom as this is a small application */
/* In larger applications, starting from small to complex is preferable, with tests */
/* For start, no STATEs. Only static code passing props*/
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th>{category}</th>
    </tr>
  );
}

function ProductRow({ name, price, stocked }) {
  return (
    <tr>
      <td style={!stocked ? { color: "red" } : { color: "black" }}>{name}</td>
      <td>{price}</td>
    </tr>
  );
}

function ProductTable({ products }) {
  let current = "";
  const row = products.map((element, index) => {
    const { category, name, price, stocked } = element;
    if (category !== current) {
      current = category;
      return (
        <>
          <ProductCategoryRow category={category} key={category} />
          <ProductRow
            name={name}
            price={price}
            stocked={stocked}
            key={index}
          />
        </>
      );
    }
    return (
      <ProductRow
        name={name}
        price={price}
        stocked={stocked}
        key={index}
      />
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{row}</tbody>
    </table>
  );
}

function FilterableProductTable({ products }) {
  return (
    <div className="App">
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}

function SearchBar() {
  return (
    <form className="form">
      <input
        className="form__text"
        name="productSearch"
        type="text"
        value=""
        placeholder="Search..."
        onChange=""
      />
      <label>
        Only show products in stock
        <input
          className="form__checkbox"
          name="productsInStock"
          type="checkbox"
          checked=""
          onChange=""
        />
      </label>
    </form>
  );
}

const PRODUCTS = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById("root")
);

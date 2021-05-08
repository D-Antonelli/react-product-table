import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th>{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked? product.name : <span style={{color: "red"}}>{product.name}</span>
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  let current = "";
  let rows = [];

   products.forEach((item) => {
      if(!item.stocked && inStockOnly) {
        return;
      }

      if(!item.name.toUpperCase().startsWith(filterText.toUpperCase())) {
        return;
      }

      if(item.category !== current) {
        current = item.category;
        rows.push(<ProductCategoryRow category={item.category}/>)
      }
        rows.push(<ProductRow product={item}/>)
    
    }); 
  

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ onChange, filterText, inStock }) {
  return (
    <form className="form">
      <input
        className="form__text"
        name="filter"
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onChange(e)}
      />
      <label>
        Only show products in stock
        <input
          className="form__checkbox"
          name="inStock"
          type="checkbox"
          checked={inStock}
          onChange={(e) => onChange(e)}
        />
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStock, setInStock] = useState(false);

  function handleSearch(e) {
    const target = e.target;
    if (target.type === "text") {
      setFilterText(target.value);
    } else if (target.type === "checkbox") {
      setInStock(target.checked);
    }
  }

  return (
    <div className="App">
      <SearchBar
        onChange={(e) => handleSearch(e)}
        value={filterText}
        inStockOnly={inStock}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStock}
      />
    </div>
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

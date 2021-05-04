import React, { useState, useEffect } from "react";
import CustomButton from "../../atom/Button";
import InputText from "../../atom/InputText";
import firebase from "../../../config/Firebase";
import NavBar from "../../molecules/NavigationBar";

const Dashboard = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState([]);
  const [button, setButton] = useState("Save");
  const [selectedProduct, setSelectedProduct] = useState({});

  useEffect(() => {
    firebase
      .database()
      .ref("products")
      .on("value", (res) => {
        if (res.val()) {
          //Ubah data jadi Array
          const rawData = res.val();
          const productArr = [];
          Object.keys(rawData).map((item) => {
            productArr.push({
              id: item,
              ...rawData[item],
            });
          });
          setProduct(productArr);
        }
      });
  }, []);

  const resetForm = () => {
    setProductName("");
    setPrice("");
    setCategory("");
    setButton("Save");
    setSelectedProduct({});
  };

  const onSubmit = () => {
    const data = {
      productName: productName,
      category: category,
      price: price,
    };
    if (button === "Save") {
      //INSERT
      firebase.database().ref("products").push(data);
    } else {
      //UPDATE
      firebase.database().ref(`products/${selectedProduct.id}`).set(data);
    }

    resetForm();
  };

  const onUpdateData = (item) => {
    setProductName(item.productName);
    setCategory(item.category);
    setPrice(item.price);
    setButton("Update");
    setSelectedProduct(item);
  };

  const onDeleteData = (item) => {
    //DELETE
    firebase.database().ref(`products/${item.id}`).remove();
  };

  return (
    <div className="container-sm mb-4">
        <NavBar/>
      <div className="container mt-5">
        <h3>Dashboard</h3>
        <div className="col-6">
          <p>Product Name</p>
          <InputText
            class="form-control"
            placeholder="Type your product name"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
          />
          <p>Category</p>
          <InputText
            class="form-control"
            placeholder="Type the category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
          <p>Price</p>
          <InputText
            class="form-control"
            placeholder="Type the price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          <br />
          <button className="btn btn-primary" onClick={onSubmit}>
            {button}
          </button>
          {button === "Update" && (
            <button className="btn btn-secondary" onClick={resetForm}>
              Cancel Update
            </button>
          )}
        </div>
        <hr />
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {product.map((item) => (
              <tr key={item.id}>
                <td>{item.productName}</td>
                <td>{item.category}</td>
                <td>Rp.{item.price}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => onUpdateData(item)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDeleteData(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

import { useFormik } from "formik";
import "./App.css";
import * as yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import  {Popup}  from "./Popup";

function App() {
  //get all products

  const [products, setProducts] = useState([]);
  const [loadProduct, setloadProduct] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const togglePopup = () => {
    setOpen(!isOpen);
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/products`);

      console.log("reponse: ", response.data);
      setProducts(response.data.data);
    } catch (error) {
      console.log("error in getting all products", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/product/${id}`
      );
      console.log("Respone Deletion:", response.data);
      setloadProduct(!loadProduct);
    } catch (error) {
      console.log("Error Deleting Product:", error);
    }
  };

  const editMode = (product) => {
    setIsEditMode(!isEditMode);
    setEditingProduct(product);

    editFormik.setFieldValue("productName", product.name);
    editFormik.setFieldValue("productPrice", product.price);
    editFormik.setFieldValue("productDescription", product.description);
  };

  useEffect(() => {
    getAllProducts();
  }, [loadProduct]);

  const myFormik = useFormik({
    initialValues: {
      productName: "",
      productPrice: "",
      productDescription: "",
    },
    validationSchema: yup.object({
      productName: yup
        .string("Enter your Product Name")
        .required("Product name is required")
        .min(3, "please enter more then 3 characters ")
        .max(20, "please enter within 20 characters "),
      productPrice: yup
        .number("Enter product price")
        .required("Product price is required")
        .positive("Enter Valid price!")
        .min(3, "please enter more then 3 characters ")
        .max(20, "please enter within 20 characters "),
      productDescription: yup
        .string("Enter your Product Description")
        .required("Product Description is required")
        .min(3, "please enter more then 3 characters ")
        .max(400, "please enter within 20 characters "),
    }),
    onSubmit: (values) => {
      console.log("values: ", values);

      axios
        .post(`http://localhost:5001/product`, {
          name: values.productName,
          price: values.productPrice,
          description: values.productDescription,
        })
        .then((response) => {
          console.log("response: ", response.data);
          // getAllProducts();
          togglePopup();
          setloadProduct(!loadProduct);
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    },
  });

  const editFormik = useFormik({
    initialValues: {
      productName: "",
      productPrice: "",
      productDescription: "",
    },
    validationSchema: yup.object({
      productName: yup
        .string("Enter your Product Name")
        .required("Product name is required")
        .min(3, "please enter more then 3 characters ")
        .max(20, "please enter within 20 characters "),
      productPrice: yup
        .number("Enter product price")
        .required("Product price is required")
        .positive("Enter Valid price!")
        .min(3, "please enter more then 3 characters ")
        .max(20, "please enter within 20 characters "),
      productDescription: yup
        .string("Enter your Product Description")
        .required("Product Description is required")
        .min(3, "please enter more then 3 characters ")
        .max(400, "please enter within 20 characters "),
    }),
    onSubmit: (values) => {
      console.log("values: ", values);

      axios
        .put(`http://localhost:5001/product/${editingProduct.id}`, {
          name: values.productName,
          price: values.productPrice,
          description: values.productDescription,
        })
        .then((response) => {
          console.log("response: ", response.data);
          // getAllProducts();
          setloadProduct(!loadProduct);
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    },
  });

  return (
    <div>
      {isOpen && 
        // <Alert className="success" onClose={() => {togglePopup()}}>
        //   This is a success alert — check it out!
        // </Alert>
        <Popup
          content={
            <>
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet.</p>
            </>
          }
          handleClose={togglePopup}
        />
      }

      <form onSubmit={myFormik.handleSubmit}>
        <input
          id="productName"
          placeholder="Product Name"
          value={myFormik.values.productName}
          onChange={myFormik.handleChange}
        />
        {myFormik.touched.productName &&
        Boolean(myFormik.errors.productName) ? (
          <span style={{ color: "red" }}>{myFormik.errors.productName}</span>
        ) : null}

        <br />

        <input
          id="productPrice"
          placeholder="Product price"
          value={myFormik.values.productPrice}
          onChange={myFormik.handleChange}
        />
        {myFormik.touched.productPrice &&
        Boolean(myFormik.errors.productPrice) ? (
          <span style={{ color: "red" }}>{myFormik.errors.productPrice}</span>
        ) : null}

        <br />

        <input
          id="productDescription"
          placeholder="Product Description"
          value={myFormik.values.productDescription}
          onChange={myFormik.handleChange}
        />
        {myFormik.touched.productDescription &&
        Boolean(myFormik.errors.productDescription) ? (
          <span style={{ color: "red" }}>
            {myFormik.errors.productDescription}
          </span>
        ) : null}
        <button type="submit"> Submit </button>
      </form>

      <br />
      <br />

      <div>
        {products.map((eachProduct, i) => {
          return (
            <div className="products" key={i}>
              <h2>{eachProduct.name}</h2>
              <h3>{eachProduct.id}</h3>
              <h3>{eachProduct.price}</h3>
              <h4>{eachProduct.description}</h4>
              <button
                onClick={() => {
                  deleteProduct(eachProduct.id);
                }}
              >
                Delete
              </button>

              <button
                onClick={() => {
                  editMode(eachProduct);
                }}
              >
                Edit
              </button>

              {isEditMode && editingProduct.id === eachProduct.id ? (
                <div>
                  <form onSubmit={editFormik.handleSubmit}>
                    <input
                      id="productName"
                      placeholder="Product Name"
                      value={editFormik.values.productName}
                      onChange={editFormik.handleChange}
                    />
                    {editFormik.touched.productName &&
                    Boolean(editFormik.errors.productName) ? (
                      <span style={{ color: "red" }}>
                        {editFormik.errors.productName}
                      </span>
                    ) : null}

                    <br />

                    <input
                      id="productPrice"
                      placeholder="Product price"
                      value={editFormik.values.productPrice}
                      onChange={editFormik.handleChange}
                    />
                    {editFormik.touched.productPrice &&
                    Boolean(editFormik.errors.productPrice) ? (
                      <span style={{ color: "red" }}>
                        {editFormik.errors.productPrice}
                      </span>
                    ) : null}

                    <br />

                    <input
                      id="productDescription"
                      placeholder="Product Description"
                      value={editFormik.values.productDescription}
                      onChange={editFormik.handleChange}
                    />
                    {editFormik.touched.productDescription &&
                    Boolean(editFormik.errors.productDescription) ? (
                      <span style={{ color: "red" }}>
                        {editFormik.errors.productDescription}
                      </span>
                    ) : null}
                    <button type="submit"> Submit </button>
                  </form>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

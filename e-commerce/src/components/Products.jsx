import { Rating } from "react-simple-star-rating";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Products(props) {
  // const [basket, setBasket] = useState(0);
  const [rating, setRating] = useState(0);

  const handleClose = () => props.setShow(!props.show);
  const handleShow = () => props.setShow(!props.show);

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
    // other logic
  };

  //  Сагсанд хийх function
  function basket(props) {
    console.log("added to Basket ---->  ID = " + props.id);
    let basketQty = props.basket.length;
    let isAdded = false;

    if (basketQty > 0) {
      props.basket.map((a, index) => {
        if (a.id == props.id) {
          isAdded = true;
        }
      });
      if (isAdded) {
        props.setBasket(props.basket.filter((a) => a.id !== props.id));
      }
    }

    if (isAdded == false) {
      props.setBasket([
        ...props.basket,
        {
          id: props.id,
          title: props.title
        },
      ]);
    }
  }

  function inBasket(id) {
    let result = false;
    props.basket.map((a) => {
      if (a.id == id) {
        result = true;
      }
    })
    return result // утгаа буцаая
  }





  // Wishlist-д нэмэх function
  function addToWishlist(props) {
    // Wishlist-д нэмэх гэж оролдож буй бүтээгдэхүүний ID-г хэвлэж шалгаж байна.
    console.log("added to Wishlist ---->  ID = " + props.id);

    let wishlistQty = props.wishlist.length; // Wishlist-ийн хэмжээг хадгалах

    // Уг бүтээгдэхүүн Wishlist-д нэмсэн нэмээгүй эсэхийг шалгах Variable зарлаж байна.
    // анхны default утгыг False гээд авлаа.
    let isAdded = false;

    if (wishlistQty > 0) { // Wishlist -д ямар нэгэн бараа байх үед уг кодыг Execute хийнэ. 
      props.wishlist.map((a, index) => {
        if (a.id == props.id) {
          isAdded = true; // Уг бараа нь Wishlist-д олдвол True болгож өөрчлөнө
        }
      });
      if (isAdded) {
        // Хадгалсан байвал устгана. Учир нь энэ бараан дээр 2 дахь удаагаа дарж байгаа үед Устгах зорилгоор дарсан байх гэж үзнэ.
        props.setWishlist(props.wishlist.filter((a) => a.id !== props.id));
        // filter-ээр хайгаад уг ID-наас бусад барааг шүүж аваад SetWishlist state ашиглан хадгална.
      }
    }

    if (isAdded == false) { // хэрэв уг барааг нэмээгүй байсан бол Array-руу нэмнэ.
      props.setWishlist([
        ...props.wishlist,
        {
          id: props.id,
          title: props.title
        },
      ]);
    }
  }


  // Уг функц нь өгөдсөн ID бүхий бүтээгдэхүүн байгаа эсэхийг Wishlist array-гаас шалгана.
  // Буцаах утга нь Boolean (true or false)
  // Олдсон үед --> Тrue
  // Олдоогүй үед --> False

  function inWishlist(id) {
    let result = false; // анхны утгыг False гэж зарлаж байна. Олдоогүй үед автоматаар FALSE буцна.
    props.wishlist.map((a) => {
      if (a.id == id) {
        result = true; // олдчихвол утгаа TRUE болгоё. 
      }
    })
    return result // утгаа буцаая
  }


  return (
    <div className="product-card position-relative">
      <div className="wishlist-heart d-flex justify-content-end  position-absolute fs-3">
        <a
          onClick={() => {
            addToWishlist(props);
          }}
        >

          {/* HEART COLOR CHANGE */}
          {/* 
inWishlist function дуудаж өгөгдсөн ID-тай бүтээгдэхүүн Wishlist array-д байгаа эсэхийг
шалгана. 
Байвал True утга буцааж RED өнгөөр хэвлэнэ. 
Байхгүй үед False утга буцааснаар BLack өнгөөр хэвлэнэ. 

*/}
          <i
            className="bi bi-heart-fill"
            style={{ color: inWishlist(props.id) ? "red" : "black" }}
          ></i>

        </a>
      </div>
      <div className="position-relative">
        <div className="product-img-container " onClick={handleShow}>
          <img src={props.imgUrl} alt="image" />
        </div>

        <div className="product-text">
          <div className="title" onClick={handleShow}>
            {props.id}. <span className="space"></span>
            {props.title}
          </div>
          <div className="price" onClick={handleShow}>
            ${props.price}
          </div>
          <div className="product-ratings">
            <Rating
              onClick={handleRating}
              // onPointerEnter={onPointerEnter}
              // onPointerLeave={onPointerLeave}
              // onPointerMove={onPointerMove}
              initialValue={props.rating}
              allowFraction={true}
              size={15}
            />
          </div>

          {inBasket(props.id) ?
            <div className="basket-icon-green text-center text-light ">
              <a onClick={() => { basket(props); }}>
                <i className="bi bi-cart3"></i>
              </a>
            </div>
            :
            <div className="basket-icon text-center text-light">
              <a onClick={() => { basket(props); }}>
                <i className="bi bi-cart3"></i>
              </a>
            </div>}

          {/* <div className="basket-icon text-center text-light">
            <a onClick={() => { basket(props); }}>
              <i className="bi bi-cart3"></i>
            </a>
          </div> */}
        </div>
      </div>

      {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.id}
          {props.title}
          {props.imgUrl}
          {/* <img src={props.imgUrl} alt="product Image" /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Products;

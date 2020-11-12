import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import pic from "../assets/img/boardpic.jpeg";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    const response = await axios.get(
      "https://lereacteur-vinted-api.herokuapp.com/offers"
    );
    console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    console.log("rentre dans le use effect !!!");
    fetchData();
  }, []);
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
      <img style={{ height: 615, width: "100%" }} alt="pic" src={pic} />

      <div className="board">
        <p>Prêt à faire du tri dans vos placards ?</p>
        <Link to="/offer/:id">
          <button>Commencer à vendre</button>
        </Link>
      </div>
      <div className="presentation">
        {data.offers.map((offer, index) => {
          return (
            <div className="presentation2" key={index}>
              <span>
                <img
                  style={{ height: 50, width: 50, borderRadius: 25 }}
                  alt={offer.owner.account.username}
                  src={offer.owner.account.avatar.url}
                />
                {offer.owner.account.username}
              </span>

              <img
                style={{ height: 476, width: 310 }}
                alt={offer.product_name}
                src={offer.product_image.url}
              />
              <span>{offer.product_price} €</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
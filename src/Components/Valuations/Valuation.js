import React, { useState, useEffect, useRef } from "react";
import profile from "../../Images/profile.jpg";
import post from "../../Images/man.jpg";
import "./Valuation.css";
import { updateUser, getUser } from "../../Service/api";
import { Navigate } from "react-router-dom";

let grossCoins1 = 3100;
let leadCoins2 = 2100;

const Valuation = ({ authorized, username }) => {
  const [coins, setCoins] = useState({
    id: "",
    name: "",
    username: "",
    grossCoins: 0,
    leadCoins: 0,
  });

  const [usernames, setUsernames] = useState([]);
  const [hours, setHours] = useState("144");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  let interval = useRef();

  const startTimer = () => {
    const countDown = new Date("Mar 30, 2022").getTime();
    console.log("countDown1", countDown);

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDown - now;

      const timeHours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const timeMinutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const timeSeconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setHours(timeHours);
        setMinutes(timeMinutes);
        setSeconds(timeSeconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
  });

  useEffect(() => {
    getAllUsers();
  }, [coins]);

  const getAllUsers = async () => {
    const response = await getUser();
    console.log(response);
    let temp = 0;
    const jsond = response.data.reduce((total, value) => {
      return total.MaxGrossCoins > value.MaxGrossCoins ? total : value;
    });
    console.log("jsonsssssssss", jsond);
    setUsernames(jsond);
  };

  const updateCoins = () => {
    setCoins({
      id: usernames._id,
      name: username.name,
      username: username.username,
      grossCoins: grossCoins1,
      leadCoins: leadCoins2,
    });
    leadCoins2 += 100;
    grossCoins1 += leadCoins2;
    console.log(coins.leadCoins);
    console.log(coins.grossCoins);
    updateUser(coins);
  };

  if (authorized) {
    return (
      <div className="container">
        <div className="content_container">
          <div className="header_container">
            <div className="profile_name_container">
              <div className="profile_image_container">
                <img className="profile_image" src={profile} alt="Profile" />
              </div>
              <div className="name_date_container">
                <p className="username">{username.username}</p>
                <p className="date">6 june 2021, 12:10 pm</p>
              </div>
            </div>
            <div className="coins_container">
              <div className="coins">
                <i className="fas fa-coins"></i>
                <p className="coins_text">{usernames.grossCoins}</p>
                <p className="gross_coins">Gross Coins</p>
              </div>
              <div className="chart_line">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="menu_icon">
                <i className="fas fa-ellipsis-v"></i>
              </div>
            </div>
          </div>
          <div className="image_container">
            <img src={post} className="post_image" alt="Postimage" />
          </div>
          <div className="icons_container">
            <div className="icons">
              <i className="fas fa-bolt"></i>
              <i className="fas fa-comment"></i>
              <i className="fas fa-share"></i>
            </div>
            <div className="lead100">
              <button className="lead_btn" onClick={updateCoins}>
                Lead + 100 <span className="u_icon">U</span>
              </button>
            </div>
          </div>
          <p className="interested">50 interested</p>
          <div className="profile_hours_container">
            <div className="profile_name_container">
              <div className="profile_image_container">
                <img className="profile_image" src={profile} alt="Profile" />
              </div>
              <div className="name_date_container">
                <div className="coins">
                  <i className="fas fa-coins"></i>
                  <p className="coins_text">{usernames.leadCoins}</p>
                  <i className="fas fa-chart-line"></i>
                </div>
                <p className="other_username">{usernames.username}</p>
                <span className="gross_coins">in Lead</span>
              </div>
            </div>
            <div className="hours_container">
              <button className="hours_btn">{hours}</button>
              <span className="colon">:</span>
              <button className="hours_btn">{minutes}</button>
              <span className="colon">:</span>
              <button className="hours_btn">{seconds}</button>
            </div>
          </div>
          <p className="caption">
            @alferdo r.. If everything seems under control, you're going fast
            enough. Be Fast, Be Curious..!
          </p>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default Valuation;

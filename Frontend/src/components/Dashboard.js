import React, { useEffect, useState } from "react";
import "../styling/dashboard.css";
import Header from "./Header";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
  let location = useLocation();
  const user = location.state;
  console.log(user);
  const [alldata, setAlldata] = useState([]);
  const [displaydata, setDisplaydata] = useState();
  const navigate = useNavigate();


  useEffect(() => {
    const handleFetch = async () => {
      await fetch("http://localhost:8000/api/getalluser")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // const
          setAlldata(data);
          setDisplaydata(
            data.data?.slice(0, 8).sort(function (a, b) {
              return b.score - a.score;
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };

    handleFetch();
  }, []);

  // useEffect(() => {
  //   const temp = displaydata?.data?.slice(0,8);
  //   console.log(temp)
  //   temp?;

  //   setDisplaydata(temp)
  // }, [displaydata]);

  // useEffect(() => {
  //   const handleSubmit = async () => {
  //     await fetch("http://localhost:8000/api/getalluser")
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setAlldata(data);
  //         setDisplaydata(data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  //   handleSubmit();
  // }, [alldata]);
  const exitGame = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-body">
      <Header />
      <button className="dashboard-exit-game" onClick={exitGame}>
        Exit game
      </button>
      <div className="dashboard-box">
        <div className="dashboard-box-1-body">
          <div className="dashboard-box-1-content-1">
            <Link to="/game" state={{ user: user }}>
              <button className="game-start-button">Click to Start</button>
            </Link>
          </div>
          <div className="dashboard-box-1-content-2">
            <div className="rule-texts">
              This will be an online single-player card game that consists of 4
              different types of cards.
            </div>
            <ul>
              <li>Cat card 😼</li>
              <li>Defuse card 🙅‍♂️</li>
              <li>Shuffle card 🔀</li>
              <li>Exploding kitten card 💣</li>
            </ul>
            <div className="game-rules">The rules are as follows:</div>
            <ul>
              <li>
                If the card drawn from the deck is a cat card, then the card is
                removed from the deck.
              </li>
              <li>
                If the card is exploding kitten (bomb) then the player loses the
                game.
              </li>
              <li>
                If the card is a defusing card, then the card is removed from
                the deck. This card can be used to defuse one bomb that may come
                in subsequent cards drawn from the deck.
              </li>
              <li>
                If the card is a shuffle card, then the game is restarted and
                the deck is filled with 5 cards again.
              </li>
            </ul>
          </div>
        </div>

        <div className="dashboard-box-2-body">
          <div className="leaderboard-title">Leaderboard</div>

          <div className="leaderboard-status-box">
            {displaydata &&
              displaydata?.map((val, ind) => {
                return (
                  <div className="leaderboard-status" key={ind}>
                    <div className="leaderboard-status-name">
                      {val.username}
                    </div>{" "}
                    <div className="leaderboard-status-points">{val.score}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

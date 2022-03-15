import React from "react";

function Header() {
  var today = new Date();
  var options = { day: "numeric", weekday: "long", month: "long" };
  var date = today.toLocaleDateString("en-US", options);

  return (
    <header>
      <div className="logo">
        <img src="./note-icon.png" alt="" width="50px" />
        <h1 style={{ marginLeft: "20px" }}>Keeper app</h1>
      </div>
      <div className="date">
        <h4>{date}</h4>
      </div>
    </header>
  );
}

export default Header;

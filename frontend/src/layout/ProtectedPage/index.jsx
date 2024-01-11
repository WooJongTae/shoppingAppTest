import React, { useState } from "react";
import { Link } from "react-router-dom";
const ProtectPage = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {};
  return (
    <section>
      <div>
        <div>
          <div>
            <Link to="/">Logo</Link>
          </div>
          <div>
            <button onClick={ha}>{menu ? "-" : "+"}</button>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default ProtectPage;

import { Link } from "react-router-dom";
import { NotFoundContainer } from "./styles";

export const NotFound = () => {
  return (
    <NotFoundContainer>
      <div className="notfoundpage">
        <h2>Look like you're lost</h2>
        <p className="zoom-area">
          <b>the page</b> you are looking for not avaible!{" "}
        </p>

        <section className="error-container">
          <span>4</span>
          <span>
            <span className="screen-reader-text">0</span>
          </span>
          <span>4</span>
        </section>
        <Link to="/" className="more-link">
          Go To Home
        </Link>
      </div>
    </NotFoundContainer>
  );
};

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

import SearchQueryContext from "../../context/searchQueryContext";

import "./index.css";

const Header = ({ showSearchBar, absolute }) => {
  const { searchInput, updateSearchInput, getSearchQueryResponse } =
    useContext(SearchQueryContext);

  const [isOpened, setIsOpened] = useState(false);

  const onOpenMenu = () => setIsOpened(true);
  const onCloseMenu = () => setIsOpened(false);

  const onChangeInput = (event) => updateSearchInput(event.target.value);

  const renderSearchBar = () =>
    !showSearchBar ? (
      <Link to="search">
        <button className="search-btn">
          <HiOutlineSearch color="#fff" size={25} className="search-icon" />
        </button>
      </Link>
    ) : (
      <div className="search-bar-container">
        <input value={searchInput} onChange={onChangeInput} />
        <button
          className="search-btn bg-colored"
          onClick={getSearchQueryResponse}
        >
          <HiOutlineSearch color="#fff" size={20} className="search-icon" />
        </button>
      </div>
    );

  return (
    <header className={`header-container ${absolute ? "transparent" : ""}`}>
      <Link to="/">
        <img
          className="website-logo"
          src="https://res.cloudinary.com/dktwlx0dz/image/upload/v1698042823/Movies-app/movies-logo.svg"
          alt="website logo"
        />
      </Link>

      <nav className="nav-container">
        <ul className="desktop-nav-links">
          <li className="nav-link-list">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-link-list">
            <Link to="/popular" className="nav-link">
              Popular
            </Link>
          </li>
        </ul>

        <div className="btn-group">
          {renderSearchBar()}

          <Link to="/account" className="account-link">
            <button className="avatar-btn">
              <img
                src="https://res.cloudinary.com/dktwlx0dz/image/upload/v1698042823/Movies-app/male-avatar.png"
                alt="avatar"
                className="avatar-img"
              />
            </button>
          </Link>

          <button type="button" className="hamburger-btn" onClick={onOpenMenu}>
            <GiHamburgerMenu size={32} />
          </button>
        </div>
      </nav>

      {isOpened && (
        <nav className="mobile-nav-links">
          <ul>
            <li className="nav-link-list">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-link-list">
              <Link to="/popular" className="nav-link">
                Popular
              </Link>
            </li>
            <li className="nav-link-list">
              <Link to="/account" className="nav-link">
                Account
              </Link>
            </li>
          </ul>

          <button type="button" className="close-btn" onClick={onCloseMenu}>
            <AiFillCloseCircle size={25} />
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;

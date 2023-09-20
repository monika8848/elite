import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoginUser,
  login_state,
} from "../../../store/slices/auth/login_slice";
import { Dropdown, FormControl } from "react-bootstrap";
import { useRouter } from "next/router";
import useSearchHook from "../../../hooks/GeneralHooks/SearchHooks/search-hook";
import { cart_listing_state } from "../../../store/slices/cart-listing-page-slice/cart-listing-slice";
import useWishlist from "../../../hooks/WishListHooks/WishListHooks";
import LogoutList from "../../../services/api/auth/logout_api";
import { multiLanguageDataFromStore } from "../../../store/slices/general_slices/multilang-slice";
import { ClearToken } from "../../../store/slices/auth/token-login-slice";
const WebNavbar = ({
  navbarData,
  isLoading,
  navMenuclick,
  getSelectedLang,
  searchValue,
  setSearchValue,
  handleSearch,
  handleLanguageChange,
  handleCurrencyValueChange,
  selectedCurrencyValue,
  handleKeyDown,
  multiLanguagesData,
}: any) => {
  const { wishlistCount } = useWishlist();
  // console.log("multilanguage", multiLanguagesData);
  const cartlisting_data: any = useSelector(cart_listing_state);
  const [cartCount, setCartCount] = useState<number>();
  const [isShown, setIsShown] = useState<boolean>(false);
  const [isId, setId] = useState();
  const [LoggedIn, setLoggedIn] = useState<boolean>(false);
  const isLoggedIn: any = useSelector(login_state);
  const MultilanguageDataFromStore: any = useSelector(
    multiLanguageDataFromStore
  );
  // console.log("MultilanguageDataFromStore", MultilanguageDataFromStore);
  const dispatch = useDispatch();
  const handleHover = (id: any) => {
    setId(id);
    setIsShown(true);
  };

  useEffect(() => {
    setCartCount(cartlisting_data?.orderCount);
  }, [cartlisting_data]);

  useEffect(() => {
    if (isLoggedIn.user === "LoggedIn") {
      setLoggedIn(true);
    }
  }, [login_state]);

  const router = useRouter();
  // console.log("isLoggedIn12", LoggedIn);
  const handleLeave = (id: any) => {
    setId(id);
    setIsShown(false);
  };

  const handleClick = async () => {
    let obj = {
      Logouts: true,
    };

    dispatch(fetchLoginUser(obj));
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isDealer");
    localStorage.removeItem("isSuperAdmin");
    localStorage.removeItem("token");
    localStorage.removeItem("guest");
    dispatch(ClearToken());
    setLoggedIn(false);
    router.push("/login");

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  };

  const handleBeforeUnload = async () => {
    localStorage.clear();
    const logoutAPI = await LogoutList();
  };

  return (
    <div>
      <header className="header">
        <div className="header-middle">
          <div className="container">
            <div className="mobile-nav">
              <Link href="#" legacyBehavior>
                <a
                  className="mobile-menu-toggle  w-icon-hamburger"
                  aria-label="menu-toggle"
                  onClick={navMenuclick}
                ></a>
              </Link>
            </div>
            <div className="mx-2 my-2 logo_containers">
              <Link href="/" legacyBehavior>
                <Image
                  src="/assets/images/summit-logo-ree.png"
                  width={150}
                  height={60}
                  alt="logo"
                />
                {/* <h1 className="text-white text-uppercase">Summit</h1> */}
              </Link>
            </div>
            <div className="header-search  hs-expanded hs-round d-none d-md-flex input-wrapper rounded-searchbar">
              <input
                type="text"
                className="form-control "
                name="search"
                id="search"
                placeholder="Search in..."
                value={searchValue}
                onChange={(e: any) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                required
              />
              <button
                className="btn btn-search search_button"
                type="submit"
                onClick={handleSearch}
              >
                <i className="w-icon-search"></i>
              </button>
            </div>

            {/* <div className="resp-dropdown header-right mr-2 ">
              {LoggedIn === true && (
                <>
                  <div className="dropdown cart-dropdown cart-offcanvas text-white">
                    <Link href="/profile" legacyBehavior>
                      <a className=" cart-toggle label-down link">
                        <i className="w-icon-account"></i>
                        <span className="wishlist-label d-lg-show">
                          My Account
                        </span>
                      </a>
                    </Link>
                  </div>
                  <div className="dropdown cart-dropdown cart-offcanvas text-white mx-lg-3 ml-lg-3">
                    <Link href="/myOrder" legacyBehavior>
                      <a className=" cart-toggle label-down link">
                        <i
                          className="fa fa-check-circle-o"
                          aria-hidden="true"
                        ></i>
                        <span className="wishlist-label d-lg-show">
                          My Orders
                        </span>
                      </a>
                    </Link>
                  </div>
                </>
              )}

              <div className=" dropdown cart-dropdown cart-offcanvas text-white mx-lg-3">
                <Link href="/wishlist" legacyBehavior>
                  <a className=" cart-toggle label-down link">
                    <i className="w-icon-heart">
                      <span className="cart-count text-white">
                        {wishlistCount || 0}
                      </span>
                    </i>
                    <span className="wishlist-label d-lg-show">Wishlist</span>
                  </a>
                </Link>
              </div>
              <div className="dropdown cart-dropdown cart-offcanvas text-white mx-lg-4">
                <Link href="/cart" legacyBehavior>
                  <a className="cart-toggle label-down link">
                    <i className="w-icon-cart">
                      <span className="cart-count text-white">
                        {cartCount || 0}
                      </span>
                    </i>
                    <span className="cart-label">Cart</span>
                  </a>
                </Link>
              </div>
              {LoggedIn === true ? (
                <>
                  <div className="dropdown cart-dropdown cart-offcanvas text-white ml-lg-2">
                    <Link href="" legacyBehavior>
                      <a
                        className="cart-toggle label-down link"
                        onClick={handleClick}
                      >
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                        <span className="cart-label">LogOut</span>
                      </a>
                    </Link>
                  </div>
                </>
              ) : (
                <div
                  className="dropdown cart-dropdown cart-offcanvas text-white ml-0 ml-lg-2"
                  style={{ marginRight: "30px" }}
                >
                  <Link href="/login" legacyBehavior>
                    <a className="cart-toggle label-down link">
                      <i className="w-icon-account"></i>
                      <span className="cart-label">Login</span>
                    </a>
                  </Link>
                </div>
              )}
            </div> */}

            <div className=" dropdown cart-dropdown cart-offcanvas text-white mx-lg-3">
              <Link href="/wishlist" legacyBehavior>
                <a className=" cart-toggle label-down link">
                  <i className="w-icon-heart fs-1">
                    <span className="cart-count wishlist_count text-white">
                      {wishlistCount || 0}
                    </span>
                  </i>
                  <span className="wishlist-label d-lg-show">Wishlist</span>
                </a>
              </Link>
            </div>
            <div className="dropdown cart-dropdown cart-offcanvas text-white mx-lg-4 ml-3">
              <Link href="/cart" legacyBehavior>
                <a className="cart-toggle label-down link">
                  <i className="w-icon-cart fs-1">
                    <span className="cart-count text-white">
                      {cartCount || 0}
                    </span>
                  </i>
                  <span className="cart-label">Cart</span>
                </a>
              </Link>
            </div>

            <div className={`custom_dropdown`}>
              <Dropdown>
                {LoggedIn === true ? (
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="dropdown-icon dropdown_active_icon"
                  >
                    {/* <i
                    
                      className="fa fa-sign-out mt-2 fs-1"
                      aria-hidden="true"
                    ></i> */}
                    <i
                      className=" fa fa-user-o mt-5 mb-2  fs-1 logout-icon"
                      aria-hidden="true"
                    ></i>
                  </Dropdown.Toggle>
                ) : (
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="dropdown-icon dropdown_active_icon"
                  >
                    <i
                      className="w-icon-account mt-2 fs-1"
                      aria-hidden="true"
                    ></i>
                  </Dropdown.Toggle>
                )}

                {LoggedIn === true ? (
                  <Dropdown.Menu className="fs-4">
                    <Dropdown.Item className="nav_dropdown">
                      <Link href="/quick-order" className="text-dark">
                        Quick Order
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="nav_dropdown">
                      <Link href="profile" className="text-dark">
                        My Account
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item className="nav_dropdown">
                      <Link href="/myOrder" className="text-dark">
                        My Order
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="nav_dropdown text-dark"
                      onClick={handleClick}
                    >
                      {" "}
                      Logout{" "}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                ) : (
                  <Dropdown.Menu className="fs-3">
                    <Dropdown.Item className="nav_dropdown">
                      {" "}
                      <Link href="/login" className="text-dark ">
                        Login{" "}
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                )}
              </Dropdown>
            </div>

            {/* for mobile responsive */}
            {/* <div className={`resp-dropdown-avator custom_dropdown`}>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  style={{
                    paddingTop: "10px",
                    backgroundColor: "#0071dc",
                    color: "white",
                    border: "none",
                    boxShadow: "none",
                    margin: "0px",
                  }}
                >
                  <i className="fa fa-user-circle fs-1" aria-hidden="true"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {LoggedIn === true ? (
                    <>
                      <Dropdown.Item className="nav_dropdown">
                        <Link href="/profile" className="text-dark">
                          My Account
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Item className="nav_dropdown">
                        {" "}
                        <Link href="/myOrder" className="text-dark">
                          My Orders
                        </Link>
                      </Dropdown.Item>
                    </>
                  ) : (
                    ""
                  )}
                  <Dropdown.Item className="nav_dropdown">
                    {" "}
                    <Link href="/wishlist" className="text-dark">
                      Wishlist
                    </Link>{" "}
                  </Dropdown.Item>
                  <Dropdown.Item className="nav_dropdown">
                    {" "}
                    <Link href="/cart" className="text-dark">
                      Cart
                    </Link>{" "}
                  </Dropdown.Item>
                  {LoggedIn === true ? (
                    <>
                      <Dropdown.Item
                        className="nav_dropdown text-dark"
                        onClick={handleClick}
                      >
                        logout
                      </Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item className="nav_dropdown text-dark">
                        Login
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div> */}
          </div>
        </div>

        <div className="header-bottom sticky-content fix-top sticky-header has-dropdown">
          <div className="container">
            <div className="inner-wrap d-flex justify-content-between">
              <div className="header-left">
                <div className="dropdown category-dropdown">
                  <Link href="#" legacyBehavior>
                    <a
                      className="category-toggle text-white bg-primary text-capitalize"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="true"
                      data-display="static"
                      title="Browse Categories"
                    >
                      <i className="w-icon-category"></i>
                      <span>Browse Categories</span>
                    </a>
                  </Link>

                  <div className="dropdown-box text-default">
                    <ul className="menu vertical-menu category-menu">
                      {isLoading === "succeeded" &&
                        navbarData?.length > 0 &&
                        navbarData.map((items: any, index: number) => (
                          <li key={index}>
                            <a>
                              <i className="w-icon-tshirt2"></i>
                              {items.label}
                            </a>
                            <ul className="megamenu">
                              {items?.values?.length > 0 &&
                                items.values.map((items_val: any, i: any) => (
                                  <li key={i}>
                                    <Link
                                      href={`${items_val.url}?page=1&currency=${selectedCurrencyValue}`}
                                      legacyBehavior
                                    >
                                      <a>
                                        <h4 className="menu-title ">
                                          {items_val.label}
                                        </h4>
                                      </a>
                                    </Link>
                                    <hr className="divider" />
                                    <ul>
                                      {items_val.values.map(
                                        (new_val: any, index: number) => (
                                          <li key={index}>
                                            <Link
                                              href={`${new_val.url}?page=1&currency=${selectedCurrencyValue}`}
                                              legacyBehavior
                                            >
                                              <a>{new_val.label}</a>
                                            </Link>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </li>
                                ))}
                            </ul>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                <nav className="main-nav">
                  <ul className="menu active-underline">
                    {navbarData?.length > 0 &&
                      navbarData.map((items: any, i: any) => (
                        <li
                          className={`${isId === i && isShown ? "active" : ""}`}
                          onMouseEnter={(i) => handleHover(i)}
                          onMouseLeave={(i) => handleLeave(i)}
                          key={i}
                        >
                          <a className="menu_titlee">{items.name}</a>
                          <ul className="megamenu">
                            {items.values.map((items_val: any, index: any) => (
                              <li key={index}>
                                <Link
                                  href={`${items_val.url}?page=1&currency=${selectedCurrencyValue}`}
                                  legacyBehavior
                                >
                                  <a>
                                    <h4 className="menu-title menu_heading">
                                      {items_val.label}
                                    </h4>
                                  </a>
                                </Link>
                                <ul>
                                  {items_val.values.map(
                                    (new_val: any, i: any) => (
                                      <li className="menu_list" key={i}>
                                        <Link
                                          href={`${new_val.url}?page=1&currency=${selectedCurrencyValue}`}
                                          legacyBehavior
                                        >
                                          <a>{new_val.label}</a>
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                  </ul>
                </nav>
              </div>
            </div>
            <div className="mx-3">
              <select onChange={(e) => handleLanguageChange(e.target.value)}>
                {multiLanguagesData?.length > 0 &&
                  multiLanguagesData !== null &&
                  multiLanguagesData.map((lang: any) => {
                    return (
                      <option value={lang.lang_code}>{lang.lang_name}</option>
                    );
                  })}
              </select>
            </div>
            <div className="mx-3">
              <select
                // value={selectedLanguage}
                onChange={(e) => handleCurrencyValueChange(e.target.value)}
              >
                <option value="INR">₹</option>
                <option value="USD">$</option>
                <option value="EUR">€</option>
              </select>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default WebNavbar;

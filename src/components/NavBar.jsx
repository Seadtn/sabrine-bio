import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import i18n from "i18next";
import "../App.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const languages = {
  ar: { label: "العربية", flag: "/images/flags/arabic.jpg" },
  fr: { label: "Français", flag: "/images/flags/french.png" },
  en: { label: "English", flag: "/images/flags/english.jpg" },
};

const NavBar = () => {
  const { items } = useSelector((state) => state.cart);
  const { favorites } = useSelector((state) => state.favorite);

  const totalCartAmount = items.reduce((sum, item) => item.count + sum, 0);
  const totalFavoritesAmount = favorites.reduce((sum, item) => item.count + sum, 0);
  const [selectedLanguage, setSelectedLanguage] = useState("ar");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";

  const changeLanguage = (lng) => {
    setSelectedLanguage(lng);
    i18n.changeLanguage(lng);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div
        className="publicity"
        dir={isArabic ? "rtl" : "ltr"}
        lang={isArabic ? "ar" : "fr"}
      >
        <h4 className="text">
          {t("homePage.menu.livraisonText")}
          <p>{t("homePage.menu.livraisonPrix")}</p>
        </h4>
      </div>
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <h4>
              Sabrina <span>Bio</span>
            </h4>
          </Link>
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/sabrine-bio">{t("homePage.menu.home")}</Link>
            </li>
            <li>
              <Link to="/sabrine-bio/products">
                {t("homePage.menu.products")}
              </Link>
            </li>
            <li>
              <Link to="/sabrine-bio/contact">
                {t("homePage.menu.contact")}
              </Link>
            </li>
            <li className="dropdown" ref={dropdownRef}>
              <div className="selected-language" onClick={toggleDropdown}>
                <img
                  src={
                    process.env.PUBLIC_URL + languages[selectedLanguage].flag
                  }
                  alt={languages[selectedLanguage].label}
                />
                {languages[selectedLanguage].label}
                <i
                  className={`fas fa-chevron-${dropdownOpen ? "up" : "down"}`}
                />
              </div>
              {dropdownOpen && (
                <div className="language-dropdown">
                  {Object.entries(languages).map(([key, { label, flag }]) => (
                    <span key={key} onClick={() => changeLanguage(key)}>
                      <img src={process.env.PUBLIC_URL + flag} alt={label} />{" "}
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </li>
            <Link to="/sabrine-bio/favorite">
              <i class="fas fa-heart cart_icon ">
                <span id="itemsNum">{totalFavoritesAmount}</span>
              </i>
            </Link>
            <Link to="/sabrine-bio/cart">
              <i className="fas fa-shopping-cart cart_icon ">
                <span id="itemsNum">{totalCartAmount}</span>
              </i>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;

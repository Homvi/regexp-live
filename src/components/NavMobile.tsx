import { Link } from 'react-router-dom';
import logo from '../assets/exprilliant-with-text.webp';
import { changeLanguage } from '../features/language/languageSlice';
import { changeFontSize } from '../features/accessibility/accessibilitySlice';
import { LanguageCode, content } from '../../LanguageContent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';

const MobileNavbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    // TODO: BE - Handle logout
    //navigate user to welcome page
  };

  // TODO: BE - Handle user dynamically
  const loggedInUser = {
    firstName: null,
  };

  const language: LanguageCode = useSelector(
    (state: RootState) => state.language.language
  );

  const isFontSizeLarge: boolean = useSelector(
    (state: RootState) => state.accessibility.isFontsizeLarge
  );

  return (
    <div className="navbar bg-base-100 md:hidden">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {!loggedInUser.firstName && (
              <li>
                <Link to="/register">{content[language].navBar.register}</Link>
              </li>
            )}
            {!loggedInUser.firstName && (
              <li>
                <Link to="/login">{content[language].navBar.login}</Link>
              </li>
            )}
            {loggedInUser.firstName && (
              <li onClick={handleLogout}>
                <a href="#">{content[language].navBar.logout}</a>
              </li>
            )}
            {loggedInUser.firstName && (
              <li>
                <Link to="/requestExpression">
                  {content[language].navBar.request}
                </Link>
              </li>
            )}
            <li>
              {' '}
              <details>
                <summary>{content[language].navBar.language}</summary>
                <ul className="flex">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <ul>
                        <li
                          onClick={() => {
                            dispatch(changeLanguage('es'));
                          }}
                        >
                          <button
                            disabled={language === 'es'}
                            className="btn mb-2"
                          >
                            Español
                          </button>
                        </li>
                        <li>
                          <button
                            className="btn"
                            disabled={language === 'en'}
                            onClick={() => dispatch(changeLanguage('en'))}
                          >
                            English
                          </button>
                        </li>
                      </ul>
                    </label>
                  </div>
                </ul>
              </details>
            </li>
            <li>
              {' '}
              <details>
                <summary>{content[language].navBar.accessibility}</summary>
                <ul className="flex justify-start ">
                  <div className="form-control flex flex-wrap  w-full">
                    <span className="label-text w-fit">
                      {content[language].navBar.font}
                    </span>
                    <input
                      type="checkbox"
                      className="toggle mt-1"
                      onChange={() => dispatch(changeFontSize())}
                      checked={isFontSizeLarge}
                    />
                  </div>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link
          to="/"
          className="btn btn-ghost text-xl"
        >
          <img
            src={logo}
            alt="Exprilliant"
            className="h-8"
          />
        </Link>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
};

export default MobileNavbar;

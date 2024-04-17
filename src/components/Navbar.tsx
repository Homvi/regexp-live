import { Link } from 'react-router-dom';
import logo from '../assets/exprilliant-with-text.webp';
import { useSelector, useDispatch } from 'react-redux';
import { content } from '../../LanguageContent.ts';
import { RootState } from '../app/store.ts';
import { changeLanguage } from '../features/language/languageSlice.ts';
import { LanguageCode } from '../../LanguageContent.ts';

const Navbar = () => {
  const dispatch = useDispatch();
  // TODO: Handle user dynamically
  const loggedInUser = {
    firstName: 'John',
  };

  // TODO: Handle user dynamically
  const isFontSizeLarge = false;

  const language: LanguageCode = useSelector(
    (state: RootState) => state.language.language
  );

  const changeFontSize = (isFontSizeLarge: boolean) => {
    // TODO: chnage font size
    console.log(isFontSizeLarge);
  };

  const handleLogout = () => {
    // TODO: Handle logout
  };

  return (
    <div className="navbar bg-base-100 font-nova border-b-[1px] py-4 border-[#05213819] fixed top-0 z-40">
      <div className="flex-1">
        <Link
          to="/"
          className={`btn btn-ghost ${
            isFontSizeLarge ? 'text-3xl' : 'text-xl'
          }`}
        >
          <img
            src={logo}
            alt="Exprilliant"
            className="h-12"
          />
        </Link>
      </div>
      <div className="flex-none">
        <ul
          className={`menu menu-horizontal px-1 ${
            isFontSizeLarge ? 'text-xl' : ''
          }`}
        >
          {loggedInUser.firstName && (
            <li>
              <Link to="/requestExpression">
                {content[language].navBar.request}
              </Link>
            </li>
          )}
          <li>
            <details>
              <summary>{content[language].navBar.language}</summary>
              <ul className="flex">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <ul>
                      <li onClick={() => dispatch(changeLanguage('es'))}>
                        <button
                          disabled={language === 'es'}
                          className="btn mb-2 z-50"
                          // Pass the negation of current value
                        >
                          Español
                        </button>
                      </li>
                      <li onClick={() => dispatch(changeLanguage('en'))}>
                        <button
                          disabled={language === 'en'}
                          className="btn z-50"
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
            <details>
              <summary>{content[language].navBar.accessibility}</summary>
              <ul className="flex">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">
                      {content[language].navBar.font}
                    </span>
                    <input
                      type="checkbox"
                      className="toggle ml-3"
                      onChange={() => changeFontSize(!isFontSizeLarge)}
                      checked={isFontSizeLarge}
                    />
                  </label>
                </div>
              </ul>
            </details>
          </li>
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
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

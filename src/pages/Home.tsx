import { Link } from 'react-router-dom';
import { LanguageCode, content } from '../../LanguageContent.ts';
import type { RootState } from '../app/store';
import mundo from '../assets/animations/mundo.json';
import { useLottie } from 'lottie-react';
import { useSelector } from 'react-redux';

const Home = () => {
  const language: LanguageCode = useSelector(
    (state: RootState) => state.language.language
  );

  const isFontSizeLarge: boolean = useSelector(
    (state: RootState) => state.accessibility.isFontsizeLarge
  );

  // lottie animation configuration
  const options = {
    animationData: mundo,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <>
      <div
        className={
          isFontSizeLarge
            ? ' px-2 text-3xl min-h-screen flex-col items-center font-nova overflow-hidden'
            : ' px-2 text-2xl min-h-screen flex flex-col md:flex-row items-center font-nova'
        }
      >
        <div
          className={
            isFontSizeLarge
              ? 'flex mt-32 mb-8 justify-center h-full'
              : 'flex my-11 md:w-[40%] justify-center h-full '
          }
        >
          {/* lottie animation */}
          {View}
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-center w-full max-w-md">
            {content[language].homePage.title}
          </h2>
          <div className="flex  my-9 flex-col gap-3 w-full md:w-[70%] text-center ">
            <Link
              to="/chooseLanguage"
              className="bg-[#60AC90] shadow-md transition-all duration-300 hover:scale-105 text-white py-2 hover:shadow-xl w-full rounded-lg px-1"
            >
              {content[language].homePage.getStartedButton}
            </Link>
            <Link
              to="/login"
              className="bg-[#052138] shadow-md text-white py-2 transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-lg px-1"
            >
              {content[language].homePage.login}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;

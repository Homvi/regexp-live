//import axios from 'axios';
import { FormEvent, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LanguageCode, content } from '../../LanguageContent.js';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const navigate = useNavigate();

  const language: LanguageCode = useSelector(
    (state: RootState) => state.language.language
  );

  const isFontSizeLarge: boolean = useSelector(
    (state: RootState) => state.accessibility.isFontsizeLarge
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: BE - Handle login
  };

  return (
    <div className="h-full w-full px-3 flex flex-col items-center font-nova mt-28">
      <ToastContainer />
      <h1
        className={`text-center my-3 ${
          isFontSizeLarge ? 'text-4xl' : 'text-3xl'
        }`}
      >
        {content[language].login.login}
      </h1>
      {/* form */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[70%] max-w-lg bg-gray-100 py-5 border-[1px] border-gray-100 p-6 flex flex-col sm:mx-auto my-3"
      >
        {/* email input */}
        <label className="form-control w-full">
          <div className="label">
            <span
              className={`label-text ${
                isFontSizeLarge ? 'text-xl' : 'text-md'
              }`}
            >
              {content[language].login.email}
            </span>
          </div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="johndoe@gmail.com"
            className="input input-bordered w-full"
          />
        </label>
        {/* password input */}
        <label className="form-control w-full">
          <div className="label">
            <span
              className={`label-text ${
                isFontSizeLarge ? 'text-xl' : 'text-md'
              }`}
            >
              {content[language].login.pass}
            </span>
          </div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="input input-bordered w-full"
          />
        </label>
        <button
          type="submit"
          className="mt-10 bg-[#052138] shadow-md text-white py-2 transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-lg px-1"
        >
          {content[language].login.login}
        </button>
      </form>
    </div>
  );
};

export default Login;

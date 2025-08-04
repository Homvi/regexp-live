import axios from 'axios';
import { FormEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { LanguageCode, content } from '../../LanguageContent.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store.ts';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [isPrivacyCheckboxChecked, setIsPrivacyCheckboxChecked] =
    useState(false);
  const navigate = useNavigate();

  const language: LanguageCode = useSelector(
    (state: RootState) => state.language.language
  );

  const isFontSizeLarge: boolean = useSelector(
    (state: RootState) => state.accessibility.isFontsizeLarge
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPrivacyCheckboxChecked) {
      toast.error(content[language].register.errPrivacy);
      return;
    }

    if (password !== passwordAgain) {
      toast.error(content[language].register.errPass);
      return;
    }

    function resetFields() {
      setFirstName('');
      setLastName('');
      setUserName('');
      setEmail('');
      setPassword('');
      setPasswordAgain('');
      setIsPrivacyCheckboxChecked(false);
    }

    const newUser = {
      firstName: firstName,
      surname: lastName,
      username: userName,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        'http://localhost:8080/register',
        newUser
      );
      toast(content[language].register.registerOk);
      navigate('/login');
      resetFields();
    } catch (error) {
      toast.error(content[language].register.registerFail);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center font-nova mt-28">
      <ToastContainer />
      <h1
        className={`text-center my-3 ${
          isFontSizeLarge ? 'text-4xl' : 'text-3xl'
        }`}
      >
        {content[language].register.register}
      </h1>
      {/* form */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[70%] border-[1px] border-gray-100 p-6 flex flex-col mx-auto my-3"
      >
        {/* firstName input */}
        <label className="form-control w-full">
          <div className="label">
            <span
              className={`label-text ${
                isFontSizeLarge ? 'text-xl' : 'text-md'
              }`}
            >
              {content[language].register.name1}
            </span>
          </div>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            required
            placeholder="John"
            className="input input-bordered w-full"
          />
        </label>
        {/* lastName input */}
        <label className="form-control w-full">
          <div className="label">
            <span
              className={`label-text ${
                isFontSizeLarge ? 'text-xl' : 'text-md'
              }`}
            >
              {content[language].register.name2}
            </span>
          </div>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            required
            placeholder="Doe"
            className="input input-bordered w-full"
          />
        </label>
        {/* userName input */}
        <label className="form-control w-full">
          <div className="label">
            <span
              className={`label-text ${
                isFontSizeLarge ? 'text-xl' : 'text-md'
              }`}
            >
              {content[language].register.username}
            </span>
          </div>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            required
            placeholder="johndoe"
            className="input input-bordered w-full"
          />
        </label>
        {/* email input */}
        <label className="form-control w-full">
          <div className="label">
            <span
              className={`label-text ${
                isFontSizeLarge ? 'text-xl' : 'text-md'
              }`}
            >
              {content[language].register.email}
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
              {content[language].register.pass1}
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
        {/* passwordAgain input */}
        <label className="form-control w-full">
          <div className="label">
            <span
              className={`label-text ${
                isFontSizeLarge ? 'text-xl' : 'text-md'
              }`}
            >
              {content[language].register.pass2}
            </span>
          </div>
          <input
            value={passwordAgain}
            required
            onChange={(e) => setPasswordAgain(e.target.value)}
            type="password"
            className="input input-bordered w-full"
          />
        </label>
        {/* Privacy */}
        <div className="form-control my-3 ">
          <label className="label cursor-pointer">
            <span
              className={`label-text ${
                isFontSizeLarge ? 'text-xl' : 'text-md'
              }`}
            >
              {content[language].register.terms}
            </span>
            <input
              type="checkbox"
              onChange={() =>
                setIsPrivacyCheckboxChecked(!isPrivacyCheckboxChecked)
              }
              checked={isPrivacyCheckboxChecked}
              className="checkbox"
            />
          </label>
        </div>
        <button
          type="submit"
          className={`bg-[#052138] shadow-md text-white py-2 transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-lg px-1 ${
            isFontSizeLarge ? 'text-xl' : 'text-md'
          }`}
        >
          {content[language].register.register}
        </button>
      </form>
    </div>
  );
};

export default Register;

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Webcam from 'react-webcam';
import useHttps from '../../hooks/useHttps';
import { useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import InputField from '../../common/InputField/InputField';
import { emailIcon, lockIcon } from '../../common/Icon/Icon';

const LoginForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    showPassword: false,
    loading: false,
    error: ""
  });
  const { http } = useHttps();
  const { setToken } = useToken();
  const nav = useNavigate();
  const [authMethod, setAuthMethod] = useState('credentials'); // 'credentials' ou 'facial'
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (authMethod === 'credentials') {
      setForm({ ...form, loading: true, error: null });
      try {
        await http.post('/user/login', {
          email: form.email,
          password: form.password
        }).then((res) => {
          setToken(res.data);
          nav("/");
          setForm({ ...form, loading: false });
        });
      } catch (err) {
        setForm({ ...form, error: err.response?.data || "Erreur lors de la connexion", loading: false });
      }
    } else {
      if (isCameraActive && !capturedImage) {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
        console.log('Face captured during login submission');
      } else if (capturedImage) {
        console.log('Login submitted with facial recognition');
        // Envoyer capturedImage au backend ici
      }
    }
  };

  const activateCamera = () => {
    setIsCameraActive(true);
    setCapturedImage(null);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  const videoConstraints = {
    width: 280,
    height: 280,
    facingMode: "user"
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-md px-4 overflow-y-auto max-h-full py-4 hide-scrollbar relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl font-bold text-black mb-6 text-center md:text-left">Se connecter</h2>

      {/* Selector méthode d’auth */}
      <motion.div
        className="mb-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.8 }}
      >
        <div className="flex space-x-2 bg-black/10 p-1 rounded-lg">
          <button
            type="button"
            className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center transition-all duration-300 ${authMethod === 'credentials'
              ? 'bg-[#00C4A7] text-white shadow-md'
              : 'bg-transparent text-gray-400 hover:bg-black/5'
              }`}
            onClick={() => setAuthMethod('credentials')}
          >
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Email & Mot de passe
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center transition-all duration-300 ${authMethod === 'facial'
              ? 'bg-[#00C4A7] text-white shadow-md'
              : 'bg-transparent text-gray-400 hover:bg-black/5'
              }`}
            onClick={() => {
              setAuthMethod('facial');
              setIsCameraActive(false);
              setCapturedImage(null);
            }}
          >
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            Reconnaissance Faciale
          </button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {authMethod === 'credentials' ? (
          <motion.div
            key="credentials-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <InputField
              label="Identifiant ou e-mail"
              type="email"
              name="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="Entrez votre identifiant ou e-mail"
              icon={emailIcon}
              error={form.error && !form.email ? "Email requis" : null}
            />

            <InputField
              label="Mot de passe"
              type="password"
              name="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              icon={lockIcon}
              error={form.error && !form.password ? "Mot de passe requis" : null}
              showToggle={true}
              showPassword={form.showPassword}
              togglePassword={() => setForm({ ...form, showPassword: !form.showPassword })}
            />

            <motion.div
              className="text-right mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <a href="#" className="text-xs text-[#00C4A7] hover:underline">
                Mot de passe oublié?
              </a>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="facial-recognition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-6 relative z-10"
          >
            <div className="flex flex-col items-center justify-center bg-black/20 p-6 rounded-lg border border-gray-600">
              {!isCameraActive && !capturedImage ? (
                <>
                  <div className="w-48 h-48 rounded-full bg-black/30 mb-4 flex items-center justify-center overflow-hidden">
                    <svg className="h-16 w-16 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                  </div>
                  <p className="text-white text-sm mb-4 text-center">
                    Utilisez la reconnaissance faciale pour vous connecter rapidement et en toute sécurité.
                  </p>
                  <button
                    type="button"
                    onClick={activateCamera}
                    className="bg-[#00C4A7] hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300 shadow-lg"
                  >
                    Activer la caméra
                  </button>
                </>
              ) : isCameraActive && !capturedImage ? (
                <>
                  <div className="rounded-lg overflow-hidden mb-4 relative">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                      className="rounded-lg"
                    />
                    <div className="absolute inset-0 border-2 border-[#00C4A7] rounded-lg pointer-events-none"></div>
                  </div>
                  <p className="text-white text-sm mb-2 text-center">
                    Positionnez votre visage dans le cadre
                  </p>
                  <p className="text-gray-400 text-xs mb-4 text-center">
                    Cliquez sur "Se connecter" pour capturer votre photo et vous authentifier
                  </p>
                </>
              ) : (
                <>
                  <div className="rounded-lg overflow-hidden mb-4 relative">
                    <img
                      src={capturedImage}
                      alt="Photo capturée"
                      className="rounded-lg border-2 border-[#00C4A7]"
                    />
                  </div>
                  <p className="text-white text-sm mb-2 text-center">
                    Visage capturé avec succès !
                  </p>
                  <button
                    type="button"
                    onClick={retakePhoto}
                    className="text-[#00C4A7] text-sm hover:underline mb-2"
                  >
                    Reprendre la photo
                  </button>
                  <p className="text-gray-400 text-xs mb-4 text-center">
                    Cliquez sur "Se connecter" pour continuer
                  </p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {form.error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm"
        >
          {form.error}
        </motion.div>
      )}

      <motion.button
        type="submit"
        className={`bg-[#00C4A7] hover:bg-teal-600 text-white font-bold py-2 md:py-3 w-full rounded-md transition-colors duration-300 shadow-lg relative z-10`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {authMethod === 'facial' && isCameraActive && !capturedImage
          ? "Capturer et se connecter"
          : form.loading ? "En cours.." : "Se connecter"}
      </motion.button>
    </motion.form>
  );
};

export default LoginForm;

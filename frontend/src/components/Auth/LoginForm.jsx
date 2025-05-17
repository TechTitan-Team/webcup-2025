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
  const [stream, setStream] = useState(null);
  const [isRecognizing, setIsRecognizing] = useState(false);

  const { http, aiFileHttp } = useHttps();
  const { setToken } = useToken();
  const nav = useNavigate();
  const [authMethod, setAuthMethod] = useState('credentials'); // 'credentials' ou 'facial'
  const webcamRef = useRef(null);
  function dataURLtoFile(dataurl) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], Date.now() + ".jpg", { type: mime });
  }
  const handleCheck = async (email) => {
    let result = await http.get(`/user/byEmail/${email}`);
    if (result.data) {
      setToken(result.data);
      setIsRecognizing(false);
      setForm({ ...form, loading: false, error: null });
      nav("/");
    }
  };
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
      console.log("test");
      setIsRecognizing(true);
      setForm({ ...form, loading: true, error: null });
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const imgFile = dataURLtoFile(imageSrc);
        try {
          let formData = new FormData();
          formData.append("img", imgFile);
          let response = await aiFileHttp.post("/recognize", formData);
          if (response) {
            handleCheck(response.data);
          }
        } catch (error) {
          if (error.response.data.error == "Faciale unkown")
            setForm({ ...form, error: "Visage non détecté" })
          else
            setForm({ ...form, error: "Une erreur s'est produite, changer l'image", loading: false })
          setIsRecognizing(false);
          console.log(error);
        }
      }
    }
  };

  const setupWebcam = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const videoStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(videoStream);
        if (webcamRef.current) {
          webcamRef.current.srcObject = videoStream;
        }
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      if (webcamRef.current) {
        webcamRef.current.srcObject = null;
      }
    }
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
            onClick={() => {
              setAuthMethod('credentials')
              stopWebcam()
            }}
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
              setupWebcam()
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
        {authMethod === 'facial'
          ? form.loading ? "En cours.." : "Capturer et se connecter"
          : form.loading ? "En cours.." : "Se connecter"}
      </motion.button>
    </motion.form>
  );
};

export default LoginForm;

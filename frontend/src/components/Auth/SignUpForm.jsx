import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useHttps from '../../hooks/useHttps';
import InputField from '../../common/InputField/InputField';
import ProfileUploader from './ProfileUploader';
import { nameIcon, emailIcon, lockIcon } from '../../common/Icon/Icon';
import Modal from '../../common/Modal/Modal';

const SignupForm = () => {
    const { fileHttp, aiFileHttp, http } = useHttps();
    const nav = useNavigate();
    const fileInputRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [deferredData, setDeferredData] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState({ password: false, confirm: false });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validation du mot de passe
        const newErrors = {};
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        const data = new FormData();
        Object.entries(formData).forEach(([k, v]) => data.append(k, v));
        if (profileImage) {
            data.append("profile", profileImage);
            data.append("img", profileImage);
            try {
                await aiFileHttp.post("/create-dataset", data);
                await fileHttp.post('/user', data).then(() => {
                    nav("/");
                }).catch(async (err) => {
                    await aiFileHttp.delete("/delete-dataset", data);
                    setErrors({ email: err.response.data });
                });
            } catch (err) {
                console.error("Erreur IA : ", err);
                setErrors({ faciale: err.response.data.error + " Voulez-vous continuer sans photo de profil ?" });
                data.delete("profile", profileImage);
                data.delete("img", profileImage);
                setDeferredData(data);
                setShowModal(true);
            } finally {
                setLoading(false);
            }
        } else {
            setErrors({ faciale: "Vous n’avez pas ajouté de photo de profil. Voulez-vous continuer sans en ajouter ?" });
            setDeferredData(data);
            setShowModal(true);
        }
    };

    const handleModalConfirm = async () => {
        if (!deferredData) return;

        setLoading(true);
        try {
            await fileHttp.post('/user', deferredData);
            nav("/");
        } catch (err) {
            console.error("Erreur fileHttp : ", err);
            setErrors({ email: err.response.data });
        } finally {
            setShowModal(false);
            setDeferredData(null);
            setLoading(false);
        }
    };

    return (
        <>
            <motion.form
                onSubmit={handleSubmit}
                className="w-full max-w-md px-4 py-4 overflow-y-auto max-h-full hide-scrollbar relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
            >
                {errors.general && (
                    <div className="text-red-500 mb-4">{errors.general}</div>
                )}
                <h2 className="text-3xl font-bold text-center mb-6">S'inscrire</h2>

                <ProfileUploader
                    preview={preview}
                    onClick={() => fileInputRef.current.click()}
                    onChange={handleImageChange}
                    fileRef={fileInputRef}
                />

                <InputField
                    label="Nom complet"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Entrez votre nom complet"
                    icon={nameIcon}
                />

                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="exemple@mail.com"
                    icon={emailIcon}
                    error={errors.email}
                />

                <InputField
                    label="Mot de passe"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    icon={lockIcon}
                    error={errors.password}
                    showToggle
                    showPassword={showPassword.password}
                    togglePassword={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
                />

                <InputField
                    label="Confirmez le mot de passe"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    icon={lockIcon}
                    error={errors.confirmPassword}
                    showToggle
                    showPassword={showPassword.confirm}
                    togglePassword={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                />

                <motion.button
                    type="submit"
                    className="bg-[#00C4A7] hover:bg-teal-600 text-white font-bold py-2 w-full rounded-md mt-4"
                    whileHover={{ scale: 1.02 }}
                    disabled={loading}
                >
                    {loading ? "En cours..." : "S'inscrire"}
                </motion.button>
            </motion.form>
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setLoading(false);
                }}
                onConfirm={handleModalConfirm}
                title="Photo de profil invalide"
                message={errors.faciale}
            />
        </>
    );
};

export default SignupForm;

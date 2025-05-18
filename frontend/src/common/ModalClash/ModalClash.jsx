import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useHttps from '../../hooks/useHttps';
import useToken from '../../hooks/useToken';

const ModalClash = ({ isOpen, onClose, onConfirm }) => {
    const { http } = useHttps();
    const { token } = useToken();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const searchRef = useRef(null);
    
    // États de chargement et de succès
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [error, setError] = useState(null);
    const [clashCreated, setClashCreated] = useState(false);
    const [createdClashId, setCreatedClashId] = useState(null);
    const [createdClashDetails, setCreatedClashDetails] = useState(null);
    
    const [formData, setFormData] = useState({
        title: '',
        opponent: null
    });
    
    const getAllUsers = async () => {
        setIsUsersLoading(true);
        setError(null);
        try {
            const response = await http.get("/user");
            const userData = response.data.map(u => ({
                id: u.id,
                name: u.name
            }));
            setUsers(userData);
            setFilteredUsers(userData);
        } catch (error) {
            console.error("Erreur lors du chargement des utilisateurs:", error);
            setError("Impossible de charger la liste des utilisateurs. Veuillez réessayer.");
        } finally {
            setIsUsersLoading(false);
        }
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        if (!formData.title || !formData.opponent) return;
        
        setIsSubmitting(true);
        setError(null);
        
        try {
            const response = await http.post("/clash/create", {
                title: formData.title,
                id_user1: token.id,
                id_user2: formData.opponent
            });
            
            if (response.data && response.data.id) {
                setCreatedClashId(response.data.id);
                
                // Récupérer les détails du clash créé
                const selectedOpponent = users.find(user => user.id === formData.opponent);
                
                setCreatedClashDetails({
                    id: response.data.id,
                    title: formData.title,
                    opponent: selectedOpponent ? selectedOpponent.name : 'Adversaire',
                    date: new Date().toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })
                });
                
                // Attendre un peu pour montrer l'animation de chargement
                setTimeout(() => {
                    setClashCreated(true);
                    setIsSubmitting(false);
                    
                    // Appeler la fonction de callback pour mettre à jour la liste des clashs
                    if (onConfirm) {
                        onConfirm({
                            id: response.data.id,
                            title: formData.title,
                            opponent: formData.opponent
                        });
                    }
                }, 1000);
            }
        } catch (error) {
            console.error("Erreur lors de la création du clash:", error);
            setError("Une erreur est survenue lors de la création du clash. Veuillez réessayer.");
            setIsSubmitting(false);
        }
    };
    
    useEffect(() => {
        if (isOpen) {
            // Réinitialiser l'état à l'ouverture de la modal
            setFormData({ title: '', opponent: null });
            setSearchTerm('');
            setClashCreated(false);
            setCreatedClashId(null);
            setCreatedClashDetails(null);
            setError(null);
            getAllUsers();
        }
    }, [isOpen]);
    
    useEffect(() => {
        // Filtrer les utilisateurs en fonction du terme de recherche
        if (searchTerm.trim() === '') {
            setFilteredUsers(users);
        } else {
            setIsLoading(true);
            const timer = setTimeout(() => {
                const filtered = users.filter(user => 
                    user.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredUsers(filtered);
                setIsLoading(false);
            }, 300);
            
            return () => clearTimeout(timer);
        }
    }, [searchTerm, users]);
    
    // Fermer le dropdown lorsqu'on clique en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setIsDropdownOpen(true);
    };
    
    const selectUser = (user) => {
        setFormData(prev => ({
            ...prev,
            opponent: user.id
        }));
        setSearchTerm(user.name);
        setIsDropdownOpen(false);
    };
    
    const closeModal = () => {
        // Si un clash a été créé, actualiser la liste avant de fermer
        if (clashCreated && onConfirm) {
            onClose();
        } else {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeModal}
                >
                    <motion.div
                        className="bg-white rounded-2xl shadow-2xl p-0 max-w-md w-full overflow-hidden"
                        initial={{ scale: 0.9, y: -30 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: -30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header with gradient background */}
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">
                                {clashCreated ? "Clash créé avec succès!" : "Créer un nouveau clash"}
                            </h3>
                            <button 
                                onClick={closeModal}
                                disabled={isSubmitting}
                                className={`text-white/80 hover:text-white transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Form content or Success screen */}
                        <div className="p-6">
                            {error && (
                                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}

                            {isSubmitting && !clashCreated ? (
                                <div className="py-12 flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 mb-6">
                                        <svg className="animate-spin w-full h-full text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Création en cours...</h3>
                                    <p className="text-gray-500 text-center">
                                        Nous préparons votre clash contre {searchTerm}.
                                    </p>
                                </div>
                            ) : clashCreated && createdClashDetails ? (
                                <motion.div 
                                    className="py-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex justify-center mb-6">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <div className="text-center mb-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            Votre clash a été créé avec succès!
                                        </h3>
                                        <p className="text-gray-500">
                                            Préparez-vous pour un affrontement épique.
                                        </p>
                                    </div>
                                    
                                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mb-6">
                                        <div className="flex items-center mb-4">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                                                #
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-xs text-gray-500">ID du clash</p>
                                                <p className="font-mono text-gray-700">{createdClashDetails.id}</p>
                                            </div>
                                        </div>
                                        
                                        <h4 className="text-xl font-bold text-gray-800 mb-3">
                                            {createdClashDetails.title}
                                        </h4>
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center justify-center text-white font-medium">
                                                    {createdClashDetails.opponent.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="ml-2">
                                                    <p className="text-sm font-medium text-gray-700">
                                                        VS {createdClashDetails.opponent}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-500">{createdClashDetails.date}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="text-center text-sm text-gray-500">
                                        Vous pouvez maintenant accéder à votre clash pour commencer à y participer.
                                    </div>
                                </motion.div>
                            ) : (
                                <form onSubmit={onSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                            Titre du clash
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-400">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <input 
                                                type="text" 
                                                id="title" 
                                                value={formData.title}
                                                onChange={handleChange}
                                                placeholder="Ex: Design vs Développement"
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-gray-900"
                                                disabled={isSubmitting}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="searchOpponent" className="block text-sm font-medium text-gray-700">
                                            Sélectionner votre adversaire
                                        </label>
                                        <div className="relative" ref={searchRef}>
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-400">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                id="searchOpponent"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                                placeholder={isUsersLoading ? "Chargement des utilisateurs..." : "Rechercher un adversaire..."}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-gray-900"
                                                onClick={() => !isUsersLoading && setIsDropdownOpen(true)}
                                                disabled={isUsersLoading || isSubmitting}
                                                required
                                            />
                                            
                                            {/* Indicateur de chargement dans le champ de recherche */}
                                            {(isUsersLoading || isLoading) && (
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                                    <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                </div>
                                            )}
                                            
                                            {/* Dropdown de résultats de recherche */}
                                            <AnimatePresence>
                                                {isDropdownOpen && !isUsersLoading && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.15 }}
                                                        className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-lg py-1 text-base overflow-auto focus:outline-none sm:text-sm border border-gray-200"
                                                    >
                                                        {isLoading ? (
                                                            <div className="py-8 flex justify-center items-center">
                                                                <svg className="animate-spin h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                            </div>
                                                        ) : filteredUsers.length > 0 ? (
                                                            filteredUsers.map(user => (
                                                                <div
                                                                    key={user.id}
                                                                    className="cursor-pointer hover:bg-indigo-50 py-2 px-4 flex items-center"
                                                                    onClick={() => selectUser(user)}
                                                                >
                                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center justify-center text-white font-medium mr-3">
                                                                        {user.name.charAt(0).toUpperCase()}
                                                                    </div>
                                                                    <span className="text-gray-700">{user.name}</span>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="py-3 px-4 text-sm text-gray-500 italic">
                                                                Aucun utilisateur trouvé
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        
                                        {formData.opponent && (
                                            <div className="mt-2 flex items-center p-2 bg-indigo-50 rounded-lg">
                                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center justify-center text-white font-medium">
                                                    {searchTerm.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-700">
                                                        {searchTerm}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        Adversaire sélectionné
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="ml-auto text-gray-400 hover:text-gray-600"
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, opponent: null }));
                                                        setSearchTerm('');
                                                    }}
                                                    disabled={isSubmitting}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Footer with actions */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row-reverse gap-3 sm:gap-2">
                            {clashCreated ? (
                                <button
                                    onClick={closeModal}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg shadow hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 flex items-center justify-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Terminer
                                </button>
                            ) : (
                                <>
                                    <button
                                        type="submit"
                                        form="clashForm"
                                        onClick={onSubmit}
                                        disabled={!formData.title || !formData.opponent || isSubmitting}
                                        className={`px-6 py-3 font-medium rounded-lg shadow flex items-center justify-center transition duration-200 
                                            ${isSubmitting ? 'bg-indigo-400 text-white cursor-not-allowed' : 
                                            (formData.title && formData.opponent) 
                                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg transform hover:-translate-y-0.5' 
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Création en cours...
                                            </>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                                </svg>
                                                Créer le clash
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        disabled={isSubmitting}
                                        className={`px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-200 flex items-center justify-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        Annuler
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalClash;
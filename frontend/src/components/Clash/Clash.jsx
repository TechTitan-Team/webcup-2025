import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import Header from '../Layout/Header/Header';
import ModalClash from '../../common/ModalClash/ModalClash';
import useHttps from '../../hooks/useHttps';
import useToken from '../../hooks/useToken'; // Ajout de l'import pour useToken
import { motion, AnimatePresence } from 'framer-motion';

const ClashList = () => {
    const { http } = useHttps();
    const { token } = useToken(); // Récupération du token pour l'id utilisateur
    const [clashes, setClashes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [viewMode, setViewMode] = useState('all'); // 'all' ou 'mine' pour filtrer les clashs

    // Fonction pour charger tous les clashs depuis l'API
    const fetchAllClashes = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await http.get("/clash");
            // Transformation des données pour correspondre à votre format d'affichage
            const formattedClashes = response.data.map(clash => ({
                id: clash.id,
                title: clash.title,
                participants: clash.participants || 0,
                date: new Date(clash.created_at || Date.now()).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                }),
                status: clash.status || 'En attente'
            }));
            setClashes(formattedClashes);
        } catch (error) {
            console.error("Erreur lors du chargement des clashs:", error);
            setError("Impossible de charger la liste des clashs. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    // Fonction pour charger les clashs de l'utilisateur connecté
    const fetchMyClashes = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await http.get(`/clash/byUser/${token.id}`);
            // Transformation des données pour correspondre à votre format d'affichage
            const formattedClashes = response.data.map(clash => ({
                id: clash.id,
                title: clash.title,
                participants: clash.participants || 0,
                date: new Date(clash.created_at || Date.now()).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                }),
                status: clash.status || 'En attente'
            }));
            setClashes(formattedClashes);
        } catch (error) {
            console.error("Erreur lors du chargement de mes clashs:", error);
            setError("Impossible de charger vos clashs. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    // Fonction pour charger les clashs en fonction du mode de vue
    const fetchClashes = () => {
        if (viewMode === 'all') {
            fetchAllClashes();
        } else {
            fetchMyClashes();
        }
    };

    // Charger les clashs au chargement du composant, lorsque refreshTrigger change ou viewMode change
    useEffect(() => {
        fetchClashes();
    }, [refreshTrigger, viewMode]);

    // Ouvrir le modal pour créer un nouveau clash
    const openCreateModal = () => {
        setIsModalOpen(true);
    };

    // Fermer le modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Callback après la création d'un clash
    const handleClashCreated = (newClash) => {
        // Déclencher un rafraîchissement des données
        setRefreshTrigger(prev => prev + 1);
        // Passer automatiquement en mode "Mes clashs" après création
        setViewMode('mine');
    };

    // Fonction pour changer le mode de vue
    const toggleViewMode = (mode) => {
        if (mode !== viewMode) {
            setViewMode(mode);
        }
    };

    // Variantes pour les animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <Layout>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-4 md:mb-0">
                            {viewMode === 'all' ? 'Liste des Clashs' : 'Mes Clashs'}
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-3">
                            {/* Boutons de filtrage */}
                            <div className="flex bg-white p-1 rounded-full shadow-md mb-4 sm:mb-0 mr-0 sm:mr-4">
                                <button 
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                        viewMode === 'all' 
                                            ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-sm' 
                                            : 'text-gray-600 hover:text-indigo-600'
                                    }`}
                                    onClick={() => toggleViewMode('all')}
                                >
                                    Tous les clashs
                                </button>
                                <button 
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                        viewMode === 'mine' 
                                            ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-sm' 
                                            : 'text-gray-600 hover:text-indigo-600'
                                    }`}
                                    onClick={() => toggleViewMode('mine')}
                                >
                                    Mes clashs
                                </button>
                            </div>
                            
                            <button 
                                onClick={openCreateModal} 
                                className="px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Créer un Clash
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="w-16 h-16 mb-6">
                                <svg className="animate-spin w-full h-full text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Chargement des clashs...</h3>
                            <p className="text-gray-500 text-center">
                                {viewMode === 'all' 
                                    ? 'Nous récupérons la liste de tous les clashs disponibles.'
                                    : 'Nous récupérons la liste de vos clashs.'}
                            </p>
                        </div>
                    ) : clashes.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 bg-indigo-100 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {viewMode === 'all' 
                                    ? 'Aucun clash disponible' 
                                    : 'Vous n\'avez pas encore de clashs'}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {viewMode === 'all'
                                    ? 'Soyez le premier à créer un clash et à défier quelqu\'un !'
                                    : 'Créez un clash maintenant pour défier un autre utilisateur.'}
                            </p>
                            <button 
                                onClick={openCreateModal} 
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg shadow hover:shadow-lg transition duration-200 inline-flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Créer mon premier clash
                            </button>
                        </div>
                    ) : (
                        <motion.div 
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <AnimatePresence>
                                {clashes.map((clash) => (
                                    <motion.div
                                        key={clash.id}
                                        className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300 border border-gray-100 relative overflow-hidden group"
                                        variants={itemVariants}
                                        layout
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-100 to-transparent -mr-12 -mt-12 rounded-full opacity-70"></div>
                                        
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs font-semibold">
                                                {clash.date}
                                            </span>
                                            
                                            {clash.status && (
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                                    clash.status === 'En cours' ? 'bg-green-100 text-green-600' :
                                                    clash.status === 'Terminé' ? 'bg-gray-100 text-gray-600' :
                                                    'bg-yellow-100 text-yellow-600'
                                                }`}>
                                                    {clash.status}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition duration-300">
                                            {clash.title}
                                        </h2>
                                        
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                                </svg>
                                                <span>{clash.participants || 2} participants</span>
                                            </div>
                                            
                                            <button 
                                                className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center"
                                                onClick={() => {
                                                    // Navigation vers la page de détails du clash
                                                    window.location.href = `/clash/${clash.id}`;
                                                }}
                                            >
                                                Voir
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                        
                                        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 w-0 group-hover:w-full transition-all duration-300"></div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>
            
            {/* Modal pour créer un clash */}
            <ModalClash 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                onConfirm={handleClashCreated} 
            />
        </Layout>
    );
};

export default ClashList;
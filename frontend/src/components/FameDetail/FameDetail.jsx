import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { formateDate } from '../../services/services'
import { BaseUrl } from '../../hooks/useHttps'

const FameDetail = () => {
    const { id } = useParams();
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPageDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:9002/api/page/${id}`);
                 console.log(response.data);
                setPage(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de la page:', error);
                setError('Impossible de charger les détails de la page');
                setLoading(false);
            }
        };

        fetchPageDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    if (!page) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-gray-500">Page non trouvée</div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6">
            <div className="w-full h-full mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{page.type}</h1>
                            <p className="text-gray-600">Créé par {page.user?.name}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                            {formateDate(page.created_at)}
                        </div>
                    </div>
                    
                    <div className="prose max-w-none">
                        <iframe 
                            src={BaseUrl + page.url} 
                            className="w-full h-[600px] border-0"
                            title="Page Content"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FameDetail
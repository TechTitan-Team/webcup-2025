import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import Header from "../Layout/Header/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { formateDate } from "../../services/services";
import useHttps, { BaseUrl } from "../../hooks/useHttps";
import useToken from "../../hooks/useToken";

const HallOfFame = () => {
  const [likes, setLikes] = useState({});
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useToken();
  const { http } = useHttps();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await http.get(`/page`);
        setPages(response.data);
        // Initialiser les likes avec le nombre de réactions existantes
        const initialLikes = {};
        response.data.forEach(page => {
          initialLikes[page.id] = page.Reaction.length;
        });
        setLikes(initialLikes);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des pages:", error);
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  const handleLike = async (pageId) => {
    try {
      console.log({
        id_user: parseInt(token.id),
        id_page: pageId,
      });

      // Créer la réaction dans le backend
      await http.post(`/reaction`, {
        id_user: parseInt(token.id),
        id_page: pageId,
      });

      // Mettre à jour l'état local
      setLikes((prev) => ({
        ...prev,
        [pageId]: (prev[pageId] || 0) + 1,
      }));
    } catch (error) {
      console.error("Erreur lors de la création du like:", error);
    }
  };

  const categories = [
    "For you",
    "AI generation",
    "Audio and voiceover",
    "Communication",
    "File and data management",
    "Graphic design",
    "Marketing",
    "Photo editor",
  ];

  return (
    <Layout>
      <Header />
      <div className="bg-white min-h-screen p-6">
        {/* Featured Section */}
        <div className="rounded-3xl bg-blue-200 mb-8 overflow-hidden mx-3 md:mx-[100px]">
          <div className="flex flex-col md:flex-row p-8">
            <div className="flex-1 pr-4">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Bienvenue sur la Hall of Fame
              </h1>
              <p className="text-gray-700 mb-6">
                Découvrez les plus épiques fin qui deviennent immortelles
              </p>
              <Link to="/create-page">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg">
                  Créer mon premier page
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar and Categories */}
        {/* <div className="mb-8 mx-3 md:mx-[100px]">
          <div className="flex flex-wrap gap-2 items-center mb-4">
            <div className="relative flex-grow mr-2">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search apps"
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg text-sm ${
                  category === "For you"
                    ? "bg-purple-100 text-purple-700 border border-purple-300"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div> */}

        {/* Pages Section */}
        <div className="mx-3 md:mx-[100px]">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className="flex items-start p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="bg-blue-100 p-3 rounded-lg mr-3 relative group">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(page.id);
                      }}
                      className="flex items-center space-x-1 transition-all hover:scale-110 group"
                    >
                      <span className="text-xl text-purple-400 group-hover:text-purple-600 transition-colors">
                        ♡
                      </span>
                      <span className="text-sm font-medium text-purple-400 group-hover:text-purple-600 transition-colors">
                        {likes[page.id] || 0}
                      </span>
                    </button>
                  </div>
                  <a href={`${BaseUrl + page.url}`} target="_blank">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        Créer par {page.user.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Date {formateDate(page.created_at)}
                      </p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HallOfFame;

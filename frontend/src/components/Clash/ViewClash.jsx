import React, { useEffect, useState } from 'react';
import Header from '../Layout/Header/Header';
import { useParams } from 'react-router-dom';
import useHttps, { BaseUrl, rootApiUrl } from '../../hooks/useHttps';

const DualIframeComponent = () => {
  const { id } = useParams()
  const { http } = useHttps()
  const [html, setHtml] = useState({
    page1: "",
    page2: "",
    title: ""
  })
  const [liked1, setLiked1] = useState(false);
  const [liked2, setLiked2] = useState(false);

  const handleLike = async (side) => {
    if ((side === 'page1' && liked1) || (side === 'page2' && liked2)) return;

    try {
      await http.post(`/clash/incrementLike`, {
        id: id,
        type: side
      });
      if (side === 'page1') setLiked1(true);
      if (side === 'page2') setLiked2(true);
    } catch (err) {
      console.error("Like failed:", err);
    }
  };
  const getContent = async (id) => {
    await http.get(`/clash/getOne/${id}`).then((res) => {
      setHtml({
        title: res.data.title,
        page1: res.data.page1.url,
        page2: res.data.page2.url
      })
    })
  }
  useEffect(() => {
    getContent(id)
  }, [id])

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      {/* Title section */}
      <div className="bg-gradient-to-r from-pink-500 to-blue-500 py-3 px-6 shadow-md">
        <h1 className="text-xl font-bold text-white text-center">
          ❤️ {html.title} ❤️
        </h1>
      </div>

      {/* Main content - iframes container */}
      <div className="flex flex-grow">
        {/* Left iframe */}
        <div className="w-1/2 h-full border-r border-gray-300 relative">
          {/* <div className="absolute top-0 left-0 right-0 bg-pink-100 px-4 py-2 border-b border-pink-200 z-10">
            <span className="font-medium text-pink-700">Her Side</span>
          </div> */}
          <div className="pt-10 h-full">
            <iframe
              src={BaseUrl + html.page1}
              title="Her Side"
              className="w-full h-full border-0"
              sandbox="allow-scripts"
            />
          </div>
        </div>

        {/* Right iframe */}
        <div className="w-1/2 h-full relative">
          {/* <div className="absolute top-0 left-0 right-0 bg-blue-100 px-4 py-2 border-b border-blue-200 z-10">
            <span className="font-medium text-blue-700">His Side</span>
          </div> */}
          <div className="pt-10 h-full">
            <iframe
              src={BaseUrl + html.page2}
              title="His Side"
              className="w-full h-full border-0"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>

      {/* Like Button (fixed at bottom right) */}
      {/* Like Button - Left side (Her Side) */}
      <div className="fixed bottom-6 left-6 z-20">
        <button
          disabled={liked1}

          onClick={() => handleLike('page1')}
          className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg ${liked1
              ? 'bg-pink-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
            } transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill={liked1 ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={liked1 ? 0 : 2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {liked1 ? 'Liked' : 'Like'}
        </button>
      </div>

      {/* Like Button - Right side (His Side) */}
      <div className="fixed bottom-6 right-6 z-20">
        <button
          disabled={liked2}
          onClick={() => handleLike('page2')}
          className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg ${liked2
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
            } transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill={liked2 ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={liked2 ? 0 : 2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {liked2 ? 'Liked' : 'Like'}
        </button>
      </div>

    </div>
  );
};

export default DualIframeComponent;
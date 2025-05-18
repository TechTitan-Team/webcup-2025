import React from "react";
import TemplateCard from "../../../common/TemplateCard/TemplateCard";
import { useTemplates } from "../../../context/TemplateContext";

const ExamplesSection = () => {
  const { templates } = useTemplates();

  const filteredTemplates = templates?.slice(0, 4);
  return (
    <section
      id="exemples"
      className="py-32 relative overflow-hidden bg-gradient-to-br from-blue-50 to-violet-50"
    >
      <div className="animated-bg">
        <div className="animated-bg-shape bg-indigo-200 w-[600px] h-[600px] top-[20%] -right-[300px] animate-pulse-slow opacity-30 rounded-full"></div>
        <div
          className="animated-bg-shape bg-pink-200 w-[400px] h-[400px] bottom-[10%] left-[5%] animate-pulse-slow opacity-30 rounded-full"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20 reveal-section">
          <span className="inline-block text-indigo-500 text-sm uppercase tracking-widest mb-4">
            Inspiration
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-gray-800">
            ADIEUX <span className="text-indigo-500">MÉMORABLES</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Découvrez comment d'autres personnes ont dit au revoir avec style.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 stagger-children">
          {filteredTemplates?.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#"
            className="magnetic-btn group relative overflow-hidden bg-white border border-indigo-200 text-indigo-500 px-8 py-3 font-semibold text-lg inline-flex items-center gap-3 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">
              VOIR PLUS D'EXEMPLES
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1 group-hover:text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-500 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100 duration-500"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExamplesSection;

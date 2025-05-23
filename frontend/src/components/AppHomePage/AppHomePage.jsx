import CategoryFilter from "../../common/CategoryFilter/CategoryFilter";
import ScrollIndicator from "../../common/ScrollIndicator/ScrollIndicator";
import SearchBar from "../../common/SearchBar/SearchBar";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useScrollIndicator } from "../../hooks/useScrollIndicator";
import { useSearchBar } from "../../hooks/useSearchBar";
import { useTemplateFilter } from "../../hooks/useTemplateFilter";
import { motion } from "framer-motion";
import TemplateGrid from "../TemplateGrid/TemplateGrid";
import Layout from "../Layout/Layout";
import Header from "../Layout/Header/Header";

export default function ListeTemplate() {
  const { titleScale, titleOpacity, titleY, searchBarPosition } =
    useScrollAnimation();
  const {
    searchQuery,
    searchIsFocused,
    handleSearchFocus,
    handleSearchBlur,
    handleSearchChange,
  } = useSearchBar();
  const { activeCategory, setActiveCategory, filteredTemplateIds } =
    useTemplateFilter(searchQuery);
  const { showScrollIndicator } = useScrollIndicator();

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-pink to-pink-200 overflow-x-hidden">
        <div className="relative z-10">
          <div className="fixed w-full top-0 z-10">
            <Header />
          </div>
          <motion.div
            style={{ scale: titleScale, opacity: titleOpacity, y: titleY }}
            className="text-center mt-30 px-4 py-8"
          >
            <motion.h1
              className="text-5xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Créez votre page d'adieu
            </motion.h1>
            <motion.p
              className="text-gray-600 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Exprimez-vous avec style avant de claquer la porte. Une page unique pour un message final.
            </motion.p>
          </motion.div>

          <ScrollIndicator showScrollIndicator={showScrollIndicator} />

          <CategoryFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          <SearchBar
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            handleSearchFocus={handleSearchFocus}
            handleSearchBlur={handleSearchBlur}
            searchIsFocused={searchIsFocused}
            style={{ y: searchBarPosition }}
          />

          <div className="mx-auto px-4 sm:px-6 lg:px-8 mb-4 mt-10">
            <div className="flex items-center justify-between">
              <motion.h2
                className="text-lg font-semibold text-gray-800 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                Modèles disponibles
                <svg
                  className="w-5 h-5 ml-2 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.h2>
            </div>
          </div>

          <TemplateGrid filteredTemplateIds={filteredTemplateIds} />
        </div>
      </div>
    </Layout>
  );
}

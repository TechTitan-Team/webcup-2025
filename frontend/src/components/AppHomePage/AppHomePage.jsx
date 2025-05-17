import BackgroundEffects from "../../common/BackgroundEffects/BackgroundEffects";
import CategoryFilter from "../../common/CategoryFilter/CategoryFilter";
import ScrollIndicator from "../../common/ScrollIndicator/ScrollIndicator";
import SearchBar from "../../common/SearchBar/SearchBar";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useScrollIndicator } from "../../hooks/useScrollIndicator";
import { useSearchBar } from "../../hooks/useSearchBar";
import { useTemplateFilter } from "../../hooks/useTemplateFilter";
import AppHeader from "../Layout/AppHeader/AppHeader";
import { motion } from "framer-motion";
import TemplateGrid from "../TemplateGrid/TemplateGrid";

export default function Home() {
  const { titleScale, titleOpacity, titleY, searchBarPosition } =
    useScrollAnimation();
  const { activeCategory, setActiveCategory, filteredTemplateIds } =
    useTemplateFilter();
  const {
    searchQuery,
    searchIsFocused,
    handleSearchFocus,
    handleSearchBlur,
    handleSearchChange,
  } = useSearchBar();
  const { showScrollIndicator } = useScrollIndicator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 overflow-x-hidden">
      <BackgroundEffects />

      <div className="relative z-10">
        <AppHeader />

        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity, y: titleY }}
          className="text-center px-4 py-8"
        >
          <motion.h1
            className="text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Qu'allez-vous créer aujourd'hui ?
          </motion.h1>
          <motion.p
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Créez votre page d'adieu personnalisée. Exprimez-vous avant de
            claquer la porte.
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
              Website templates
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
  );
}

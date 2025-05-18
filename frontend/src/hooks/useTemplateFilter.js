import { useState, useEffect } from "react";
import { useTemplates } from "../context/TemplateContext";

export const useTemplateFilter = (searchQuery = "") => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredTemplateIds, setFilteredTemplateIds] = useState([]);
  const { templates } = useTemplates();

  useEffect(() => {
    let filtered = templates;

    if (activeCategory !== "all") {
      filtered = filtered.filter((template) => template.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((template) => 
        template.title.toLowerCase().includes(query) ||
        template.description?.toLowerCase().includes(query)
      );
    }

    setFilteredTemplateIds(filtered.map((template) => template.id));
  }, [activeCategory, templates, searchQuery]);

  return {
    activeCategory,
    setActiveCategory,
    filteredTemplateIds,
  };
};

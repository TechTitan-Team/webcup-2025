import { useState, useEffect } from "react";
import { useTemplates } from "../context/TemplateContext";

export const useTemplateFilter = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredTemplateIds, setFilteredTemplateIds] = useState([]);
  const { templates } = useTemplates();

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredTemplateIds(templates.map((template) => template.id));
    } else {
      const filtered = templates
        .filter((template) => template.category === activeCategory)
        .map((template) => template.id);

      setFilteredTemplateIds(filtered);
    }
  }, [activeCategory, templates]);

  return {
    activeCategory,
    setActiveCategory,
    filteredTemplateIds,
  };
};

import React from "react";
import { motion } from "framer-motion";
import TemplateCard from "../../common/TemplateCard/TemplateCard";
import { useTemplates } from "../../context/TemplateContext";

const TemplateGrid = ({ filteredTemplateIds }) => {
  const { templates } = useTemplates();
  const filteredTemplates = templates?.filter((template) =>
    filteredTemplateIds?.includes(template.id)
  );

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >
        {filteredTemplates?.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </motion.div>
    </div>
  );
};

export default TemplateGrid;

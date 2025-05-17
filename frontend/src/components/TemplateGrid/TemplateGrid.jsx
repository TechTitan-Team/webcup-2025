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
    <div className="w-screen mx-auto px-20 sm:px-6 lg:px-8 pb-20">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
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

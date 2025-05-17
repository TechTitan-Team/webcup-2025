import React, { createContext, useState, useContext } from 'react';
import { templates as initialTemplates } from '../constants/templateData';

const TemplateContext = createContext();

export const useTemplates = () => useContext(TemplateContext);

export const TemplateProvider = ({ children }) => {
  const [templates, setTemplates] = useState(
    initialTemplates.map(template => ({
      ...template,
      title: template.defaultTitle,
      content: template.defaultContent
    }))
  );

  const updateTemplate = (id, { title, content }) => {
    setTemplates(prevTemplates => 
      prevTemplates.map(template => 
        template.id === id 
          ? { ...template, title, content } 
          : template
      )
    );
  };

  const generateHTML = (id) => {
    const template = templates.find(t => t.id === id);
    if (!template) return '';
    
    return template.htmlTemplate(template.title, template.content);
  };

  const resetTemplate = (id) => {
    setTemplates(prevTemplates => 
      prevTemplates.map(template => 
        template.id === id 
          ? { 
              ...template, 
              title: template.defaultTitle, 
              content: template.defaultContent 
            } 
          : template
      )
    );
  };

  return (
    <TemplateContext.Provider 
      value={{ 
        templates, 
        updateTemplate,
        generateHTML,
        resetTemplate
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};
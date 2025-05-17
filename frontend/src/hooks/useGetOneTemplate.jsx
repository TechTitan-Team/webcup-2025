import { useState, useEffect } from "react";
import { useTemplates } from "../context/TemplateContext";

export default function useGetOneTemplate(templateId) {
  const { templates, updateTemplate, resetTemplate, generateHTML } =
    useTemplates();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const foundTemplate = templates.find(
        (t) => t.id === parseInt(templateId)
      );

      if (foundTemplate) {
        setTemplate(foundTemplate);
        setTitle(foundTemplate.title);
        setContent(foundTemplate.content);
        setHasChanges(false);
      } else {
        setError(new Error(`Template with ID ${templateId} not found`));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [templateId, templates]);

  useEffect(() => {
    if (template) {
      setHasChanges(title !== template.title || content !== template.content);
    }
  }, [title, content, template]);

  const saveChanges = () => {
    if (!template) return;

    updateTemplate(template.id, { title, content });
    setHasChanges(false);
    return true;
  };

  const resetToDefault = () => {
    if (!template) return;

    resetTemplate(template.id);
    setTitle(template.defaultTitle);
    setContent(template.defaultContent);
    setHasChanges(false);
    return true;
  };

  const discardChanges = () => {
    if (!template) return;

    setTitle(template.title);
    setContent(template.content);
    setHasChanges(false);
    return true;
  };

  const getHTML = () => {
    if (!template) return "";
    return template.htmlTemplate(title, content);
  };

  return {
    template,
    loading,
    error,
    title,
    setTitle,
    content,
    setContent,
    hasChanges,
    saveChanges,
    resetToDefault,
    discardChanges,
    getHTML,
  };
}

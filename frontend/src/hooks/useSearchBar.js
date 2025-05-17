import { useState } from "react";

export const useSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIsFocused, setSearchIsFocused] = useState(false);

  const handleSearchFocus = () => setSearchIsFocused(true);
  const handleSearchBlur = () => setSearchIsFocused(false);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  return {
    searchQuery,
    searchIsFocused,
    handleSearchFocus,
    handleSearchBlur,
    handleSearchChange,
  };
};

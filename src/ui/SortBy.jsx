import Select from "./Select";
import { useSearchParams } from "react-router-dom";
import propTypes from "prop-types";
SortBy.propTypes = {
  options: propTypes.array,
};
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "name-asc";
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      value={sortBy}
      options={options}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;

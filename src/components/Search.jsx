const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search overflow-auto ">
      <div className="p-1">
        <img src="/search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;

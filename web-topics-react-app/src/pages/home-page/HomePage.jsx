import React, { useContext, useEffect, useState } from "react";
import { SearchInput } from "../../components/search-input/SearchInput";
import { SelectInput } from "../../components/selector/SelectInput";
import { CardsSection } from "../../components/cards-section/CardsSection";
import { useNavigate } from "react-router-dom";
import { FavSection } from "../../components/fav-section/FavSection";
import { FavContext } from "../../context/FavContext";

export const HomePage = () => {
  const [cardsData, setCardsData] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [cardCategories, setCardCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queryParams, setQueryParams] = useState(
    new URLSearchParams(window.location.search)
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (queryParams.size) {
      updateFilteredCards();
    }
    prepareCardCategories();
  }, [cardsData]);

  useEffect(() => {
    prepareData();
  }, []);

  useEffect(() => {
    navigate(`/?${queryParams.toString()}`);
    updateFilteredCards();
  }, [queryParams]);

  const prepareData = async () => {
    await fetchTopicsList();
  };

  const updateFilteredCards = () => {
    const termValue = queryParams.get("term");
    const sortValue = queryParams.get("sort");
    const categoryValue = queryParams.get("filter");

    let tempFilteredCards = [...cardsData];
    if (termValue) {
      tempFilteredCards = [...cardsData].filter((card) => {
        return card?.topic.toLowerCase().includes(termValue);
      });
    }
    if (sortValue) {
      switch (sortValue) {
        case "title":
          tempFilteredCards = [...tempFilteredCards].sort((a, b) => {
            return a.topic.toLowerCase() >= b.topic.toLowerCase() ? 1 : -1;
          });
          break;
        case "author":
          tempFilteredCards = [...tempFilteredCards].sort((a, b) => {
            return a.name.toLowerCase() >= b.name.toLowerCase() ? 1 : -1;
          });
          break;
        default:
          tempFilteredCards = [...tempFilteredCards].filter((card) => {
            return card?.topic.toLowerCase().includes("");
          });
          break;
      }
    }
    if (categoryValue) {
      tempFilteredCards = [...tempFilteredCards].filter((card) => {
        return card["category"].toLowerCase().includes(categoryValue);
      });
    }
    if (!termValue && !sortValue && !categoryValue) {
      tempFilteredCards = [...cardsData].filter((card) => {
        return card?.topic.toLowerCase().includes("");
      });
    }
    setFilteredCards(tempFilteredCards);
  };

  const fetchTopicsList = async () => {
    try {
      const response = await fetch(
        "https://tap-web-1.herokuapp.com/topics/list"
      );

      if (!response.ok) {
        throw new Error("Something went wrong. Web topics failed to load.");
      }

      const data = await response.json();
      setCardsData(data);
      setFilteredCards(data);
    } catch (error) {
      setError("Something went wrong. Web topics failed to load.");
    } finally {
      setLoading(false);
    }
  };

  const prepareCardCategories = () => {
    let categoriesFilterValues = [];
    for (let i = 0; i < cardsData.length; i++) {
      if (!categoriesFilterValues.includes(cardsData[i]?.category)) {
        categoriesFilterValues.push(cardsData[i]?.category);
      }
    }
    let preparedCategoriesData = [];
    categoriesFilterValues.forEach((category) => {
      let option = { value: category, optionLabel: category };
      preparedCategoriesData.push(option);
    });
    setCardCategories(preparedCategoriesData);
  };

  const handleFiltersChange = (e, query) => {
    let searchValue = e.target.value.toLowerCase();
    const updatedQueryParams = new URLSearchParams(queryParams);
    updatedQueryParams.set(query, searchValue);
    setQueryParams(updatedQueryParams);
  };

  const { toggleFavCardsSection } = useContext(FavContext);

  return (
    <main>
      <div className="search-filters-component">
        <div className="search-wrapper">
          <SearchInput
            placeholder="Search the website..."
            handleSearchChange={handleFiltersChange}
          />
        </div>
        <div className="select-btns-wrapper">
          <SelectInput
            name="sort"
            id="sort"
            customClass="sort-select"
            label="Sort by:"
            htmlFor="sort"
            values={[
              { value: "reset", optionLabel: "Default" },
              { value: "title", optionLabel: "Topic Title" },
              { value: "author", optionLabel: "Author Name" },
            ]}
            handleSelectChange={handleFiltersChange}
          />
          <SelectInput
            name="filter"
            id="filter"
            customClass="filter-select"
            label="Filter by:"
            htmlFor="filter"
            values={cardCategories}
            handleSelectChange={handleFiltersChange}
          />
        </div>
      </div>
      <div className="title-topics-found">
        "{filteredCards.length}" Topics Found
      </div>
      <div className="cards-section">
        {loading ? (
          <div id="main-loading">Loading ...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <CardsSection cardsData={filteredCards} />
        )}
      </div>
      {toggleFavCardsSection && <FavSection data={cardsData} />}
    </main>
  );
};

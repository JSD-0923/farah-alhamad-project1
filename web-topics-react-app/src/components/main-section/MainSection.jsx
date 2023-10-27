import React, { useEffect, useState } from "react";
import { SearchInput } from "../search-input/SearchInput";
import { SelectInput } from "../selector/SelectInput";
import { CardsSection } from "../cards-section/CardsSection";

export const MainSection = () => {
  const [cardsData, setCardsData] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [cardCategories, setCardCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queryParams, setQueryParams] = useState(
    new URLSearchParams(window.location.search)
  );

  const prepareData = async () => {
    await fetchTopicsList();
    prepareCardCategories();
    setQueryParams(new URLSearchParams(window.location.search));
  };

  const handleSearchInput = () => {
    const term = queryParams.get("term");
    console.log("term", term);
    const cards = [...cardsData].filter((card) => {
      return card?.topic.toLowerCase().includes(term);
    });
    console.log("cards", cards);
    setFilteredCards(cards);
  };

  //   const handleSortInput = () => {
  //     const sort = queryParams.get("sort");
  //     switch (sort) {
  //       case "title":
  //         [...filteredCards].sort((a, b) => {
  //           return a.topic.toLowerCase() >= b.topic.toLowerCase() ? 1 : -1;
  //         });
  //         break;
  //       case "author":
  //         [...filteredCards].sort((a, b) => {
  //           return a.name.toLowerCase() >= b.name.toLowerCase() ? 1 : -1;
  //         });
  //         break;
  //       case "reset":
  //         handleSearchInput();
  //         break;
  //     }
  //   };

  //   const handleFilterInput = () => {
  //     const category = queryParams.get("category");
  //     const cards = [...filteredCards].filter((card) => {
  //       return card["category"].includes(category);
  //     });
  //     setFilteredCards(cards);
  //   };

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

  const getFilteredCards = () => {
    console.log("getFilteredCards");
    handleSearchInput();
    // handleSortInput();
    // handleFilterInput();
  };

  useEffect(() => {
    prepareData();
    console.log("first");
  }, []);

  useEffect(() => {
    getFilteredCards();
    console.log("second");
  }, [queryParams]);

  return (
    <main>
      <div className="search-filters-component">
        <div className="search-wrapper">
          <SearchInput placeholder="Search the website..." />
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
          />
          <SelectInput
            name="filter"
            id="filter"
            customClass="filter-select"
            label="Filter by:"
            htmlFor="filter"
            values={cardCategories}
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
    </main>
  );
};

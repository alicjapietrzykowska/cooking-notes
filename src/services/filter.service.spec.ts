import {
  ingredientFilterMock,
  recipesMock,
  searchFilterMock,
} from "./filters.service.mock";
import {
  filterRecipeList,
  manageActiveFilters,
} from "@/services/filter.service";
import { sourceFilterMock, activeFiltersMock } from "./filters.service.mock";
import { Recipe, Filter } from "@/store/types";

describe("filter.service.ts", () => {
  describe("manageActiveFilters", () => {
    describe("activeFilters contains filter of the same type", () => {
      it("should update value of activeFilterOfType with the value of the new filter", () => {
        const expected: Filter[] = [
          {
            filterType: "search",
            value: "second",
          },
          {
            filterType: "ingredients",
            value: [
              {
                name: "milk",
                id: "04",
              },
              {
                name: "flour",
                id: "05",
              },
            ],
          },
          {
            filterType: "source",
            value: ["other", "book"],
          },
        ];

        const out = manageActiveFilters(
          ingredientFilterMock,
          activeFiltersMock
        );

        expect(out).toEqual(expected);
      });
      it("should remove search filter from activeFilters if the new search filter has no value", () => {
        const expected: Filter[] = [
          {
            filterType: "ingredients",
            value: [
              {
                name: "potato",
                id: "01",
              },
              {
                name: "milk",
                id: "04",
              },
              {
                name: "flour",
                id: "05",
              },
            ],
          },
          {
            filterType: "source",
            value: ["other", "book"],
          },
        ];
        const emptySearchFilter: Filter = {
          filterType: "search",
          value: "",
        };

        const out = manageActiveFilters(emptySearchFilter, activeFiltersMock);

        expect(out).toStrictEqual(expected);
      });

      it("should remove ingredients filter from activeFilters if the new ingredient filter has no value", () => {
        const expected: Filter[] = [
          {
            filterType: "search",
            value: "second",
          },
          {
            filterType: "source",
            value: ["other", "book"],
          },
        ];
        const emptyIngredientsFilter: Filter = {
          filterType: "ingredients",
          value: [],
        };

        const out = manageActiveFilters(
          emptyIngredientsFilter,
          activeFiltersMock
        );

        expect(out).toEqual(expected);
      });
      it("should remove source filter from activeFilters if the new source filter has no value", () => {
        const expected: Filter[] = [
          {
            filterType: "search",
            value: "second",
          },
          {
            filterType: "ingredients",
            value: [
              {
                name: "potato",
                id: "01",
              },
              {
                name: "milk",
                id: "04",
              },
              {
                name: "flour",
                id: "05",
              },
            ],
          },
        ];
        const emptySourceFilter: Filter = {
          filterType: "source",
          value: [],
        };

        const out = manageActiveFilters(emptySourceFilter, activeFiltersMock);

        expect(out).toEqual(expected);
      });
    });
    describe("activeFilters do not contain filter of the same type", () => {
      it("should return a list only with the provided filter", () => {
        const out = manageActiveFilters(searchFilterMock, []);
        const expected = [searchFilterMock];

        expect(out).toEqual(expected);
      });
      it("should add the provided filter to the list of active filters", () => {
        const activeFilters: Filter[] = [
          {
            filterType: "source",
            value: ["other", "book"],
          },
        ];
        const expected = [
          {
            filterType: "source",
            value: ["other", "book"],
          },
          {
            filterType: "search",
            value: "first",
          },
        ];

        const out = manageActiveFilters(searchFilterMock, activeFilters);

        expect(out).toEqual(expected);
      });
    });
  });
  describe("filterRecipeList", () => {
    it("should return undefined when the list of active filters is empty", () => {
      const out = filterRecipeList([], recipesMock);

      expect(out).toBeUndefined();
    });

    it("should return recipes with searched phrase in names", () => {
      const expected = [
        {
          bookAuthors: "",
          bookPage: "",
          bookTitle: "",
          comment: "",
          creationDate: 1633216620998,
          dates: [1633212000000, 1633039200000, 1631570400000],
          id: "1",
          ingredients: [
            { id: "01", name: "potato" },
            { id: "02", name: "cream" },
            { id: "03", name: "sugar" },
          ],
          lastUsed: 1633212000000,
          name: "First recipe",
          notes: "",
          rating: 4,
          recipeUrl: "",
          source: "book",
        },
      ];
      const out = filterRecipeList([searchFilterMock], recipesMock);

      expect(out).toEqual(expected);
    });

    it("should return empty list when no recipe name match searched phrase", () => {
      const expected: Recipe[] = [];

      const filters: Filter[] = [
        {
          filterType: "search",
          value: "mock search",
        },
      ];

      const out = filterRecipeList(filters, recipesMock);

      expect(out).toEqual(expected);
    });

    it("should return recipes with selected ingredients", () => {
      const expected = [
        {
          bookAuthors: "",
          bookPage: "",
          bookTitle: "",
          comment: "",
          creationDate: 1633216917581,
          dates: [1633039200000, 1630792800000, 1629064800000, 1625349600000],
          id: "2",
          ingredients: [
            { id: "04", name: "milk" },
            { id: "05", name: "flour" },
            { id: "06", name: "sugar" },
          ],
          lastUsed: 1633039200000,
          name: "Second recipe",
          notes: "",
          rating: 5,
          recipeUrl: "",
          source: "book",
        },
      ];

      const out = filterRecipeList([ingredientFilterMock], recipesMock);

      expect(out).toEqual(expected);
    });

    it("should return empty list when no recipe match ingredients filter", () => {
      const expected: Recipe[] = [];

      const filters: Filter[] = [
        {
          filterType: "ingredients",
          value: [
            {
              name: "apple",
              id: "10",
            },
          ],
        },
      ];

      const out = filterRecipeList(filters, recipesMock);

      expect(out).toEqual(expected);
    });

    it("should return recipes of selected source", () => {
      const expected = [
        {
          bookAuthors: "",
          bookPage: "",
          bookTitle: "",
          comment: "",
          creationDate: 1633216917581,
          dates: [1633050000000, 1830792800000, 2029064800000, 1655349600000],
          id: "3",
          ingredients: [],
          lastUsed: 1633036200000,
          name: "Third recipe",
          notes: "",
          rating: 1,
          recipeUrl: "",
          source: "other",
        },
      ];

      const out = filterRecipeList([sourceFilterMock], recipesMock);

      expect(out).toEqual(expected);
    });

    it("should return empty list when no recipe match source filter", () => {
      const expected: Recipe[] = [];

      const filters: Filter[] = [
        {
          filterType: "source",
          value: ["link"],
        },
      ];

      const out = filterRecipeList(filters, recipesMock);

      expect(out).toEqual(expected);
    });

    it("should return recipes with all filters combined", () => {
      const expected = [
        {
          bookAuthors: "",
          bookPage: "",
          bookTitle: "",
          comment: "",
          creationDate: 1633216917581,
          dates: [1633039200000, 1630792800000, 1629064800000, 1625349600000],
          id: "2",
          ingredients: [
            { id: "04", name: "milk" },
            { id: "05", name: "flour" },
            { id: "06", name: "sugar" },
          ],
          lastUsed: 1633039200000,
          name: "Second recipe",
          notes: "",
          rating: 5,
          recipeUrl: "",
          source: "book",
        },
      ];

      const out = filterRecipeList(activeFiltersMock, recipesMock);

      expect(out).toEqual(expected);
    });
  });
});

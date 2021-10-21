import { Recipe, Filter } from "@/store/types";

export const searchFilterMock: Filter = {
  filterType: "search",
  value: "first",
};
export const ingredientFilterMock: Filter = {
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
};
export const sourceFilterMock: Filter = {
  filterType: "source",
  value: ["other"],
};

export const activeFiltersMock: Filter[] = [
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
  {
    filterType: "source",
    value: ["other", "book"],
  },
];

export const recipesMock: Recipe[] = [
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

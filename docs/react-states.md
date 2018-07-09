# React states management

## Key notes

1. One-way data flow down the component hierarchy.
2. For each state in app:
    - Identify components that render UI based on that state
    - Identify a common owner component of above components
    - That common owner should own the state
    - If there is no common owner component, create a new component simply for holding the state.

## Redux

### Manga App - Actions

```js
{
  GET_MANGAS,
  VIEW_MANGA,
  EDIT_MANGA,
  DELETE_MANGA,
  SEARCH_MANGAS_BY_TITLE,
  SEARCH_MANGAS_BY_AUTHOR,

  LOAD_NEXT_PAGE,
  LOAD_PREV_PAGE,

  GET_PAGES,
  VIEW_PAGE,
  TOGGLE_PAGE_FULLSCREEN,

  GET_AUTHORS,
  VIEW_AUTHOR,
  EDIT_AUTHOR,
  DELETE_AUTHOR,
  SEARCH_AUTHORS
}
```

### Manga App - States

- UI states are stored in the components instead of redux store.
- Redux store acts like a client-side database

```js
{
  data,
  communication,
  control,
  session,
  location
}


// data
{
  listingMangas: {
    items: [],
    pagination: {
      current: 2,
      total: 10,
      itemsPerPage: 11
    },
    viewType: 'list', // or 'grid'
    sort: 'alphabetically', // or 'chronologically'
    group: ''
  },

  mangasById: {
    123: {
      id,
      title,
      description,
      coverPicture,
      createdDate,
      updatedDate
    }
  }

  mangasByAuthor: {
    authorX: {
      items
    }
  },

}

```

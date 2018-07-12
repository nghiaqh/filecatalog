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

```javascript
{
  data,
  communication,
  control, // store within component
  session,
  location
}


// data
{
  mangas: {
    all: {
      items: [],
      pageNumber: 2,
      totalPages: 10,
      pageSize: 12,
      type: 'list', // or 'grid'
      sort: 'alphabetically', // or 'chronologically'
      retrieving: false, // communication state
      receivedAt
    },

    byId: {
      123: {
        id,
        title,
        description,
        coverPicture,
        createdDate,
        updatedDate
      }
    },

    byAuthor: {
      1: {
        items
      }
    },

    byTitle: {
      a: { items, pageNumber, totalPages, pageSize, type, sort, retrieving, receivedAt },
      b: { ... }
    },
  },

  mangaReader: {
    list
  }

  authorsPage:
}


```

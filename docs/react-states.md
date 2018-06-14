# React states

## Key notes

1. One-way data flow down the component hierarchy.
2. For each state in app:
    - Identify components that render UI based on that state
    - Identify a common owner component of above components
    - That common owner should own the state
    - If there is no common owner component, create a new component simply for holding the state.

## Manga Board states

- authors: []
- filterAuthor: author obj

- mangas: []
- filterManga: manga obj

- pages: []
- filterPage: page obj

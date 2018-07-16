# TODO

1. onItemClick is firing on all panel components. Limit it to parent component only.

- Done: using PureComponent

2. SearchBox to fetch data from db instead of filter current pagination

- Need to validate and escape form input

3. Keyboard event that load/click next page: implement pagination on first and last item reach.

- Done

4. Update setting to not hard code IP and domain of image server in component

- Done

5. Reorganise molecules and organisms

- SearchBox: atom - d
- AuthorCard, AuthorListeItem, MangaCard, MangaListItem: molecule - d
- CardList, TextList, MangaList: organism -d
- MangasHub: template - d

6. Fix hot reload and redux - 80% done, can we reload initial state?
7. Implement author filter for manga hub - implement author hub and detail instead - d
8. Implement breadcrumb at top app bar
9. Implement load next at the end of manga

module.exports = [
  {
    url: '/',
    component: 'MangaHub'
  },
  {
    url: '/mangas',
    component: 'MangaHub'
  },
  {
    url: '/mangas/:mangaId',
    component: 'MangaDetail'
  },
  {
    url: '/mangas/:mangaId/edit',
    component: 'MangaEdit'
  },
  {
    url: '/mangas/:mangaId/:pageNumber',
    component: 'PageViewer'
  },
  {
    url: '/authors',
    component: 'AuthorHub'
  },
  {
    url: '/authors/:authorId',
    component: 'AuthorDetail'
  }
]

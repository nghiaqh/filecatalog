const {Author, Genre, Manga, Page, Series} = require('../models');

async function updateMangaCover() {
  const pages = await getFirstPages();
  pages.forEach(page => {
    const manga = page.manga();
    manga.updateAttribute('coverPicture', page.uri);
    manga.save((err, obj) => { console.log(err, obj); });
  });
}

function getFirstPages() {
  return Page.find({where: {number: 1}, include: 'manga'});
}

module.exports = {
  updateMangaCover,
};

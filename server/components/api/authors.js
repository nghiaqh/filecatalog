const mysql = require('mysql');
const url = require('url');
const db = require('../../datasources.json').mysqlDs;

/**
 *
 * @param {Object} filter sql-condition object
 * @param {Function} cb callback function
 * @return {Array} author records
 */
function getAuthors(filter, cb) {
  const connection = mysql.createConnection(`mysql://${db.user}:${db.password}@${db.host}/${db.database}`);
  const sql = `SELECT
    DISTINCT Author.id,
    Author.name,
    Author.coverPicture,
    Author.description,
    Author.created,
    Author.updated,
    (SELECT COUNT(*) FROM Manga WHERE Manga.authorId = Author.id) AS mangasCount
  FROM Author LEFT JOIN Manga
  ON Author.id = Manga.authorId
  ${filter && filter.where ? 'WHERE ?' : ''}
  ${filter && filter.order ? 'ORDER BY ?' : 'ORDER BY Author.name'}
  LIMIT ?
  OFFSET ?`;

  connection.query({
    sql,
    values: [
      parseInt(filter && filter.limit || 200),
      parseInt(filter && filter.skip || 0)
    ]
  },
  (err, results, fields) => {
    console.log(err, results);
    cb(results)
  });
}


function setAuthorsRoute(router) {
  return router.get('/api/v2/authors', (req, res) => {
    const filter = url.parse(req.url, true).query.filter;
    getAuthors(filter, (r) => res.send(r));
  })
}
module.exports = { setAuthorsRoute }

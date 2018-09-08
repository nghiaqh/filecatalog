const mysql = require('mysql');
const url = require('url');
const isEmpty = require('lodash/isEmpty')
const db = require('../../datasources.json').mysqlDs;

/**
 *
 * @param {Object} filter sql-condition object
 * @param {Function} cb callback function
 * @return {Array} author records
 */
function getAuthors(filter = {}, cb) {
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
  WHERE ??
  ORDER BY ??
  LIMIT ?
  OFFSET ?`;

  const q = connection.query(
    sql,
    [
      prepareWhereStatement(filter.where),
      filter.order,
      parseInt(filter && filter.limit || 200),
      parseInt(filter && filter.skip || 0)
    ],
    (err, results, fields) => {
      if (err) console.log(err);
      cb(results);
    }
  );
}

function prepareWhereStatement(where) {
  if (isEmpty(where)) return 'Author.id'

  let statement = '';
  Object.keys(where).map(key => {
    statement += `${key} `;
    Object.keys(where[key]).map(operator => {
      statement += `${operator} ${where[key][operator]} `
    });
  });

  return statement;
}

function setAuthorsRoute(router) {
  return router.get('/api/v2/authors', (req, res) => {
    const filter = JSON.parse(
      url.parse(req.url, true).query.filter
    );
    getAuthors(filter, (r) => res.send(r));
  })
}

module.exports = { setAuthorsRoute }

const requestParserMiddleware = (request, response, next) => {
  let requestQuery = {
    ...request.query,
  };
  let fields, sortFields, pageSize, limit;
  let query = {};
  //Fields to exclude for matching
  const removeFields = ["selectFields", "sortFields", "pageSize", "limitSize"];

  //Loop over the remove fields and delete from requestQuery
  removeFields.forEach((param) => delete requestQuery[param]);
  console.log(requestQuery);
  let queryString = JSON.stringify(requestQuery);

  //Create operators if present in query string
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  console.log("Formed queryString");
  console.log(queryString);

  //If query selector (columns) are present
  if (request.query.selectFields) {
    fields = request.query.selectFields.split(",").join(" ");
    console.log(fields);
  }

  if (request.query.sortFields) {
    sortFields = request.query.sortFields.split(",").join(" ");
  }

  pageSize = parseInt(request.query.pageSize, 10) || 1;
  limit = parseInt(request.query.limitSize, 10) || 20;
  let startIndex = (pageSize - 1) * limit;
  let endIndex = pageSize * limit;

  if (typeof fields != "undefined") {
    console.log("Inside selevct fields");
    console.log(fields);
    query["select"] = fields;
  }
  if (typeof sortFields != "undefined") {
    query["sort"] = sortFields;
  }
  if (queryString != "") {
    console.log("queryString final ");
    console.log(queryString);
    query["queryString"] = queryString;
  }
  let skip = 0;
  query["skip"] = skip;
  query["limit"] = limit;

  request.modifiedQuery = {
    query,
    paginationData: { startIndex, endIndex, pageSize, limit },
  };

  console.log("query");
  console.log(query);
  next();
};

module.exports = requestParserMiddleware;

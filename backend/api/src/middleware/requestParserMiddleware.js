const requestParserMiddleware = (request, response, next) => {
  console.log("inside requestParserMiddleware");
  console.log(request.query);
  let requestQuery = {
    ...request.query,
  };
  let fields, sortFields, limitSize, currentPage;
  let query = {};
  let paginationData = {};
  //Fields to exclude for matching
  const removeFields = [
    "selectFields",
    "sortFields",
    "limitSize",
    "currentPage",
  ];

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

  // let pageSize = parseInt(request.query.pageSize, 10) || 1;
  // limit = parseInt(request.query.limitSize, 10) || 20;
  // let startIndex = (pageSize - 1) * limit;
  // let endIndex = pageSize * limit;

  // console.log("Page size" + pageSize);
  // console.log("Limit Size" + limit);

  currentPage = parseInt(request.query.currentPage, 10) || 1;
  limitSize = parseInt(request.query.limitSize) || 10;

  let skip = (currentPage - 1) * limitSize;
  if (typeof fields != "undefined") {
    console.log("Inside select fields");
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
  query["skip"] = skip;
  query["limit"] = limitSize;
  query["currentPage"] = currentPage;

  if (request.query.currentPage && request.query.limitSize) {
    console.log("pagination stuff found");
    paginationData = { currentPage, limitSize };
  }
  request.modifiedQuery = {
    query,
    paginationData,
  };

  console.log("query");
  console.log(query);

  console.log("request updated as");
  console.log(request.modifiedQuery);
  next();
};

module.exports = requestParserMiddleware;
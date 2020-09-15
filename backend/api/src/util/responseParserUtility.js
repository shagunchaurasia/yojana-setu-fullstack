function prepareResponse(response, dataToPass, ...others) {
  let statusCode;
  let count;
  let data;
  let pagination = {};

  if (others.length) {
    console.log("Found other parameters");
    let { endIndex, startIndex, pageSize, limit } = others[0].paginationData;
    let totalData = dataToPass.length;
    console.log(endIndex, totalData, startIndex);
    if (endIndex < totalData) {
      pagination.next = {
        pageSize: pageSize + 1,
        limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        pageSize: pageSize - 1,
        limit,
      };
    }
  }

  if (typeof dataToPass != "undefined") {
    statusCode = 200;
    status = true;
    count = dataToPass.length;
    data = dataToPass;
  } else {
    statusCode = 500;
    status = false;
    count = 0;
    data = {};
  }

  if (others.length) {
    return response.status(statusCode).json({
      status: status,
      count,
      data,
      pagination,
    });
  }

  return response.status(statusCode).json({
    status: status,
    count,
    data,
  });
}

module.exports = { prepareResponse };

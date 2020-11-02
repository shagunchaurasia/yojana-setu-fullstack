function prepareResponse(response, dataToPass, ...others) {
  let statusCode;
  let count;
  let data;
  let totalPages;
  let currentPage;
  let totalData;
  let finalDataToPass;

  console.log("others");
  console.log(others);
  if (others.length) {
    console.log("Found other parameters");
    currentPage = others[0].paginationData.currentPage;
    let limitSize = others[0].paginationData.limitSize;
    console.log("limti recrived");
    console.log(limitSize);
    totalData = dataToPass.total;
    if (limitSize) {
      totalPages = Math.ceil(totalData / limitSize);
    }
    finalDataToPass = dataToPass.data;
  } else {
    console.log("Here inside else");
    totalData = dataToPass.length;
    finalDataToPass = dataToPass;
  }

  console.log("finalDataToPass");
  console.log(finalDataToPass);

  if (typeof dataToPass != "undefined") {
    statusCode = 200;
    status = true;
    count = totalData;
    data = finalDataToPass;
  } else {
    statusCode = 500;
    status = false;
    count = 0;
    data = {};
  }

  //When pagination data is to be sent
  if (others.length) {
    return response.status(statusCode).json({
      status: status,
      count: totalData,
      data,
      currentPage,
      totalPages,
    });
  }

  //When only data and count is to be sent
  return response.status(statusCode).json({
    status: status,
    count,
    data,
  });
}

module.exports = { prepareResponse };
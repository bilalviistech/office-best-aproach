const paginate = async ({
  model,
  query = {},
  sort = { createdAt: -1 },
  populate = [],
  reqQuery = {},
  select = "",
}) => {
  const page = parseInt(reqQuery.page) || 1;
  const limit = parseInt(reqQuery.limit) || 5;
  const skip = (page - 1) * limit;

  let dbQuery = model
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select(select)
    .lean();

  if (populate.length > 0) {
    populate.forEach((pop) => {
      dbQuery = dbQuery.populate(pop);
    });
  }

  const [totalDocs, data] = await Promise.all([
    model.countDocuments(query),
    dbQuery,
  ]);

  const startIndex = skip + 1;
  const endIndex = Math.min(skip + limit, totalDocs);

  return {
    data,
    pagination: {
      totalDocs,
      totalPages: Math.ceil(totalDocs / limit),
      currentPage: page,
      perPage: limit,
      hasNextPage: page * limit < totalDocs,
      hasPrevPage: page > 1,
      currentDataRange: `${startIndex} - ${endIndex}`,
    },
  };
};

export default paginate;
const articleSkeletons = [1, 2, 3, 4, 5, 6];

const ArticleLoading = () => {
  return (
    <section className="fix-height container m-auto px-5 animate-pulse">
      <div className="my-5 w-full md:w-2/3 m-auto bg-gray-300 h-12  rounded  "></div>
      <div className="flex items-center justify-center gap-7 flex-wrap my-5">
        {articleSkeletons.map((skeleton) => (
          <div
            key={skeleton}
            className="p-5 rounde-lg my-10 bg-gray-200 h-20 w-full md:w-2/5 lg:w-1/4 "
          >
            <h3 className="h-6 bg-gray-300 "></h3>
            <p className="my-2  text-gray-300 p-1 h-10"></p>
            <div className=" w-full block  p-1 bg-gray-400 rounded-sm h-8 "></div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-10 mb-10">
        <div className="bg-gray-300 w-60 rounded-sm h-9"></div>
      </div>
    </section>
  );
};

export default ArticleLoading;

const Pagination = ({
  currentPage,
  totalPages,
  totalCount,
  perPage,
  onPageChange,
  onPerPageChange,
  isLoading = false,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePerPageChange = (e) => {
    const newPerPage = Number(e.target.value);
    onPerPageChange(newPerPage);
    onPageChange(1); // Reset ke halaman 1
  };

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalCount);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
      {/* Info halaman */}
      <div className="text-sm text-gray-600">
        {totalCount > 0 ? (
          <>
            Menampilkan {startItem} - {endItem} dari {totalCount} data
            <span className="hidden sm:inline">
              {" "}
              (Halaman {currentPage} dari {totalPages})
            </span>
          </>
        ) : (
          "Tidak ada data"
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Per Page Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Per halaman:</span>
          <select
            value={perPage}
            onChange={handlePerPageChange}
            disabled={isLoading}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1 || isLoading}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed transition text-sm"
          >
            Prev
          </button>

          {/* Page Numbers (optional, bisa ditambahkan untuk navigasi langsung) */}
          <div className="hidden sm:flex items-center gap-1">
            {totalPages > 1 && (
              <>
                {/* Halaman pertama */}
                {currentPage > 2 && (
                  <>
                    <button
                      onClick={() => onPageChange(1)}
                      disabled={isLoading}
                      className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                    >
                      1
                    </button>
                    {currentPage > 3 && (
                      <span className="px-1 text-gray-500">...</span>
                    )}
                  </>
                )}

                {/* Halaman sebelumnya */}
                {currentPage > 1 && (
                  <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={isLoading}
                    className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    {currentPage - 1}
                  </button>
                )}

                {/* Halaman aktif */}
                <button
                  disabled
                  className="px-2 py-1 text-sm bg-blue-600 text-white rounded"
                >
                  {currentPage}
                </button>

                {/* Halaman selanjutnya */}
                {currentPage < totalPages && (
                  <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={isLoading}
                    className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    {currentPage + 1}
                  </button>
                )}

                {/* Halaman terakhir */}
                {currentPage < totalPages - 1 && (
                  <>
                    {currentPage < totalPages - 2 && (
                      <span className="px-1 text-gray-500">...</span>
                    )}
                    <button
                      onClick={() => onPageChange(totalPages)}
                      disabled={isLoading}
                      className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || isLoading}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed transition text-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

import React from 'react'

const Pagination = ({handlePrevPage, handleNextPage, currentPage, pages, data}) => {

  return (
    <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={!data.data.prev}
          className={`p-2 rounded bg-blue-500 text-white hover:bg-blue-700 ${ !data.data.prev ? "opacity-50 cursor-not-allowed" : "" }`}
        >
         Anterior
        </button>

        <span className="text-lg">
          {currentPage} de {pages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage > pages - 1}
          className={`p-2 rounded bg-blue-500 text-white hover:bg-blue-700 ${ currentPage > pages - 1 ? "opacity-50 cursor-not-allowed" : "" }`}
        >
          Siguiente
        </button>
      </div>
  )
}

export default Pagination
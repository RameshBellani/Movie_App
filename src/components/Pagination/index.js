import React from 'react'
import './index.css'

class Pagination extends React.Component {
  onNextPage = () => {
    const {onPageChange, currentPage, totalPages} = this.props
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1) // Call onPageChange with the next page number
    }
  }

  onPrevPage = () => {
    const {onPageChange, currentPage} = this.props
    if (currentPage > 1) {
      onPageChange(currentPage - 1) // Call onPageChange with the previous page number
    }
  }

  render() {
    const {currentPage, totalPages} = this.props

    return (
      <div className="pg-container">
        <button
          type="button"
          className="control-btn"
          onClick={this.onPrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <p className="page-no">{currentPage}</p>
        <button
          type="button"
          className="control-btn"
          onClick={this.onNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    )
  }
}

export default Pagination

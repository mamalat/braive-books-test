import styles from './Styles.module.scss'

const hideImgWhenError = (e) => {
  e.target.onerror = null
  e.target.style.display = 'none'
}

function Book({ book, handleKeyDown, onBlur, onFocus, onClick}) {

  //...

  
  return (
    <div className={styles.book} tabIndex="0" onKeyDown={handleKeyDown} onBlur={onBlur} onFocus={() => onFocus(book)} onClick={onClick}>
      <div className={styles.bookCover}>
        <img className={styles.bookCoverImg} src={book.thumbnail} alt={book.title} onError={hideImgWhenError} />
        <img className={styles.bookCoverBackdrop} src={book.thumbnail} alt={book.title} onError={hideImgWhenError} />
      </div>
      <div className={styles.bookTitle} title={book.title}>{book.title}</div>
      <div className={styles.bookAuthor}>{book.authors?.join(', ') || 'Author unspecified'}</div>
    </div>
  )
}

export default Book
import { useState } from 'react'
import classnames from 'classnames'

import './App.scss'
import Book from './Book.js'
import styles from './Styles.module.scss'

function App() {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [focusedBook, setFocusedBook] = useState(null)

  const searchBooks = (query) => {
    setLoading(true)

    // for pagination - &startIndex=${books?.length || 0}

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&key=AIzaSyAhKvytc0hDgLuJiVsfXEuIhPcv-_P96KA`)
    .then(async (response) => {
      const data = await response.json()

      const newBooks = data.items?.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        link: item.volumeInfo.infoLink,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || ''
      }))

      setBooks(newBooks || [])
      // setBooks(books?.concat(newBooks) || [])
    })
    .catch(function (err) {
      // TODO: Something went wrong
    })
    .finally(() => setLoading(false))
  }

  const onQueryChange = ({ target }) => {
    setQuery(target.value)

    if (!target.value) {
      setTimeout(() => setBooks([]), 300)
      return
    }

    searchBooks(target.value)
  }

  const handleKeyDown = (e) => {
    console.log('handleKeyDown')
    if (e.key === 'Enter' && focusedBook) {
      window.open(focusedBook.link, '_blank').focus()
    }
  }

  const onBookFocus = (book) => {
    setFocusedBook(book)
  }

  const onBookBlur = () => {
    setFocusedBook(null)
  }

  const onBookClick = (book) => {
    window.open(focusedBook.link, '_blank').focus()
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <input
          value={query}
          type="text"
          placeholder="Search books ..."
          className={styles.input}
          onChange={onQueryChange}
        />

        <div className={classnames(styles.results, {[styles.resultsBooks]: books?.length })}>
          {books?.map((book) => (
            <Book key={book.id} book={book} handleKeyDown={handleKeyDown} onBlur={onBookBlur} onFocus={onBookFocus} onClick={onBookClick} />
          ))}

          {loading && (
            <div className={styles.resultsSearching}>
              <p>Loading...</p>
            </div>
          )}

          {query.length === 0 && (
            <div className={styles.resultsInitial}>
              <img src="./books.png" alt="" />
              <p>Start by search for books by their authors, title or keywords.</p>
            </div>
          )}

          {query.length > 0 && books?.length === 0 && !loading && (
            <div className={styles.resultsEmpty}>
              <img src="./empty.png" alt="" />
              <p>Couldn't find books you looking for, try changing query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

// <button onClick={()=> searchBooks(query)}>Load more</button>
// debounce search
// display details
// pagination - 
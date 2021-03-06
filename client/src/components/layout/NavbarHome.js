import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Sidenav from './Sidenav';
import M from 'materialize-css/dist/js/materialize.min.js';
import SearchBar from './SearchBar';
import RecipeContext from '../../context/recipe/recipeContext';
import CategoryBar from './CategoryBar';

const Navbar = () => {
  const recipeContext = useContext(RecipeContext);
  const { clearCurrent, searchRecipes, filters, clearSearch } = recipeContext;

  const history = useHistory();

  useEffect(() => {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, null);
    //eslint-disable-next-line
  }, []);

  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [categBarVisible, setCategBarVisible] = useState(false);
  const [bookmarksVisible, setBookmarksVisible] = useState(false);

  useEffect(() => {
    searchRecipes({
      ...filters,
      bookmarked: bookmarksVisible,
    });
    //eslint-disable-next-line
  }, [bookmarksVisible]);

  useEffect(() => {
    setBookmarksVisible(filters.bookmarked);
    //eslint-disable-next-line
  }, [filters]);

  const onAddRecipe = (e) => {
    clearCurrent();
    history.push('/recipe');
  };

  const onSearchButtonClicked = () => {
    if (searchBarVisible) {
      setSearchBarVisible(false);
    } else {
      setSearchBarVisible(true);
      setCategBarVisible(false);
    }
  };

  const onCategButtonClicked = () => {
    if (categBarVisible) {
      setCategBarVisible(false);
    } else {
      setCategBarVisible(true);
      setSearchBarVisible(false);
    }
  };

  const onBookmarkButtonClicked = () => {
    if (bookmarksVisible) {
      setBookmarksVisible(false);
    } else {
      setBookmarksVisible(true);
    }
  };

  const closeCategoryBar = () => {
    setCategBarVisible(false);
  };

  const closeSearchBar = () => {
    setSearchBarVisible(false);
  };

  return (
    <Fragment>
      <nav className='blue' style={{ marginBottom: '20px' }}>
        <div className='nav-wrapper'>
          <ul id='nav-mobile' className='left'>
            <li>
              <a
                href='#!'
                className='sidenav-trigger show-on-large'
                data-target='slide-out'
              >
                <i className='material-icons'>menu</i>
              </a>
            </li>
          </ul>
          <ul id='nav-mobile' className='right'>
            <li>
              <a href='#!' onClick={onAddRecipe} title='Aggiungi ricetta'>
                <i className='material-icons'>add</i>
              </a>
            </li>
            <li>
              <a
                href='#!'
                onClick={onBookmarkButtonClicked}
                title='Mostra preferiti'
              >
                <i
                  className='material-icons'
                  style={{
                    color: filters.bookmarked ? '#ffff00' : 'white',
                  }}
                >
                  bookmark
                </i>
              </a>
            </li>
            <li>
              <a
                href='#!'
                onClick={onCategButtonClicked}
                title='Cerca per categorua'
              >
                <i
                  className='material-icons'
                  style={{
                    color: categBarVisible ? '#ffff00' : 'white',
                  }}
                >
                  view_carousel
                </i>
              </a>
            </li>
            <li>
              <a
                href='#!'
                onClick={onSearchButtonClicked}
                title='Cerca ricette'
              >
                <i
                  className='material-icons'
                  style={{
                    color: searchBarVisible ? '#ffff00' : 'white',
                  }}
                >
                  search
                </i>
              </a>
            </li>
            <li>
              <a href='#!' onClick={clearSearch} title='Resetta Filtri'>
                <i className='material-icons'>cancel</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {searchBarVisible && <SearchBar onClose={closeSearchBar} />}
      {categBarVisible && <CategoryBar onClose={closeCategoryBar} />}

      <Sidenav />
    </Fragment>
  );
};

export default Navbar;

import React from 'react';
import { ReactComponent as RightArrowIcon } from '../../assets/right-arrow-svgrepo-com.svg';
import { ReactComponent as LeftArrowIcon } from '../../assets/left-arrow-svgrepo-com.svg';
import { ReactComponent as DoubleLeftArrowIcon } from '../../assets/chevron-double-left-svgrepo-com.svg';
import { ReactComponent as DoubleRightArrowIcon } from '../../assets/chevron-double-right-svgrepo-com.svg';
import './styles.scss';

const currentItem = 1;

type PaginationMathProps = {
  offset: number;
  limit: number;
  total: number;
  setOffset: Function;
};

export const SelectPages: React.FC<PaginationMathProps> = ({
  offset,
  limit,
  total,
  setOffset,
}) => {
  let maxItems = 5;

  const maxLeft = (maxItems - currentItem) / 2;

  const currentPage = offset ? offset / limit + 1 : 1;
  const countPages = Math.ceil(total / limit);
  const firstPage = Math.max(currentPage - maxLeft, 1);

  if (window.matchMedia('(max-width: 480px)').matches) {
    maxItems = 3;
  } else {
    maxItems = 5;
  }

  return (
    <footer id="container_pagination">
      <ul className="pages_list">
        {currentPage !== firstPage && (
          <>
            <li>
              <button className="first_page" onClick={() => setOffset(0)}>
                <DoubleLeftArrowIcon />
              </button>
            </li>

            <li>
              <button
                className="go_back"
                onClick={() => setOffset(offset - limit)}
              >
                <LeftArrowIcon />
              </button>
            </li>
          </>
        )}

        {Array.from({ length: Math.min(maxItems, countPages) })
          .map((_, index) => index + firstPage)
          .map((page) => (
            <li key={page} className="number_buttons">
              {page < 151 && (
                <button
                  onClick={() => setOffset((page - 1) * limit)}
                  className={page === currentPage ? 'current-page' : ''}
                >
                  {page}
                </button>
              )}
            </li>
          ))}

        {offset !== 1490 && (
          <>
            <li>
              <button
                className="go_forward"
                onClick={() => setOffset(offset + limit)}
              >
                <RightArrowIcon />
              </button>
            </li>
            <li>
              <button className="last_page" onClick={() => setOffset(1490)}>
                <DoubleRightArrowIcon />
              </button>
            </li>
          </>
        )}
      </ul>
    </footer>
  );
};

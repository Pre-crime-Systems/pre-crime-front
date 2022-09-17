import React from 'react';
import cx from 'classnames';
import './pagination.scss';
import Icon from '../Icon/Icon';

export type PaginationProps = {
  className?: string;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  page: number;
  size?: number;
  total?: number;
  onPageChange?: (page: number) => void;
};

export interface INumberPage {
  className?: string;
  page: number;
}

const Pagination: React.FunctionComponent<PaginationProps> = (
  props: PaginationProps
): React.ReactElement<PaginationProps> | null => {
  const {
    className: className,
    page: currentPage,
    size,
    total,
    onPageChange,
  } = props;
  const totalPages = total && size ? Math.ceil(total / size) : null;
  const windowInnerWidth = window.innerWidth;
  const [visiblePages, setVisiblePages] = React.useState<INumberPage[] | null>(
    null
  );
  const [prevCurrentPage, setPrevCurrentPage] = React.useState<number | null>(
    null
  );
  let visiblePager = false;
  if (totalPages) visiblePager = totalPages > 1;

  const generatePages = (values: number[]) =>
    values.map((value) => {
      return { page: value };
    });

  const getVisiblePages = () => {
    let returnPages: INumberPage[] | null = null;

    if (windowInnerWidth >= 768 && totalPages) {
      const standardPage = 5;
      if (totalPages <= standardPage) {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) pages.push({ page: i });
        returnPages = pages;
      }
      if (totalPages > standardPage) {
        let first = currentPage - 2;
        let second = currentPage - 1;
        let third = currentPage + 1;
        let fourth = currentPage + 2;
        if (currentPage < 6)
          returnPages = generatePages([1, 2, 3, 4, 5, 0, totalPages]);
        if (currentPage >= 6)
          returnPages = generatePages([
            1,
            0,
            first,
            second,
            currentPage,
            third,
            fourth,
            0,
            totalPages,
          ]);
        if (currentPage >= totalPages - 4) {
          first = totalPages - 4;
          second = totalPages - 3;
          third = totalPages - 2;
          fourth = totalPages - 1;
          returnPages = generatePages([
            1,
            0,
            first,
            second,
            third,
            fourth,
            totalPages,
          ]);
        }
      }
    }

    if (windowInnerWidth < 768 && totalPages) {
      const standardPage = 3;
      if (totalPages <= standardPage) {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) pages.push({ page: i });
        returnPages = pages;
      }
      if (totalPages > standardPage) {
        if (currentPage < 3) returnPages = generatePages([1, 2, 0, totalPages]);
        if (currentPage > 2)
          returnPages = generatePages([1, 0, currentPage, 0, totalPages]);
        if (currentPage >= totalPages - 2) {
          let first = totalPages - 2;
          let second = totalPages - 1;
          returnPages = generatePages([1, 0, first, second, totalPages]);
        }
      }
    }
    setVisiblePages(returnPages);
  };

  const changePage = (page: INumberPage) => {
    if (page.page !== currentPage && page.page !== 0) {
      onPageChange && onPageChange(page.page);
    }
  };

  React.useEffect(() => {
    getVisiblePages();
    setPrevCurrentPage(currentPage);
  }, [prevCurrentPage, currentPage, totalPages, size]);

  if (visiblePages && visiblePager) {
    return (
      <section className={cx('pagination', className && className)}>
        <nav className="pagination__content">
          <button
            className="pageButton"
            onClick={() => {
              if (currentPage === 1) return;
              onPageChange && onPageChange(currentPage - 1);
            }}
            disabled={currentPage === 1}
          >
            <Icon className="pageButton__icon" type="chevron-left" />
          </button>
          {visiblePages &&
            visiblePages.map((page: INumberPage, index: number) => {
              let labelButton = '...';
              if (page.page !== 0) labelButton = page.page.toString();
              return (
                <button
                  className={cx(
                    'pageButton',
                    currentPage === page.page && 'pageButton--active',
                    page.page === 0 && 'pageButton--block'
                  )}
                  key={`${page.page}_${index}`}
                  onClick={() => {
                    changePage(page);
                  }}
                >
                  {labelButton}
                </button>
              );
            })}
          <button
            className="pageButton"
            onClick={() => {
              if (currentPage === totalPages) return;
              onPageChange && onPageChange(currentPage + 1);
            }}
            disabled={currentPage === totalPages}
          >
            <Icon className="pageButton__icon" type="chevron-right" />
          </button>
        </nav>
      </section>
    );
  }

  return null;
};

export default Pagination;

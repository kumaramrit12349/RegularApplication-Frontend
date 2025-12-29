import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ListView from "./ListView";
import { fetchNotificationsByCategory } from "../../../services/api";
import type { HomePageNotification } from "../../../types/notification";

const PAGE_SIZE = 20;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CategoryView: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const decodedCategory = decodeURIComponent(category ?? "");
  const query = useQuery();
  const searchValue = query.get("searchValue") ?? "";

  const [items, setItems] = useState<HomePageNotification[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    loadPage(1, true);
    // eslint-disable-next-line
  }, [decodedCategory, searchValue]);

  const loadPage = async (pg: number, isFirst = false) => {
    try {
      const res = await fetchNotificationsByCategory(
        decodedCategory,
        pg,
        PAGE_SIZE,
        searchValue
      );
      if (isFirst) setItems(res.data);
      else setItems((prev) => [...prev, ...res.data]);
      setHasMore(res.hasMore);
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
      setPage(pg + 1);
    }
  };

  return (
    <div className="container py-3 px-2 px-md-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <h2
            className="mb-3 text-center text-capitalize"
            style={{ fontSize: "1.6rem" }}
          >
            {decodedCategory.replace(/-/g, " ")}
            {searchValue && (
              <span className="text-muted ms-2" style={{ fontSize: "1rem" }}>
                (Search: "{searchValue}")
              </span>
            )}
          </h2>
          {loading && items.length === 0 ? (
            <div className="text-center py-5">
              <span className="spinner-border text-primary" role="status" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <b>No notifications available.</b>
            </div>
          ) : (
            <InfiniteScroll
              dataLength={items.length}
              next={() => loadPage(page)}
              hasMore={hasMore}
              loader={
                <div className="text-center py-4">
                  <span className="spinner-border text-primary" role="status" />
                </div>
              }
              endMessage={
                items.length > 0 && !hasMore && items.length >= PAGE_SIZE ? (
                  <p className="text-center text-muted py-4 mb-0">
                    <b>No more notifications.</b>
                  </p>
                ) : null
              }
            >
              <ListView
                title={decodedCategory}
                items={items}
                showSeeMore={false}
                showAllItems={true}
              />
            </InfiniteScroll>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryView;

import React, { useEffect, useState } from "react";
import ListView from "../../features/notifications/components/ListView";
import { fetchNotificationsByCategory, fetchHomePageNotifications } from "../../services/api";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import type { HomePageNotification } from "../../types/notification";


interface GroupedNotifications {
  [category: string]: HomePageNotification[];
}

const PAGE_SIZE = 20;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const HomePage: React.FC = () => {
  const query = useQuery();
  const searchValue = query.get("searchValue") ?? "";

  // For infinite search results
  const [searchResults, setSearchResults] = useState<HomePageNotification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // For grouped, default view
  const [grouped, setGrouped] = useState<GroupedNotifications>({});
  const [groupedLoading, setGroupedLoading] = useState<boolean>(false);

  // Effect for Home when no search
  useEffect(() => {
    if (searchValue) return;
    setGroupedLoading(true);
    fetchHomePageNotifications()
      .then(apiResponse => setGrouped(apiResponse.data))
      .catch(error => {
        setGrouped({});
        console.error("Failed to fetch homepage notifications", error);
      })
      .finally(() => setGroupedLoading(false));
  }, [searchValue]);

  // Effect for search mode (infinite scroll)
  useEffect(() => {
    if (!searchValue) return;
    setLoading(true);
    fetchNotificationsByCategory("all", 1, PAGE_SIZE, searchValue)
      .then(res => {
        setSearchResults(res.data);
        setHasMore(res.hasMore);
        setPage(2);
      })
      .catch(() => {
        setSearchResults([]);
        setHasMore(false);
      })
      .finally(() => setLoading(false));
  }, [searchValue]);

  const fetchMore = async () => {
    if (!searchValue) return;
    setLoading(true);
    try {
      const res = await fetchNotificationsByCategory("all", page, PAGE_SIZE, searchValue);
      setSearchResults(prev => [...prev, ...res.data]);
      setHasMore(res.hasMore);
      setPage(page + 1);
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // UI for InfiniteScroll Search Results
  if (searchValue) {
    return (
      <div className="container py-3 px-2 px-md-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <h2 className="mb-3 text-center" style={{ fontSize: "1.6rem" }}>
              Search Results
              <span className="text-muted ms-2" style={{ fontSize: "1rem" }}>
                (Search: "{searchValue}")
              </span>
            </h2>
            {loading && searchResults.length === 0 ? (
              <div className="text-center py-5">
                <span className="spinner-border text-primary" role="status" />
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <b>No matching notifications.</b>
              </div>
            ) : (
              <InfiniteScroll
                dataLength={searchResults.length}
                next={fetchMore}
                hasMore={hasMore}
                loader={
                  <div className="text-center py-4">
                    <span className="spinner-border text-primary" role="status" />
                  </div>
                }
                endMessage={
                  searchResults.length > 0 && !hasMore && (
                    <p className="text-center text-muted py-4 mb-0">
                      <b>No more results.</b>
                    </p>
                  )
                }
              >
                <ListView
                  category="Search Results"
                  items={searchResults}
                  showSeeMore={false}
                  showAllItems={true}
                />
              </InfiniteScroll>
            )}
          </div>
        </div>
      </div>
    );
  }

  // UI for default: grouped category cards
  return (
    <div className="page">
      <div className="container py-4">
        <div className="row g-4">
          {groupedLoading ? (
            <div className="text-center m-auto py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            Object.entries(grouped).map(([category, notifications]) => (
              <div key={category} className="col-12 col-md-6 col-lg-4">
                <div className="h-100 shadow-sm">
                  <ListView
                    category={category}
                    items={notifications}
                    loading={groupedLoading}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

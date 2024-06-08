import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import APICall from "/src/Library/API/APICall";
import toast from "react-hot-toast";
import Post from "/src/components/Post/Post";

const PostList = ({ sort }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const getPosts = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await APICall(`/api/posts/getPosts/?sort=${sort}&page=${page}`, "GET", {});
      if (response.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prevPosts => [...prevPosts, ...response]);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }, [sort, page, loading]);

  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
  }, [sort]);

  useEffect(() => {
    getPosts();
  }, [getPosts, page]);

  const loadMorePosts = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={loadMorePosts}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
    >
      {posts.map((post, i) => (
        <Post key={i} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default PostList;

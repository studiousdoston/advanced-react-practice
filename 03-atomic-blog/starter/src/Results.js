import { usePosts } from "./Context/PostContext";

export default function Results() {
  const { posts } = usePosts();
  return <p>🚀 {posts.length} atomic posts found</p>;
}

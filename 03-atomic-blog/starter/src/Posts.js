
import List from "./List";
import { usePosts } from "./Context/PostContext";

export default function Posts() {
  const { posts } = usePosts();
  return (
    <section>
      <List posts={posts} />
    </section>
  );
}

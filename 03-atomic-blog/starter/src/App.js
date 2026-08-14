import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Archive from "./Archive";
import Footer from "./Footer";
import { PostProvider } from "./Context/PostContext";

function App() {
  const [isFakeDark, setIsFakeDark] = useState(false);
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark],
  );

  return (
    <section>
      <button
        onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>
      <PostProvider>
        <Header />
        <Main />
        <Archive />
        <Footer />
      </PostProvider>
    </section>
  );
}

export default App;

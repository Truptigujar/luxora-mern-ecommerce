import CategoryPage from "./CategoryPage";
import "../styles/Dresses.css";

export default function Dresses() {
  return (
    <CategoryPage
      category="dresses"
      title="Silhouettes Worth Remembering"
      subtitle="Statement dresses and refined sets, tailored for men and women alike."
      heroImage="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1400"
      accentClass="dresses-page"
    />
  );
}

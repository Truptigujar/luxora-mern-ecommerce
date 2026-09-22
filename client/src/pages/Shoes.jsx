import CategoryPage from "./CategoryPage";
import "../styles/Shoes.css";

export default function Shoes() {
  return (
    <CategoryPage
      category="shoes"
      title="Step Into Something Iconic"
      subtitle="Sneakers, boots & heels for men and women — crafted for every stride."
      heroImage="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1400"
      accentClass="shoes-page"
    />
  );
}

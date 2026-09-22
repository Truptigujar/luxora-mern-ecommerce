import CategoryPage from "./CategoryPage";
import "../styles/Perfumes.css";

export default function Perfumes() {
  return (
    <CategoryPage
      category="perfumes"
      title="A Signature In Every Spray"
      subtitle="Woody, floral & fresh fragrances for men and women, bottled with intention."
      heroImage="https://images.unsplash.com/photo-1541643600914-78b084683601?w=1400"
      accentClass="perfumes-page"
    />
  );
}

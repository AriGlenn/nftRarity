import styles from "../styles/Home.module.css";
import NftRarityComponent from "../components/NftRarityComponent";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <NftRarityComponent></NftRarityComponent>
      </main>
    </div>
  );
}

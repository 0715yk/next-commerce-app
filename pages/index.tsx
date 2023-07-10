import styles from '../styles/home.module.css';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/get-items')
      .then((res) => res.json())
      .then((data) => alert(data.message));
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef.current === null || inputRef.current.value === '') {
      alert('name을 넣어주세요.');
      return;
    }
    fetch(`api/add-item?name=${inputRef.current.value}`)
      .then((res) => res.json())
      .then((data) => alert(data.message));
  };

  return (
    <main className={styles.main}>
      <div>
        <p>Product List</p>
        {products &&
          products.map((item) => <div key={item}>{JSON.stringify(item)}</div>)}
      </div>
    </main>
  );
}

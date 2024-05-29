import React from 'react';
import { BackgroundSlider } from '../components/InfiniteSlider';

const Home = () => {
  return (
    <div>
      <BackgroundSlider />
    </div>
  );
};

// サーバーサイドでクッキーをチェックし、リダイレクト
export async function getServerSideProps({ req }) {
  const { cookies } = req;
  const token = cookies.access;

  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // 必要な場合に他のプロパティを追加
  };
}

export default Home;
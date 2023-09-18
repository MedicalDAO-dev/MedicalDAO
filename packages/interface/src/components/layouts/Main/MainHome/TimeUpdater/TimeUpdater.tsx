import { useAuctionController } from '@/hooks/useAuction';
import React, { useEffect } from 'react';

const TimeUpdater: React.FC = () => {
  const { updateCurrentDateTime } = useAuctionController();

  useEffect(() => {
    const interval = setInterval(() => {
      updateCurrentDateTime();
    }, 1000);

    // コンポーネントがアンマウントされたときのクリーンアップ関数
    return () => clearInterval(interval);
  }, []);

  return <></>
}

export default TimeUpdater;






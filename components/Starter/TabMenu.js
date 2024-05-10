import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styles from '/styles/Starter/TabMenu.module.css';
import { HorseCards } from './HorseCards';

export function RaceMenuTabs() {
  return (
    <Tabs>
      <TabList className={styles.tabList}>
        <Tab>出馬表</Tab>
        <Tab>オッズ</Tab>
      </TabList>

      {/* 出馬表タブ */}
      <TabPanel>
        <Tabs forceRenderTabPanel>
          <TabList className={styles.tabList}>
            <Tab>出馬表</Tab>
            <Tab>GAG</Tab>
          </TabList>
          <TabPanel>
            {/* 馬柱コンポーネント  */}
            <HorseCards />
          </TabPanel>
          <TabPanel>
            <p>ここにGAGの情報が表示されます。</p>
          </TabPanel>
        </Tabs>
      </TabPanel>

      {/* オッズタブ */}
      <TabPanel>
        <Tabs forceRenderTabPanel>
          <TabList className={styles.tabList}>
            <Tab>単勝</Tab>
            <Tab>３連単</Tab>
          </TabList>
          <TabPanel>
            <p>ここに単勝のオッズが表示されます。</p>
          </TabPanel>
          <TabPanel>
            <p>ここに３連単のオッズが表示されます。</p>
          </TabPanel>
        </Tabs>
      </TabPanel>
    </Tabs>
  );
}

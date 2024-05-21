'use client';

import React from 'react';
import { SellEnum } from '@/enum/sell';
import { Drawer } from '@/components/common/Drawer';
import { useSellStore } from '@/stores/useSellStore';
import QuickSell from '@/components/sell/drawers/QuickSell';
import QuickSellEdit from '@/components/sell/drawers/QuickSellEdit';
import ConfirmPayment from '@/components/sell/drawers/ConfirmPayment';
import TransactionEdit from '@/components/sell/drawers/TransactionEdit';
import MoneyGiveReceived from '@/components/sell/drawers/MoneyGiveReceived';
import TransactionDetails from '@/components/sell/drawers/TransactionDetails';
import { IUserResponse } from '@/types/contact/partyResponse';
import { IDueListResponse } from '@/types/due/dueResponse';

const SellDrawers = ({
  customers,
  dueList,
}: {
  customers?: IUserResponse[];

  dueList: IDueListResponse[];
}) => {
  const drawerState = useSellStore((state) => state.sellDrawerState);
  const handleClose = useSellStore((state) => state.setSellDrawerState);

  const renderedDrawers = (activeDrawer: string | undefined) => {
    if (SellEnum.QUICK_SELL === activeDrawer) {
      return <QuickSell customers={customers} />;
    } else if (SellEnum.CONFIRM_PAYMENT === activeDrawer) {
      return <ConfirmPayment />;
    } else if (SellEnum.MONEY_GIVEN_ENTRY === activeDrawer) {
      return <MoneyGiveReceived dueList={dueList} customers={customers} />;
    } else if (SellEnum.MONEY_RECEIVED_ENTRY === activeDrawer) {
      return <MoneyGiveReceived dueList={dueList} customers={customers} />;
    } else if (SellEnum.TRANSACTION_DETAILS === activeDrawer) {
      return <TransactionDetails />;
    } else if (SellEnum.QUICK_SELL_EDIT === activeDrawer) {
      return <QuickSellEdit customers={customers} />;
    } else if (SellEnum.TRANSACTION_EDIT === activeDrawer) {
      return <TransactionEdit customers={customers} />;
    }
  };

  return (
    <Drawer
      open={drawerState.open}
      header={drawerState.header}
      onClose={(open) => handleClose({ open })}
    >
      {renderedDrawers(drawerState.header)}
    </Drawer>
  );
};

export default SellDrawers;

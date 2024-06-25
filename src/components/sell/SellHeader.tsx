'use client';
import React from 'react';
import Image from 'next/image';
import { SellEnum } from '@/enum/sell';
import { Button } from '@/components/ui/button';
// import { PageTitle } from '@/components/common/text';
import { useSellStore } from '@/stores/useSellStore';
import { hasPermission } from '@/lib/utils';
import { useRoleStore } from '@/stores/useRoleStore';

const SellHeader = () => {
  const handleDrawerOpen = useSellStore((state) => state.setSellDrawerState);
  const userRoles = useRoleStore((state) => state.roles);

  return (
    <div className="flex flex-wrap gap-space16 justify-between items-center relative">
      {/* <PageTitle title="Select Products to Sell" /> */}
      {hasPermission(userRoles, 'SELL_QUICK') && (
        <Button
          variant={'secondary'}
          className="h-14 "
          onClick={() =>
            handleDrawerOpen({ open: true, header: SellEnum.QUICK_SELL })
          }
        >
          <Image src="/images/quick_sell.svg" height={20} width={20} alt="" />
          <span>{SellEnum.QUICK_SELL}</span>
        </Button>
      )}
    </div>
  );
};

export default SellHeader;

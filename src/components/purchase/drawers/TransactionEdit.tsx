import { z } from 'zod';
import { SellEnum } from '@/enum/sell';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '@/components/common/Icon';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePurchaseStore } from '@/stores/usePurchase';
import { DrawerFooter } from '@/components/common/Drawer';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Image } from '@/components/common/Image';

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { PurchaseEnum } from '@/enum/purchase';
import { IUserResponse } from '@/types/contact/partyResponse';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn, formatDate, generateUlid } from '@/lib/utils';
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  MessageSquareText,
  UserSearch,
} from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ulid } from 'ulid';
import { getCookie, getCookies } from 'cookies-next';
import { IShopResponse } from '@/types/shop';
import { DEFAULT_STARTING_VERSION } from '@/lib/constants/product';
import { DATE_FORMATS, PAYMENT_METHODS } from '@/lib/constants/common';
import { usePurchase } from '@/stores/usePurchaseStore';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { PAYMENT_STATUS } from '@/lib/constants/purchase';
import { createPurchase } from '@/actions/purchase/createPurchase';
import { useSession } from 'next-auth/react';
import { jwtDecode } from 'jwt-decode';
import { createDueItem } from '@/actions/due/createDueItem';
import { IProducts, IPurchaseProducts } from '@/types/purchase';
import { getPurchaseItems } from '@/actions/purchase/getPurchaseItems';
import ProductListCard from '../ProductListCard';
import { Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons';
import ProductListCardEdit from '../ProductListCardEdit';
import { filteringOptions } from '@/config/orders';

const partyList = ['customer', 'supplier'];

const cashType = [
  { value: 'given', label: 'Given', dis: 'You give money' },
  { value: 'received', label: 'Received', dis: 'You received money/product' },
];

const formSchema = z.object({
  amount: z.string().min(1, {
    message: 'this field is required.',
  }),
  name: z.string().min(1, {
    message: 'this field is required.',
  }),
  number: z.string().min(11).max(11, {
    message: 'this field is required.',
  }),
  details: z.string().optional(),
  images: z.string(),
  cash_type: z.string(),
  contact: z.any(),
  sms: z.boolean().optional(),
  date: z.date(),
});

const TransactionEdit = ({ suppliers }: { suppliers?: IUserResponse[] }) => {
  const handleSellDrawer = usePurchaseStore((state) => state.setDrawerState);
  const openSuccessDialog = usePurchaseStore((state) => state.setDialogState);
  const [contact, setContact] = useState<IUserResponse>();
  const calculatedProducts = usePurchase((state) => state.calculatedProducts);
  const setCalculatedProducts = usePurchase(
    (state) => state.setCalculatedProducts
  );
  const session = useSession();
  const cookie = getCookie('shop');
  const tkn = getCookie('access_token');
  const currentPurchase = usePurchase((state) => state.currentPurchase);
  const [purchaseProducts, setPurchaseProducts] = useState<IPurchaseProducts>();
  const [edit, setEdit] = useState(false);

  // const shop =cookie &&  JSON.parse(cookie) as IShopResponse;

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: '',
      details: '',
      number: '',
      images: '',
      cash_type: 'received',
      contact: {},
      sms: false,
    },
  });

  async function onSubmit(data: any) {
    const responseCreatePurchase = await createPurchase({
      batch: '',
      created_at: formatDate(DATE_FORMATS.default, data.date),
      date: formatDate(DATE_FORMATS.default, data.date),
      discount: Number(currentPurchase?.discount),
      discount_type: currentPurchase?.discount_type ?? '',
      extra_charge: Number(currentPurchase?.extra_charge),
      note: data.details,
      payment_method: PAYMENT_METHODS['Due Payment'],
      payment_status: PAYMENT_STATUS.unpaid,
      purchase_barcode: currentPurchase?.purchase_barcode ?? '',
      received_amount: Number(data.amount),
      supplier_mobile: data.name,
      supplier_name: data.number,
      total_item: currentPurchase?.total_item ?? 0,
      total_price: Number(data.amount),
      unique_id: generateUlid(),
      updated_at: formatDate(DATE_FORMATS.default),
      user_id: tkn ? Number(jwtDecode(tkn).sub) : 0,
      version: currentPurchase?.version ? currentPurchase?.version + 1 : 0,
      sms: data.sms ? 'sms' : null,
    });

    if (currentPurchase?.payment_status === PAYMENT_STATUS.unpaid) {
      const payload = {
        amount: Number(data.amount),
        unique_id: generateUlid(),
        due_left: -Number(data.amount),
        version: DEFAULT_STARTING_VERSION,
        updated_at: formatDate(DATE_FORMATS.default),
        created_at: formatDate(DATE_FORMATS.default),
        message: data.details,
        contact_mobile: data.number,
        contact_type: 'SUPPLIER',
        contact_name: data.name,
        sms: data.sms ?? false,
      };

      const res = await createDueItem(payload);
    }

    setCalculatedProducts({
      ...calculatedProducts,
      paymentAmount: Number(data.amount),
      date: formatDate(DATE_FORMATS.default, data.date),
    });

    handleSellDrawer({ open: false });
    openSuccessDialog({ open: true, header: PurchaseEnum.SUCCESSFUL });
    console.log('data------------', data);
  }

  const activeCashColor = (active: string): string => {
    if (
      form.watch('cash_type') === 'given' &&
      form.watch('cash_type') === active
    ) {
      return 'border-error-100 dark:border-primary-80';
    } else if (
      form.watch('cash_type') === 'received' &&
      form.watch('cash_type') === active
    ) {
      return 'border-success-100 dark:border-primary-80';
    } else {
      return 'border-color';
    }
  };

  useEffect(() => {
    if (!form.watch('cash_type')) {
      form.setValue('cash_type', 'given');
    }
    // if (form.watch('cash_type') === 'given') {
    //   handleSellDrawer({ open: true, header: PurchaseEnum.MONEY_GIVEN_ENTRY });
    // } else {
    //   handleSellDrawer({
    //     open: true,
    //     header: PurchaseEnum.MONEY_RECEIVED_ENTRY,
    //   });
    // }
  }, [form.watch('cash_type')]);

  useEffect(() => {
    if (contact) {
      console.log(contact);
      form.setValue('name', contact.name);
      form.setValue('number', contact.mobile);
    }
  }, [contact]);

  useEffect(() => {
    form.setValue('amount', String(currentPurchase?.total_price));
    form.setValue('name', currentPurchase?.supplier_name ?? '');
    form.setValue('number', currentPurchase?.supplier_mobile ?? '');
    form.setValue('date', new Date(currentPurchase?.created_at ?? ''));
    form.setValue('details', currentPurchase?.note ?? '');
  }, [currentPurchase]);

  useEffect(() => {
    const getPurchaseProducts = async () => {
      const res = await getPurchaseItems({
        id: currentPurchase?.unique_id ? currentPurchase?.unique_id : '',
      });
      if (res?.success) {
        setPurchaseProducts(res?.data);
      }
    };
    getPurchaseProducts();
  }, [currentPurchase]);

  // const products = form.watch('products');

  //  /**
  //  * calculating the total price from the selected and entered product quantity
  //  */
  //  const totalPrice =  products?.reduce((prev: number, p: { total: string }[]) => {
  //      prev = prev + Number(Object.values(p)[0].total);
  //      return prev;
  //    }, 0)

  const removeItemFromProduct = (product: IProducts, index: number) => {
    /**
     * unregister product item from the form array to maintain the calculation
     * Set the filtered products to update the current view
     */
    // props.form.unregister(`products.${props.index}.product-${props.data?.id}`);
    // setProducts(products.filter((product) => product.id !== props.data?.id));

    let purchaseProdClone = purchaseProducts && { ...purchaseProducts };
    let filterProducts = purchaseProducts?.items?.filter(
      (prod) => prod.unique_id !== product.unique_id
    );

    purchaseProdClone!.items = filterProducts;
    // form.unregister(`products.${index}.product-${product.unique_id}`);
    setPurchaseProducts(purchaseProdClone);
    // console.log(
    //   purchaseProducts?.items?.filter(
    //     (prod) => prod.unique_id !== product.unique_id
    //   )
    // );
  };

  return (
    <div className="space-y-space12">
      <Tabs onChange={(value) => {}} defaultValue={partyList[1]}>
        <div className="border-b border-color pb-space16">
          <TabsList defaultValue={'supplier'} className="grid grid-cols-2">
            {partyList.map((tab) => (
              <TabsTrigger
                key={tab}
                disabled={tab !== 'supplier'}
                value={tab}
                className="uppercase"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      <Text
        title={`Payable Amount  ৳ ${currentPurchase?.total_price}`}
        className="text-lg font-medium bg-primary-10 dark:bg-primary-80 text-center rounded-md py-space8"
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-space12"
        >
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of Purchase</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a Date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className="bg-white"
                      weekStartsOn={0}
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cash_type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Cash</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-space8"
                  >
                    {cashType.map((item) => (
                      <FormItem
                        key={item.value}
                        className={`flex rounded-md border-2 py-space8 px-space12 gap-space8 w-full ${activeCashColor(item.value)}`}
                      >
                        <FormControl>
                          <RadioGroupItem
                            disabled={item.value === 'given'}
                            value={item.value}
                          />
                        </FormControl>
                        <FormLabel className="font-normal w-full space-y-space8">
                          <Text title={item.label} className="font-medium" />
                          <Text title={item.dis} variant="secondary" />
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Amount <span className="text-error-100">*</span>{' '}
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Text title="Buy Products" className="text-lg font-medium" />
            {/* {!edit ? ( */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setEdit(!edit)}
            >
              <Text title="Edit" className="text-lg font-medium" />
              <Pencil1Icon />
            </div>
            {/* ) : (
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setEdit(!edit)}
              >
                <Text title="Close" className="text-lg font-medium" />
                <Cross1Icon />
              </div>
            )
            } */}
          </div>

          <div className={`grid 'grid-rows-[1fr]'`}>
            {purchaseProducts?.items &&
              purchaseProducts?.items.map((product, index) => (
                // <>
                //   {edit ? (
                //     <ProductListCardEdit
                //       removeItemFromProduct={() =>
                //         removeItemFromProduct(product, index)
                //       }
                //       data={product}
                //       {...{ index, form }}
                //     />
                //   ) : (
                <ProductListCard key={product.unique_id} product={product} />
                //   )}
                // </>
              ))}
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="pb-8">
                <FormLabel>
                  Name <span className="text-error-100">*</span>{' '}
                </FormLabel>
                <FormControl>
                  <div className="relative h-10 w-full">
                    <Input
                      type="text"
                      placeholder=" Enter your comment here"
                      className="pl-3 pr-20 text-md w-full border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-transparent" // Add additional styling as needed
                      {...field}
                    />

                    <FormItem className="flex flex-col absolute right-2 top-8 transform -translate-y-1/2 text-gray-500 z-10">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="transparent"
                              role="combobox"
                              className={cn(
                                'w-[50px] justify-between',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                              <UserSearch className="  shrink-0" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0 mr-10 ">
                          <Command>
                            <CommandInput placeholder="Search language..." />
                            <CommandEmpty>No language found.</CommandEmpty>
                            <CommandGroup>
                              <ScrollArea className="h-[300px] scroll-p-4 rounded-md border">
                                {suppliers?.map((supplier) => (
                                  <CommandItem
                                    value={contact?.name}
                                    key={supplier.id}
                                    onSelect={() => {
                                      setContact(supplier);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        supplier.name === contact?.name
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      )}
                                    />
                                    <div className="flex flex-col">
                                      <p>{supplier.name}</p>
                                      <p>{supplier.mobile}</p>
                                    </div>
                                    {/* {supplier.mobile} */}
                                  </CommandItem>
                                ))}
                              </ScrollArea>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Number <span className="text-error-100">*</span>{' '}
                </FormLabel>
                <FormControl>
                  <Input placeholder="Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="h-[4.4rem] flex  items-center gap-space8">
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem className="w-[calc(100%-5.2rem)] mt-space8">
                  <FormControl>
                    <Input placeholder="Note" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="images"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-[4.4rem] h-full">
                  <FormControl>
                    <>
                      <input
                        id="image"
                        type="file"
                        className="hidden"
                        {...field}
                      />
                      <Label
                        htmlFor="image"
                        className="cursor-pointer border border-color w-full h-full rounded-md flex items-center justify-center dark:bg-primary-100 dark:text-primary-40"
                      >
                        <Icon icon="tabler:link-plus" height={24} width={24} />
                      </Label>
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <DrawerFooter height="14rem" className="flex-col !gap-space12">
            <div className="flex items-center gap-space8 justify-center">
              <FormField
                control={form.control}
                name="sms"
                render={({ field }) => (
                  <FormItem>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="airplane-mode"
                    />
                  </FormItem>
                )}
              />
              <Text title="Send SMS" className="text-sm font-medium" />
              <Text
                variant="success"
                className="text-sm font-medium flex items-center gap-space4 bg-success-10 dark:bg-primary-80 py-space4 px-space12 rounded-full"
              >
                <Icon icon="material-symbols:sms" />
                SMS Balance {cookie ? JSON.parse(cookie).sms_count : 0}
              </Text>
            </div>

            <Button type="submit" className="w-full">
              Save
            </Button>
          </DrawerFooter>
        </form>
      </Form>
    </div>
  );
};

export default TransactionEdit;

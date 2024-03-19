import { DELIVERY_STATUS, ORDER_TYPE, PAYMENT_STATUS } from "@/config/orders";
export type OrdersTableHeaderDef = {id: number, label: string}
export type OrderTypeDef = (typeof ORDER_TYPE)[keyof typeof ORDER_TYPE]
export type PaymentStatusDef = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS]
export type DeliveryStatusDef = (typeof DELIVERY_STATUS)[keyof typeof DELIVERY_STATUS]
export type FilteringOptionDef = { label: string, value: DeliveryStatusDef }

export type OrderDetailsDef = {
  id: number,
  delivery_status: DeliveryStatusDef
}

export type IOrderItemType = {
  id: number,
  code: string,
  created_at: string,
  shipping_address: string,
  grand_total: number,
  order_details: OrderDetailsDef[],
  payment_type: OrderTypeDef,
  payment_status: PaymentStatusDef,
}
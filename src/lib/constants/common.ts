export const DATE_FORMATS = {
  default: 'yyyy-MM-dd HH:mm:ss',
};

export enum PAYMENT_METHODS {
  'Cash' = 1,
  'Digital Payment',
  'Due Payment',
  'QR Code',
  'Bank Cheque',
  'Online Sale',
}

export const PAYMENT_METHOD_NAMES = {
  Cash: 'Cash',
  Digital_Payment: 'Digital Payment',
  Due_Payment: 'Due Payment',
  QR_Code: 'QR Code',
  Bank_Cheque: 'Bank Cheque',
  Online_Sale: 'Online Sale',
};

export enum PAYMENT_STATUS {
  'PAID' = 'PAID',
  'UNPAID' = 'UNPAID',
}

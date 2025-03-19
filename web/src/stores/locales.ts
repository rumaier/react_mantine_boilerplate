import { create } from "zustand";
import { fetchNui } from "../utils/fetchNui";
import { addInitialFetch } from "../utils/initialFetch";


type localeType = (key: string, ...args: string[]) => string;

type LocalesProps = {
  [key: string]: string;
}


type LocaleStoreProps = {
  locale: localeType;
  locales: LocalesProps;
};

export const localeStore = create<LocaleStoreProps>((set, get) => {
  return {
    locales: {
      'Account': 'Account',
      "OccupantItemsDesc": "Select items to take from this person, or press the plus to give them some items. ",
      'AccountId': 'Account ID',
      'AccountIdDescription': 'The unique identifier for the account',
      'AccountName': 'Account Name',
      'AccountOverview': 'Account Overview',
      'AccountNameDescription': 'The name of the account',
      'Account Basics': 'Account Basics',
      'ManageAccess': 'Manage Access',
      'ManageAccessDescription': 'Manage who has access to the account',
      'ManageCards': 'Manage Cards',
      'ManageCardsDescription': 'Manage the cards associated with the account',
      'DepositNote': 'Deposit Note',
      'DepositNoteDescription': 'Add a note to the deposit',
      'DepositCash': 'Deposit Cash',
      'DepositCashDescription': 'Deposit cash into the account from your pockets.',
      'Managers': 'Managers',
      'Transfer': 'Transfer',
      'TransferDescription': 'Transfer money to another account',
      'Deposit': 'Deposit',
      'CreditScore': 'Credit Score',
      'CreditScoreInfo': 'View Credit Rating',
      'ViewAll': 'View All',
      'Currencies': 'Currencies',
      'DeleteAccount': 'Delete Account',
      'DeleteAccountDescription': 'Are you sure you want to delete this account?',
      'EditManagers': 'Edit Managers',
      'RecentTransactions': 'Recent Transactions',
      'AccountBasics': 'Account Basics',
      'AddAccount': 'Add Account',
      'AddAccountDescription': 'Add a new account',
      'Monday': 'Monday',
      'Tuesday': 'Tuesday',
      'Wednesday': 'Wednesday',
      'Thursday': 'Thursday',
      'Friday': 'Friday',
      'Saturday': 'Saturday',
      'Sunday': 'Sunday',
      'Income': 'Income',
      'Invoices': 'Invoices',
      'ViewAllInvoices': 'View All Invoices',
      'NearbyPlayer': 'Nearby Player',
      'NearbyPlayerDescription': 'Select a player from the list of nearby players',
      'CreateInvoice': 'Create Invoice',
      'Amount': 'Amount',
      'AmountDescription': 'Transfer some of the %s%s from your pocket into this account.',
      'CreateInvoiceDescription': 'Send a custom invoice to another player by their accountId', 
      'Expenses': 'Expenses',
      'Issued': 'Issued',
      'TransferAmount': 'Transfer Amount',
      'TransferAmountDescription': 'Transfer some of the %s%s from this account to another account.',
      'SaveChanges': 'Save Changes',
      'PocketCash': 'CASH',
      
    },
    locale: (key: string, ...args: (string|number)[]): string => {
      
      let translation = get().locales[key] || key;
      if (args.length) {
        // convert the arg to a string and replace the %s in the translation
  

        translation = translation.replace(/%s/g, () => String(args.shift() || ''));
      }
      return translation;
    },
  };
});

// export locale as a standalone function 
export const locale = localeStore.getState().locale;

addInitialFetch('fetchLocales', () => {
  fetchNui<LocalesProps>('GET_LOCALES')
  .then((data) => {
    localeStore.setState({ locales: data });
  })
  .catch((error) => {
    console.error('Failed to fetch locales:', error);
  });
});

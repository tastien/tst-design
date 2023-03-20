import { Dialog } from 'react-vant';

const DialogAlert = (message: string) =>
  Dialog.alert({
    message,
    confirmButtonColor: '#cc1d23',
  });

export default DialogAlert;

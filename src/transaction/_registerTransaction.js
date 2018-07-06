import T382000 from '@/transaction/T382000/T382000'
import TZUL from '@/transaction/TZUL/TZUL'
import TTEMPLATE from '@/transaction/TTEMPLATE/TTEMPLATE'

export function registerTransaction(vue) {
    vue.component('T382000', T382000);
    vue.component('TZUL', TZUL);
    vue.component('TTEMPLATE', TTEMPLATE);
}
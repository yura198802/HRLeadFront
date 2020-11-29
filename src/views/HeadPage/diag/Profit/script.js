
 import DxToolbar, { DxItem } from 'devextreme-vue/toolbar';

import DxPieChart, {
  DxSize,
  DxSeries,
  DxLabel,
  DxConnector,
  DxExport
} from 'devextreme-vue/pie-chart';

export default {
  name: 'diag_working',
  components:{
    DxPieChart,
    DxSize,
    DxSeries,
    DxLabel,
    DxConnector,
    DxExport,
    DxToolbar,
    DxItem
  },
  data(){
    return{
      purchases:[]
    }
  },
  methods: {
    customizeLabelText( arg ) {
      return `${arg.value}`;
    },
    async getPurchases(n) {
      const vm = this
      await this.$http.post(`/Transaction/GetProductTypesProfit?id=${n}`, {},
         {
           headers: {
             Authorization: `Bearer ${vm.$cookie.get('accessToken')}`,
           }
         })
         .then(function (response) {
           vm.purchases = response.data;

         })
         .catch(function (error) {
           console.log(error);
           vm.purchases =[]
         });
    }
  },
  mounted:async function(){
  }
}

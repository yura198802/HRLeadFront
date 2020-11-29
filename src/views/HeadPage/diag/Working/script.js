import DxPieChart, {
  DxSize,
  DxConnector,
  DxExport,
  DxLegend,
  DxLabel,
  DxSeries
} from 'devextreme-vue/pie-chart';
import DxToolbar, { DxItem } from 'devextreme-vue/toolbar';


export default {
  name: 'Home',
  components:{
    DxPieChart,
    DxSize,
    DxConnector,
    DxExport,
    DxLegend,
    DxLabel,
    DxSeries,
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
      await this.$http.post(`/Transaction/GetClientWorkingTime?id=${n}`, {},
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

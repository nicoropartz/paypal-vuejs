<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span class="title">Payement effecuté</span>
            </div>
        </template>
        <el-table :data="detailsTransaction">
            <el-table-column label="Nom /Prénom" prop="user"/>
            <el-table-column label="Date" prop="date"/>
            <el-table-column label="Montant" prop="montant"/>
        </el-table>
    </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from "vue";
import type { FormRules } from 'element-plus'
import { loadScript } from "@paypal/paypal-js";
import { PaypalApi } from '../api/paypal.ts'

export default defineComponent({
    name: "PaymentList",
    props: {
    },
    setup() {
        const detailsTransaction = ref([]);
        onMounted(async () => {
            const data: any[] = await PaypalApi.listTransaction();
            data.transaction_details.forEach(detail => {
                detailsTransaction.value.push({user: detail.payer_info.payer_name.given_name + ' ' + detail.payer_info.payer_name.surname, date: detail.transaction_info.transaction_initiation_date, montant: detail.transaction_info.transaction_amount.value + detail.transaction_info.transaction_amount.currency_code});
            });
        });

        return {
            detailsTransaction
        };
    },
    data() {
        return {
        };
    },
    computed: {
    },
    methods: {
        
    }
});
</script>
<style lang="scss" scoped>

.title {
    font-weight: bold;
    font-size: 2em;
}

</style>
<template>
   <!-- <div  style="display: flex; flex-direction: column">
   <el-form ref="formInscription" class="inscription" label-position="top" :rules="rules" :model="form" label-width="120px">
        <el-form-item prop="nom" label="Nom">
            <el-input v-model="form.nom" />
        </el-form-item>
        <el-form-item prop="prenom" label="Prénom">
            <el-input v-model="form.prenom" />
        </el-form-item>
    </el-form>
    <span>65€ + 3€ frais paypal</span>
   </div>-->
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span class="title">Payer</span>
            </div>
        </template>
       <div id="paypal-button"></div>
    </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import type { FormRules } from 'element-plus'
import { loadScript } from "@paypal/paypal-js";
import { PaypalApi } from '../api/paypal.ts'

export default defineComponent({
    name: "Inscription",
    props: {
    },
    setup() {
        const { VITE_CLIENT_ID } = import.meta.env; 
        const form = reactive({
            nom: '',
            prenom: ''
        });

        let paypal;
        
        async function onClick() {
            await PaypalApi.listTransaction();
        }

        function createOrder(data, actions) {
            console.log('Creating order...');
            return actions.order.create({
                purchase_units: [
                {
                    amount: {
                        value: 68,
                    },
                },
                ],
            });
        }
        
        function onApprove(data, actions) {
            console.log('Order approved...');
            return actions.order.capture().then(() => {
                this.paid = true;
                console.log('Order complete!');
            });
        }

        onMounted(async () => {

            paypal = await loadScript({ "client-id": VITE_CLIENT_ID, components: "buttons,marks,messages", currency: "EUR" });
            await paypal.Buttons({
                createOrder: createOrder,
                onApprove: onApprove,
            }).render("#paypal-button");
        });

        const rules = reactive<FormRules>({
            nom: [
                { required: true, message: 'Nom obligatoire', trigger: 'blur' }
            ],
            prenom: [
                { required: true, message: 'Prénom obligatoire', trigger: 'blur' }
            ]
        });

        return {
            paypal,
            form,
            rules,
            onClick
        };
    },
    data() {
        return {
        };
    },
    computed: {
        isValid() {
            return this.form.nom != '' && this.form.prenom != '';
        }
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
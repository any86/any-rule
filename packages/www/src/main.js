import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js');
    });
}

new Vue({
    render: h => h(App),
}).$mount('#app')
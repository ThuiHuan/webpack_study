// 一、创建vue根实例
import Vue from 'vue'
import App from './App.vue'

const vm = new Vue({
    el: '#app',
    render: h => h(App)
})

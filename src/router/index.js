import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Properties from '@/components/Properties';
import Property from '@/components/Property';
import PropertyEdit from '@/components/PropertyEdit';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/properties',
      name: 'Properties',
      component: Properties,
    },
    {
      path: '/property/:id',
      name: 'Property',
      component: Property,
    },
    {
      path: '/property/:id/edit',
      name: 'PropertyEdit',
      component: PropertyEdit,
    },
  ],
});

import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Properties from '@/components/Properties';
import Property from '@/components/Property';
import PropertyEdit from '@/components/PropertyEdit';
import Country from '@/components/Country';
import City from '@/components/City';
import Suburb from '@/components/Suburb';
import Street from '@/components/Street';
import People from '@/components/People';
import Agents from '@/components/statistics/Agents';
import Listings from '@/components/Listings';
import Sales from '@/components/Sales';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Properties,
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
      path: '/listings',
      name: 'Listings',
      component: Listings,
    },
    {
      path: '/property/:id/edit',
      name: 'PropertyEdit',
      component: PropertyEdit,
    },
    {
      path: '/country',
      name: 'Country',
      component: Country,
    },
    {
      path: '/city',
      name: 'City',
      component: City,
    },
    {
      path: '/suburb',
      name: 'Suburb',
      component: Suburb,
    },
    {
      path: '/street',
      name: 'Street',
      component: Street,
    },
    {
      path: '/people',
      name: 'People',
      component: People,
    },
    {
      path: '/statistics/agents',
      name: 'AgentStatistics',
      component: Agents,
    },
    {
      path: '/sales',
      name: 'Sales',
      component: Sales,
    },
  ],
});
